import type { NextPage } from "next";
import s from "./Cart.module.scss";
import CartIcon from "@public/assets/icons/cart.svg";

const Cart: NextPage = () => {
  return (
    <div className={s.main}>
      <CartIcon className={s.icon} />
      <div className={s.amount}>0</div>
    </div>
  );
};

export default Cart;
