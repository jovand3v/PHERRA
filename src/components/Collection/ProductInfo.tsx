import { useEffect, useLayoutEffect, useState } from "react";
import s from "./ProductInfo.module.scss";
import { CartProduct, CartContext, CartProductSelected } from "src/context/cart";
import { handlePriceDiscount } from "src/lib/products";
import ExitIcon from "@public/assets/icons/x.svg";
import DiscountIcon from "@public/assets/icons/discount.svg";
import TankTopIcon from "@public/assets/icons/tank-top.svg";
import { useContext } from "react";
import Image from "next/image";
import useWindowWidth from "src/hooks/useWindowWidth";
import { Product, ProductSizes } from "src/db/init_db";

type Props = {
  selectedProduct: Product;
  showcaseActive: boolean;
  setShowcaseActive: (s: boolean) => void;
};

const ProductInfo = (props: Props) => {
  const { selectedProduct, showcaseActive, setShowcaseActive } = props;
  const { cartReducer } = useContext(CartContext);
  const defaultSelected: CartProductSelected = {
    size: selectedProduct.stock[0].sizes[0].size,
    quantity: selectedProduct.stock[0].sizes[0].quantity >= 1 ? 1 : 0,
    color: { colorName: selectedProduct.stock[0].colorName, colorHex: selectedProduct.stock[0].colorHex },
  };
  const [selected, setSelected] = useState(defaultSelected);
  const quantity = [1, 2, 3, 4, 5];
  const sizes: ProductSizes = ["XS", "S", "M", "L", "XL"];
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth !== 0 && windowWidth <= 1024) {
      document.getElementsByTagName("html")[0].style.overflowY = showcaseActive ? "hidden" : "visible";
    }
  }, [showcaseActive, windowWidth]);

  // updates selected data based on product select, has to be done via effect because of transitions
  useLayoutEffect(() => {
    setSelected(defaultSelected);
  }, [selectedProduct]);

  const handleCartAdd = () => {
    const id = cartReducer.state.length === 0 ? 1 : cartReducer.state[cartReducer.state.length - 1].id + 1;
    const product: CartProduct = { id, product: selectedProduct, selected };
    cartReducer.dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  return (
    <div className={`${s.main} ${showcaseActive ? s.active : ""}`}>
      <div className={s.mainOverlay} onClick={() => setShowcaseActive(false)}></div>
      <div className={s.mainContent}>
        <div className={s.imageOverlay}></div>
        <Image className={s.image} width={650} height={1000} src={selectedProduct.img} alt={selectedProduct.name} />
        <div className={s.mainContainer}>
          <ExitIcon className={s.close} onClick={() => setShowcaseActive(false)} />
          <div className={s.discountBox}>-{selectedProduct.discount}%</div>
          <header className={s.header}>
            <h3 className={s.name}>{selectedProduct.name}</h3>
            <p className={s.subtitle}>2023 Collection</p>
          </header>
          <ul className={s.tags}>
            <li className={s.tag}>
              <DiscountIcon className={s.tagIcon} /> <span className={s.tagTitle}>Discounted</span>
            </li>
            <li className={s.tag}>
              <TankTopIcon className={s.tagIcon} /> <span className={s.tagTitle}>2023</span>
            </li>
          </ul>
          <div className={s.customizableInfoContainer}>
            <ul className={s.customizableInfo}>
              <li className={s.selectContainer}>
                <header className={s.selectHeader}>
                  <h4 className={s.selectTitle}>SELECT COLOR:</h4>
                  <p className={s.selectDescription}>AVAILABLE COLORS</p>
                </header>
                <ul className={s.colors}>
                  {selectedProduct.stock.map((stockObj, index) => (
                    <li
                      className={`${s.color} ${
                        stockObj.colorName === selected.color.colorName && stockObj.colorHex === selected.color.colorHex
                          ? s.colorActive
                          : ""
                      }`}
                      onClick={() =>
                        setSelected((s) => ({
                          ...s,
                          color: { colorName: stockObj.colorName, colorHex: stockObj.colorHex },
                        }))
                      }
                      key={index}
                    >
                      <div className={s.colorBox} style={{ background: `#${stockObj.colorHex}` }}></div>
                      <span className={s.colorName}>{stockObj.colorName}</span>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={s.selectContainer}>
                <header className={s.selectHeader}>
                  <h4 className={s.selectTitle}>SELECT SIZE:</h4>
                  <p className={s.selectDescription}>AVAILABLE SIZES</p>
                </header>
                <ul className={s.boxList}>
                  {sizes.map((size, index) => {
                    const quantity =
                      selectedProduct.stock
                        .find((s) => s.colorName === selected.color.colorName && s.colorHex === selected.color.colorHex)
                        ?.sizes.find((s) => s.size === size)?.quantity === 0
                        ? 0
                        : 1;
                    return (
                      <li
                        className={`${s.boxListItem} ${size === selected.size ? s.boxListItemActive : ""} `}
                        onClick={() =>
                          setSelected((s) => ({
                            ...s,
                            size,
                            quantity,
                          }))
                        }
                        key={index}
                      >
                        {size}
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className={s.selectContainer}>
                <header className={s.selectHeader}>
                  <h4 className={s.selectTitle}>SELECT QUANTITY:</h4>
                  <p className={s.selectDescription}>AVAILABLE QUANTITIES</p>
                </header>
                <ul className={s.boxList}>
                  {quantity.map((quantity, index) => {
                    const productQuantity = selectedProduct.stock
                      .find((sp) => sp.colorName === selected.color.colorName)
                      ?.sizes.find((sizesObj) => sizesObj.size === selected.size)?.quantity;
                    const productQuantityArr = Array.from({ length: productQuantity! }, (_, index) => index + 1);
                    const disabled = !productQuantityArr.includes(quantity);

                    return (
                      <li
                        className={`${s.boxListItem} ${
                          quantity === selected.quantity && !disabled ? s.boxListItemActive : ""
                        } ${disabled ? s.boxListItemDisabled : ""}`}
                        onClick={() => !disabled && setSelected((s) => ({ ...s, quantity }))}
                        key={index}
                      >
                        {quantity}
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            <div className={s.buttonContainer}>
              <div className={s.priceContainer}>
                <div className={s.oldPriceContainer}>
                  <span className={s.oldPrice}>${selectedProduct.price}</span>
                  <span className={s.discount}>-{selectedProduct.discount}%</span>
                </div>
                <p className={s.price}>${handlePriceDiscount(selectedProduct.price, selectedProduct.discount)}</p>
              </div>
              <button
                className={`${s.button} ${selected.quantity === 0 ? s.buttonDisabled : ""}`}
                onClick={handleCartAdd}
                disabled={selected.quantity === 0}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
