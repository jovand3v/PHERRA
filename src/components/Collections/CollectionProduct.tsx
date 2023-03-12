import s from "./CollectionProduct.module.scss";
import model from "@public/assets/collections/summer/open-shirt.png";
import Image from "next/image";

const CollectionProduct = () => {
  return (
    <li className={s.main}>
      <div className={s.imageContainer}>
        <Image src={model} className={s.image} quality={100} alt="model" />
        <div className={s.saleBox}>-19%</div>
      </div>
      <h3 className={s.title}>OPEN SHIRT</h3>
      <div className={s.info}>
        <div className={s.priceContainer}>
          <div className={s.oldPrice}>
            $159 <span className={s.discount}>-19%</span>
          </div>
          <div className={s.price}>$129.99</div>
        </div>
        <div className={s.colorsAndSizesContainer}>
          <ul className={s.colors}>
            <li className={s.color}></li>
          </ul>
          <ul className={s.sizes}>
            <li className={s.size}></li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default CollectionProduct;
