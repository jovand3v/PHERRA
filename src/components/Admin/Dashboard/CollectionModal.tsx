import s from "./CollectionModal.module.scss";
import PlusIcon from "@public/assets/icons/plus-thin.svg";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ExitIcon from "@public/assets/icons/x.svg";
import CollectionModalStock from "./CollectionModalStock";
import { AdminDashboardCollectionProduct } from "./Collection";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<SetStateAction<AdminDashboardCollectionProduct[]>>;
};

type Inputs = {
  name: string;
  price: string;
  discount: string;
  img: string;
};

const CollectionModal = (props: Props) => {
  const { setModalOpen, setProducts } = props;
  const [product, setProduct] = useState<AdminDashboardCollectionProduct>({
    id: 0,
    name: "",
    price: "",
    discount: "",
    stock: [],
    img: "",
  });

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = () => {
        if (!reader.result) return;
        handleChange("img", typeof reader.result === "string" ? reader.result : Buffer.from(reader.result).toString());
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
            <label className={`${s.inputLabel} ${s.inputLabelImg}`}>
              IMAGE
              <div className={s.inputImgContainer}>
                {product.img ? <img src={product.img} alt="" className={s.img} /> : <PlusIcon className={s.plusIcon} />}
                <input type="file" className={`${s.input} ${s.inputImg}`} onChange={(e) => handleImagePreview(e)} />
              </div>
            </label>
          </div>
        </div>
        <ExitIcon className={s.exit} onClick={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default CollectionModal;
