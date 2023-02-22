import s from "./Cart.module.scss";
import CartIcon from "@public/assets/icons/cart.svg";
import CartContainer from "./CartContainer";

const Cart = () => {
  return (
    <div className={s.main}>
      <div className={s.iconContainer}>
        <CartIcon className={s.icon} />
        <div className={s.iconAmount}>0</div>
      </div>
      <CartContainer />
    </div>
  );
};

export default Cart;
