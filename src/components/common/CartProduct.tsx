import Image from "next/image";
import s from "./CartContainer.module.scss";
import PhotoNotFoundIcon from "@public/assets/icons/photo-not-found.svg";
import model from "@public/assets/models/summer-model-2.png";

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
          <h3 className={s.productTitle}>Title</h3>
          <p className={s.productDescription}>Lorem ipsum dolor sit amet</p>
        </header>
        <div className={s.productInfo}>
          <p className={s.productStock}>In Stock</p>
          <p className={s.productSize}>Size: S</p>
          <p className={s.productColor}>
            Color: <span className={s.productColorDisplay}></span> Beige
          </p>
          <p className={s.productQuantity}>
            Quantity: <button className={s.productQuantityRemove}>-</button>{" "}
            <span className={s.productQuantityNumber}>1</span> <button className={s.productQuantityAdd}>+</button>
          </p>
        </div>
      </div>
      <p className={s.productPrice}>$159.99</p>
    </li>
  );
};

export default CartProduct;
