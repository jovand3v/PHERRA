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

const CollectionModal = (props: Props) => {
  const { setModalOpen, setProducts } = props;
  const [product, setProduct] = useState<AdminDashboardCollectionProduct>({
    id: 0,
    name: "",
    price: "",
    discount: "",
    stock: [],
    img: { name: "", src: "" },
  });
  const inputImgRef = useRef<HTMLInputElement>(null);

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
    setProducts((prevState) => {
      const id = prevState[prevState.length - 1]?.id + 1 || 0;
      return [...prevState, { ...product, id }];
    });
    setModalOpen(false);
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
              <label className={`${s.inputLabel} ${s.inputLabelName}`}>
                NAME
                <input
                  className={`${s.input} ${s.inputName}`}
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </label>
              <label className={s.inputLabel}>
                PRICE
                <input
                  className={`${s.input} ${s.inputPrice}`}
                  placeholder="100"
                  value={product.price}
                  onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("price", e.target.value)}
                />
              </label>
              <label className={s.inputLabel}>
                DISCOUNT
                <input
                  className={`${s.input} ${s.inputDiscount}`}
                  placeholder="10"
                  value={product.discount}
                  onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("discount", e.target.value)}
                />
              </label>
            </div>
            <CollectionModalStock product={product} setProduct={setProduct} />
            <button className={s.button} onClick={handleAddProduct}>
              ADD PRODUCT
            </button>
          </div>
          <div className={s.imgContainer}>
            <label className={s.inputLabel} htmlFor="#inputImg">
              IMAGE
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
