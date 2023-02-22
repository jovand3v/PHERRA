import s from "./CartContainer.module.scss";
import CartProduct from "./CartProduct";

const CartContainer = () => {
  return (
    <div className={s.cartContainer}>
      <header className={s.cartHeader}>
        <h2 className={s.cartTitle}>CART</h2>
        <p className={s.cartDescription}>Your cart items</p>
      </header>
      {true ? (
        <ul className={s.productsContainer}>
          <CartProduct />
        </ul>
      ) : (
        <div className={s.productsContainerEmpty}>
          <p className={s.productsContainerEmptyText}>NO PRODUCTS FOUND</p>
        </div>
      )}
      <div className={s.checkout}>
        <div>
          <p className={s.checkoutQuantity}>1 Item</p>
          <p className={s.checkoutTotal}>
            <span className={s.checkoutTotalHighlight}>TOTAL:</span> $159.99
          </p>
        </div>
        <button className={s.checkoutButton}>CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartContainer;
