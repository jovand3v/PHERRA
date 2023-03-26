import { useEffect, useState } from "react";
import s from "./Cart.module.scss";
import CartIcon from "@public/assets/icons/cart.svg";
import CartContainer from "./CartContainer";
import { useContext } from "react";
import { CartContext } from "src/context/cart";

const Cart = () => {
  const [active, setActive] = useState(false);
  const { cartReducer } = useContext(CartContext);

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflowY = active ? "hidden" : "visible";
  }, [active]);

  return (
    <div className={s.main}>
      <div className={s.iconContainer} onClick={() => setActive(true)}>
        <CartIcon className={s.icon} />
        <div className={s.iconAmount}>{cartReducer.state.length}</div>
      </div>
      <div className={`${s.overlay} ${active ? s.overlayActive : ""}`} onClick={() => setActive(false)}></div>
      <CartContainer active={active} setActive={(state) => setActive(state)} />
    </div>
  );
};

export default Cart;
