import s from "./CartContainer.module.scss";
import CartProduct from "./CartProduct";
import ExitIcon from "@public/assets/icons/x.svg";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "src/context/products";

type Props = {
  active: boolean;
  setActive: (state: boolean) => void;
};

const CartContainer = (props: Props) => {
  const { active, setActive } = props;
  const { products } = useContext(ProductsContext);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  // calculates total quantity
  useEffect(() => {
    const quantities = products.map((p) => p.selected.quantity);
    const totalQuantity = quantities.reduce((acc, curr) => acc + curr, 0);

    if (quantity !== totalQuantity) {
      setQuantity(totalQuantity);
    }
  }, [products]);

  // calculates total price
  useEffect(() => {
    const pricesAndQuantities = products.map((p) => ({
      price: p.price,
      quantity: p.selected.quantity,
    }));
    const totalPrice = pricesAndQuantities.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    if (total !== totalPrice) {
      setTotal(totalPrice);
    }
  }, [products]);

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
              selected={p.selected}
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
