import s from "./Product.module.scss";
import Image from "next/image";
import { CollectionProduct, discountedPrice } from "src/lib/products";

type Props = {
  product: CollectionProduct;
  setSelectedProduct: (p: CollectionProduct) => void;
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
        <Image
          src={product.img}
          className={s.image}
          alt={`${product.colors[0].name} ${product.name}`}
          layout="responsive"
        />
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
            <div className={s.price}>${discountedPrice(product.price, product.discount)}</div>
          </div>
          <div className={s.colorsAndSizesContainer}>
            <ul className={s.colors} aria-label="available colors">
              {product.colors.map((color, index) => (
                <li className={s.color} style={{ background: color.value }} key={index} aria-label={color.name}></li>
              ))}
            </ul>
            <ul aria-label="available sizes" className={s.sizes}>
              {product.sizes.map((size, index) => (
                <li className={s.size} key={index}>
                  {size}
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