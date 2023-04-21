import s from "./CollectionModal.module.scss";
import PlusIcon from "@public/assets/icons/plus-thin.svg";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import ExitIcon from "@public/assets/icons/x.svg";
import CollectionModalStock from "./CollectionModalStock";
import { AdminDashboardCollectionProduct } from "./Collection";
import EditIcon from "@public/assets/icons/edit.svg";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<SetStateAction<AdminDashboardCollectionProduct[]>>;
};

type Inputs = Pick<AdminDashboardCollectionProduct, "name" | "price" | "discount" | "img">;
export type InputErrors = { name: boolean; price: boolean; discount: boolean; img: boolean; stock: boolean };

const CollectionModal = (props: Props) => {
  const { setModalOpen, setProducts } = props;
  const [product, setProduct] = useState<AdminDashboardCollectionProduct>({
    id: 0,
    name: "",
    price: "",
    discount: "",
    stock: [],
    img: { name: "", src: "" },
    dateAdded: "",
  });
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState<InputErrors>({ name: false, price: false, discount: false, img: false, stock: false });

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      const name = e.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = () => {
        if (!reader.result) return;
        const src = typeof reader.result === "string" ? reader.result : Buffer.from(reader.result).toString();
        handleChange("img", { name, src });
      };
    }
  };

  const handleChange = <K extends keyof Inputs>(input: K, value: Inputs[K]) => {
    setProduct((prevState) => ({ ...prevState, [input]: value }));
  };

  const handleAddProduct = () => {
    const errors: InputErrors = {
      name: !product.name,
      price: !product.price,
      discount: !product.discount,
      img: !product.img.src,
      stock: product.stock.length === 0,
    };
    if (Object.values(errors).every((err) => !err)) {
      setProducts((prevState) => {
        const id = prevState[prevState.length - 1]?.id + 1 || 0;
        const date = new Date().toLocaleDateString("en", { year: "numeric", day: "2-digit", month: "2-digit" });
        return [...prevState, { ...product, id, dateAdded: date }];
      });
      setModalOpen(false);
    }
    setErr(errors);
  };

  return (
    <div className={s.main}>
      <div className={s.overlay}></div>
      <div className={s.modal}>
        <header className={s.header}>
          <h4 className={s.title}>ADD PRODUCT</h4>
          <p className={s.subtitle}>ALL FIELDS ARE MANDATORY</p>
        </header>
        <div className={s.form}>
          <div className={s.formLeft}>
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
            <CollectionModalStock product={product} setProduct={setProduct} err={err} />
            <button className={s.button} onClick={handleAddProduct}>
              ADD PRODUCT
            </button>
          </div>
          <div className={s.imgContainer}>
            <label className={`${s.inputLabel} ${err.img ? s.inputErr : ""}`} htmlFor="#inputImg">
              IMAGE*
            </label>
            <div className={s.inputImgContainer}>
              {product.img.src ? (
                <>
                  <EditIcon className={s.editIcon} onClick={() => inputImgRef.current?.click()} />
                  <img src={product.img.src} alt="" className={s.img} />
                  <p className={s.imgName}>{product.img.name}</p>
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
        <ExitIcon className={s.exit} onClick={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default CollectionModal;
