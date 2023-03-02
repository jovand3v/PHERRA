import s from "./CartContainer.module.scss";
import CartProduct from "./CartProduct";
import ExitIcon from "@public/assets/icons/x.svg";

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
  img: null;
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
      img: null,
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
              img={p.img}
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
          <p className={s.checkoutQuantity}>1 Item</p>
          <p className={s.checkoutTotal}>
            <span className={s.checkoutTotalHighlight}>TOTAL:</span> $159.99
          </p>
        </div>
        <button className={s.checkoutButton}>CHECKOUT</button>
      </div>
      <ExitIcon className={s.close} onClick={() => setActive(false)} />
    </div>
  );
};

export default CartContainer;
