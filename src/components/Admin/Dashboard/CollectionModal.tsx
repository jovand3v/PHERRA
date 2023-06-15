import s from "./CollectionModal.module.scss";
import PlusIcon from "@public/assets/icons/plus-thin.svg";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import ExitIcon from "@public/assets/icons/x.svg";
import CollectionModalStock from "./CollectionModalStock";
import EditIcon from "@public/assets/icons/edit.svg";
import { Collections } from "@prisma/client";
import { Product, ProductSize, ProductStock } from "src/db/init_db";

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

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files[0]) {
    //   const imgFile = e.target.files[0];
    //   const name = e.target.files[0].name;
    //   const reader = new FileReader();
    //   reader.readAsDataURL(imgFile);
    //   reader.onload = () => {
    //     if (!reader.result) return;
    //     const value = typeof reader.result === "string" ? reader.result : Buffer.from(reader.result).toString();
    //     handleChange("img", { name, value });
    //   };
    // }
  };

  const handleChange = (input: "name" | "price" | "discount" | "img", value: string) => {
    setProduct((prevState) => ({ ...prevState, [input]: value }));
  };

  const handleAddProduct = () => {
    const errors: InputErrors = {
      name: !product.name,
      price: !product.price,
      discount: !product.discount,
      // img: !product.img,
      stock: product.stock.length === 0,
    };
    if (Object.values(errors).every((err) => !err)) {
      // add product, send parsed input values and collection id
      if (modalType === "add_product") {
        fetch("/api/db/add_product", {
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
            },
            collectionId,
          }),
        });
      }
      // edit product, send product id and its parsed input values
      else if (modalType === "update_product") {
        fetch("/api/db/update_product", {
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
            },
          }),
        });
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
              {product.img ? (
                <>
                  <EditIcon className={s.editIcon} onClick={() => inputImgRef.current?.click()} />
                  <img src={product.img} alt="" className={s.img} />
                  <p className={s.imgName}>{product.img}</p>
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
