import s from "./CartContainer.module.scss";
import CartProduct from "./CartProduct";
import ExitIcon from "@public/assets/icons/x.svg";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import { useContext } from "react";
import { ProductsContext } from "src/context/products";

type Props = {
  active: boolean;
  setActive: (state: boolean) => void;
};

const CartContainer = (props: Props) => {
  const { active, setActive } = props;
  const { products } = useContext(ProductsContext);

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
              id={p.id}
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
            {products.reduce((acc: number, curr: any) => acc + curr.price, 0)}
          </p>
        </div>
        <button className={s.checkoutButton}>
          CHECKOUT <ArrowIcon className={s.checkoutArrow} />
        </button>
      </div>
      <ExitIcon className={s.close} onClick={() => setActive(false)} />
    </div>
  );
};

export default CartContainer;
