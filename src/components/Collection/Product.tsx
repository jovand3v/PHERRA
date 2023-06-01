import s from "./Product.module.scss";
import Image from "next/legacy/image";
import { Product } from "src/db/init_db";
import { handlePriceDiscount } from "src/lib/products";

type Props = {
  product: Product;
  setSelectedProduct: (sp: Product) => void;
  setShowcaseActive: (s: boolean) => void;
};

const Product = (props: Props) => {
  const { product, setSelectedProduct, setShowcaseActive } = props;

  return (
    <li
      className={s.main}
      onClick={() => {
        setSelectedProduct(product);
        setShowcaseActive(true);
      }}
    >
      <div className={s.imageContainer}>
        <Image src={product.img} className={s.image} width={275} height={450} alt={product.name} layout="responsive" />
        <div className={s.discountBox} aria-hidden={true}>
          -{product.discount}%
        </div>
      </div>
      <div className={s.info}>
        <h3 className={s.title}>{product.name}</h3>
        <div className={s.details}>
          <div className={s.priceContainer}>
            <div className={s.oldPriceContainer}>
              <span className={s.oldPrice}>${product.price}</span>{" "}
              <span className={s.discount}>-{product.discount}%</span>
            </div>
            <div className={s.price}>${handlePriceDiscount(product.price, product.discount)}</div>
          </div>
          <div className={s.colorsAndSizesContainer}>
            <ul className={s.colors} aria-label="available colors">
              {product.stock.map((stockObj, index) => (
                <li
                  className={s.color}
                  style={{ background: `#${stockObj.colorHex}` }}
                  key={index}
                  aria-label={stockObj.colorName}
                ></li>
              ))}
            </ul>
            <ul aria-label="available sizes" className={s.sizes}>
              {/* temp displays only sizes of first found product in stock */}
              {product.stock[0].sizes.map((sizeObj, index) => (
                <li className={s.size} key={index}>
                  {sizeObj.size}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
