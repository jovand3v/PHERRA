import s from "./CartContainer.module.scss";
import CartProduct from "./CartProduct";
import model from "@public/assets/models/summer-model-2.png";
import ExitIcon from "@public/assets/icons/x.svg";
import { StaticImageData } from "next/image";

type Props = {
  active: boolean;
  setActive: (state: boolean) => void;
};

type ProductColorObject = { name: string; value: string };

type Products = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  img: { src: StaticImageData | null; alt: string };
  sizes: [string, ...string[]];
  colors: [ProductColorObject, ...ProductColorObject[]];
}[];

const CartContainer = (props: Props) => {
  const { active, setActive } = props;
  const products: Products = [
    {
      id: 1,
      name: "open shirt",
      price: 100,
      inStock: true,
      img: { src: model, alt: "model" },
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Beige", value: "#ffd481" },
        { name: "Blue", value: "lightblue" },
      ],
    },
    {
      id: 2,
      name: "open shirt",
      price: 100,
      inStock: true,
      img: { src: null, alt: "model" },
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Beige", value: "#ffd481" },
        { name: "Blue", value: "lightblue" },
      ],
    },
  ];

  return (
    <div className={`${s.cartContainer} ${active ? s.cartContainerActive : ""}`}>
      <header className={s.cartHeader}>
        <h2 className={s.cartTitle}>CART</h2>
        <p className={s.cartDescription}>Your cart items</p>
      </header>
      {products.length !== 0 ? (
        <ul className={s.productsContainer}>
          {products.map((p) => (
            <CartProduct
              name={p.name}
              price={p.price}
              inStock={p.inStock}
              img={{ src: p.img.src, alt: p.img.alt }}
              sizes={p.sizes}
              colors={p.colors}
              key={p.id}
            />
          ))}
        </ul>
      ) : (
        <div className={s.productsContainerEmpty}>
          <p className={s.productsContainerEmptyText}>NO PRODUCTS FOUND</p>
        </div>
      )}
      <div className={s.checkout}>
        <div className={s.checkoutInfoContainer}>
          <p className={s.checkoutQuantity}>{products.length === 1 ? "1 Item" : `${products.length} Items`}</p>
          <p className={s.checkoutTotal}>
            <span className={s.checkoutTotalHighlight}>TOTAL:</span> $
            {products.reduce((acc, curr) => acc + curr.price, 0)}
          </p>
        </div>
        <button className={s.checkoutButton}>CHECKOUT</button>
      </div>
      <ExitIcon className={s.close} onClick={() => setActive(false)} />
    </div>
  );
};

export default CartContainer;
