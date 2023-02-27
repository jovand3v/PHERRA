import Image from "next/image";
import s from "./CartProduct.module.scss";
import PhotoNotFoundIcon from "@public/assets/icons/photo-not-found.svg";
import model from "@public/assets/models/summer-model-2.png";
import ExitIcon from "@public/assets/icons/x.svg";
import PlusIcon from "@public/assets/icons/plus.svg";
import MinusIcon from "@public/assets/icons/minus.svg";

const CartProduct = () => {
  return (
    <li className={s.product}>
      {true ? (
        <div className={s.productNoImage}>
          <PhotoNotFoundIcon className={s.productNoImageIcon} />
        </div>
      ) : (
        <Image className={s.productImage} src={model} alt="model" />
      )}
      <div className={s.productMain}>
        <header className={s.productHeader}>
          <h3 className={s.productTitle}>OPEN SHIRT</h3>
          <p className={s.productDescription}>2023 Collection</p>
        </header>
        <div className={s.productInfo}>
          <p className={s.productStock}>In Stock</p>
          <p className={s.productSize}>Size: S</p>
          <div className={s.productColor}>
            <p className={s.productColorTitle}>Color:</p>
            <div className={s.productColorDisplay} style={{ background: "#ffd481" }}></div>
            <p className={s.productColorName}>Beige</p>
          </div>
        </div>
        <div className={s.productQuantity}>
          Quantity: <MinusIcon className={s.productQuantityFunction} />
          <input className={s.productQuantityInput} value={1} onChange={() => {}} />{" "}
          <PlusIcon className={s.productQuantityFunction} />
        </div>
      </div>
      <p className={s.productPrice}>$159.99</p>
      <ExitIcon className={s.productDelete} />
    </li>
  );
};

export default CartProduct;
