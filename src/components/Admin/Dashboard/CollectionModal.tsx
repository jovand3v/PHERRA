import s from "./CollectionModal.module.scss";
import PlusIcon from "@public/assets/icons/plus-thin.svg";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import ExitIcon from "@public/assets/icons/x.svg";
import CollectionModalStock from "./CollectionModalStock";
import EditIcon from "@public/assets/icons/edit.svg";
import { Collections } from "@prisma/client";
import { Product, ProductSize, ProductStock } from "src/db/init_db";
import { useRouter } from "next/router";

type Props = {
  modal: CollectionModal;
  setModal: Dispatch<SetStateAction<CollectionModal>>;
  collectionId: Collections["id"];
};

export type CollectionModal = {
  open: boolean;
  product?: Product;
};
export type CollectionModalProductStock = Omit<ProductStock, "sizes"> & {
  sizes: { size: ProductSize; quantity: string }[];
};
export type CollectionModalInputs = {
  name: string;
  price: string;
  discount: string;
  stock: CollectionModalProductStock[];
  img: string;
};
type Base64 = string;

export type InputErrors = { name: boolean; price: boolean; discount: boolean; img: boolean; stock: boolean };

const CollectionModal = (props: Props) => {
  const { modal, setModal, collectionId } = props;
  const inheritedInputs: CollectionModalInputs | undefined = modal.product && {
    name: modal.product.name,
    price: JSON.stringify(modal.product.price),
    discount: JSON.stringify(modal.product.discount),
    stock: modal.product.stock.map((stockObj) => ({
      ...stockObj,
      sizes: stockObj.sizes.map((sizeObj) => ({
        ...sizeObj,
        quantity: JSON.stringify(sizeObj.quantity),
      })),
    })),
    img: modal.product.img,
  };
  const defaultInputs: CollectionModalInputs = {
    name: "",
    price: "",
    discount: "",
    stock: [],
    img: "",
  };
  const modalType = modal.product ? "update_product" : "add_product";
  const [product, setProduct] = useState<CollectionModalInputs>(inheritedInputs ?? defaultInputs);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState<InputErrors>({ name: false, price: false, discount: false, img: false, stock: false });
  const router = useRouter();
  const [img, setImg] = useState<{ file: File | null; preview: null | string | Base64 }>({
    file: null,
    preview: product.img ?? null,
  });

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        if (!reader.result) return;
        const base64 = typeof reader.result === "string" ? reader.result : Buffer.from(reader.result).toString();
        setImg({ file: img, preview: base64 });
      };
    }
  };

  const handleImageUpload = async () => {
    if (img.file) {
      const { url } = await fetch("/api/s3/uploadFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: img.file.name, type: img.file.type }),
      }).then((res) => res.json());
      await fetch(url, {
        method: "PUT",
        body: img.file,
        headers: { "Content-Type": img.file.type },
      });
    }
  };

  const handleImageUrl = async () => {
    if (img.file) {
      const { url } = await fetch("/api/s3/viewFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: img.file.name }),
      }).then((res) => res.json());
      return url;
    }
  };

  const handleChange = (input: "name" | "price" | "discount", value: string) => {
    setProduct((prevState) => ({ ...prevState, [input]: value }));
  };

  const handleAddProduct = async () => {
    const errors: InputErrors = {
      name: !product.name,
      price: !product.price,
      discount: !product.discount,
      img: !img.file && !product.img,
      stock: product.stock.length === 0,
    };
    if (Object.values(errors).every((err) => !err)) {
      let imgUrl = product.img;
      if (img.file) {
        await handleImageUpload();
        imgUrl = await handleImageUrl();
      }
      // add product, send parsed input values and collection id
      if (modalType === "add_product") {
        await fetch("/api/db/add_product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: {
              ...product,
              price: JSON.parse(product.price),
              discount: JSON.parse(product.discount),
              stock: JSON.stringify(
                product.stock.map((stockObj) => ({
                  ...stockObj,
                  sizes: stockObj.sizes.map((sizeObj) => ({
                    ...sizeObj,
                    quantity: JSON.parse(sizeObj.quantity),
                  })),
                }))
              ),
              img: imgUrl,
            },
            collectionId,
          }),
        });

        router.replace(router.asPath);
      }
      // edit product, send product id and its parsed input values
      else if (modalType === "update_product") {
        let imgUrl = product.img;
        if (img.file) {
          await handleImageUpload();
          imgUrl = await handleImageUrl();
        }
        await fetch("/api/db/update_product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: {
              ...product,
              id: modal.product!.id,
              price: JSON.parse(product.price),
              discount: JSON.parse(product.discount),
              stock: JSON.stringify(
                product.stock.map((stockObj) => ({
                  ...stockObj,
                  sizes: stockObj.sizes.map((sizeObj) => ({
                    ...sizeObj,
                    quantity: JSON.parse(sizeObj.quantity),
                  })),
                }))
              ),
              img: imgUrl,
            },
          }),
        });
        router.replace(router.asPath);
      }
      setModal({
        open: false,
      });
    }
    setErr(errors);
  };

  return (
    <div className={s.main}>
      <div className={s.overlay} onClick={() => setModal({ open: false })}></div>
      <div className={s.modal}>
        <header className={s.header}>
          <h4 className={s.title}>{modalType === "add_product" ? "ADD PRODUCT" : "EDIT PRODUCT"}</h4>
          <p className={s.subtitle}>ALL FIELDS ARE MANDATORY</p>
        </header>
        <div className={s.form}>
          <div className={s.inputsContainer}>
            <label className={`${s.inputLabel} ${s.inputLabelName} ${err.name ? s.inputErr : ""}`}>
              NAME*
              <input
                className={`${s.input} ${s.inputName} ${err.name ? s.inputErr : ""}`}
                placeholder="Enter product name"
                value={product.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </label>
            <div className={s.priceAndDiscountContainer}>
              <label className={`${s.inputLabel} ${err.price ? s.inputErr : ""}`}>
                PRICE*
                <div className={`${s.inputConstantWrapper} ${s.inputConstantWrapperPrice}`}>
                  <p className={s.inputConstant}>$</p>
                  <input
                    className={`${s.input} ${err.price ? s.inputErr : ""}`}
                    placeholder="100"
                    value={product.price}
                    onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("price", e.target.value)}
                  />
                </div>
              </label>
              <label className={`${s.inputLabel} ${err.discount ? s.inputErr : ""}`}>
                DISCOUNT*
                <div className={`${s.inputConstantWrapper} ${s.inputConstantWrapperDiscount}`}>
                  <p className={s.inputConstant}>%</p>
                  <input
                    className={`${s.input} ${s.inputDiscount}`}
                    placeholder="10"
                    value={product.discount}
                    onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("discount", e.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
          <CollectionModalStock product={product} setProduct={setProduct} err={err} />
          <div className={s.imgContainer}>
            <label className={`${s.inputLabel} ${err.img ? s.inputErr : ""}`} htmlFor="#inputImg">
              IMAGE*
            </label>
            <div className={s.inputImgContainer}>
              {img.preview ? (
                <>
                  <EditIcon className={s.editIcon} onClick={() => inputImgRef.current?.click()} />
                  <img src={img.preview} alt="" className={s.img} />
                  <p className={s.imgName}>{img.file ? img.file.name : img.preview}</p>
                </>
              ) : (
                <div className={s.inputImgAddContainer} onClick={() => inputImgRef.current?.click()}>
                  <PlusIcon className={s.plusIcon} />
                </div>
              )}
              <input
                type="file"
                ref={inputImgRef}
                id="#inputImg"
                className={`${s.input} ${s.inputImg}`}
                onChange={(e) => handleImagePreview(e)}
              />
            </div>
          </div>
        </div>
        <button className={s.button} onClick={handleAddProduct}>
          SUBMIT
        </button>
        <ExitIcon
          className={s.exit}
          onClick={() =>
            setModal({
              open: false,
            })
          }
        />
      </div>
    </div>
  );
};

export default CollectionModal;
