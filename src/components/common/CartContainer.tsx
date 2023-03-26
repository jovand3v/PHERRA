import s from "./CartContainer.module.scss";
import CartProduct from "./CartProduct";
import ExitIcon from "@public/assets/icons/x.svg";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import { useContext } from "react";
import { CartContext } from "src/context/cart";

type Props = {
  active: boolean;
  setActive: (state: boolean) => void;
};

const CartContainer = (props: Props) => {
  const { active, setActive } = props;
  const { cartReducer, quantity, total } = useContext(CartContext);

  return (
    <div className={`${s.cartContainer} ${active ? s.cartContainerActive : ""}`}>
      <header className={s.cartHeader}>
        <h2 className={s.cartTitle}>CART</h2>
        <p className={s.cartDescription}>Your cart items</p>
      </header>
      {cartReducer.state.length === 0 ? (
        <div className={s.productsContainerEmpty}>
          <p className={s.productsContainerEmptyText}>NO PRODUCTS FOUND</p>
        </div>
      ) : (
        <ul className={s.productsContainer}>
          {cartReducer.state.map((cartProduct) => (
            <CartProduct cartProduct={cartProduct} key={cartProduct.id} />
          ))}
        </ul>
      )}
      <div className={s.checkout}>
        <div className={s.checkoutInfoContainer}>
          <p className={s.checkoutQuantity}>{quantity === 1 ? "1 Item" : `${quantity} Items`}</p>
          <p className={s.checkoutTotal}>
            <span className={s.checkoutTotalHighlight}>TOTAL:</span> ${total}
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
