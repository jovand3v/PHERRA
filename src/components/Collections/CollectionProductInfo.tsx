import { useLayoutEffect, useState } from "react";
import s from "./CollectionProductInfo.module.scss";
import { CartProduct, Product, ProductsContext, ProductSelected } from "src/context/products";
import ExitIcon from "@public/assets/icons/x.svg";
import DiscountIcon from "@public/assets/icons/discount.svg";
import TankTopIcon from "@public/assets/icons/tank-top.svg";
import { useContext } from "react";
import Image from "next/image";

type Props = {
  selectedProduct: Product;
  showcaseActive: boolean;
  setShowcaseActive: (s: boolean) => void;
};

const CollectionProductInfo = (props: Props) => {
  const { selectedProduct, showcaseActive, setShowcaseActive } = props;
  const { cart, setCart } = useContext(ProductsContext);
  const quantity = [1, 2, 3, 4, 5];
  const defaultSelected: ProductSelected = {
    size: selectedProduct.sizes[0],
    quantity: quantity[0],
    color: selectedProduct.colors[0],
  };
  const [selected, setSelected] = useState(defaultSelected);

  // updates selected data based on product select, has to be done via effect because of transitions
  useLayoutEffect(() => {
    setSelected(defaultSelected);
  }, [selectedProduct]);

  const handleCartAdd = () => {
    setCart((cart) => {
      const id = cart.length === 0 ? 1 : cart[cart.length - 1].id + 1;
      const cartProduct: CartProduct = { id, product: selectedProduct, selected };
      return [...cart, cartProduct];
    });
  };

  return (
    <div className={`${s.main} ${showcaseActive ? s.active : ""}`}>
      <div className={s.imageOverlay}></div>
      <Image
        className={s.image}
        src={selectedProduct.img}
        alt={`${selectedProduct.colors[0].name} ${selectedProduct.name}`}
      />
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
                {selectedProduct.colors.map((color, index) => (
                  <li
                    className={`${s.color} ${
                      color.name === selected.color.name && color.value === selected.color.value ? s.colorActive : ""
                    }`}
                    onClick={() => setSelected((s) => ({ ...s, color: color }))}
                    key={index}
                  >
                    <div className={s.colorBox} style={{ background: color.value }}></div>
                    <span className={s.colorName}>{color.name}</span>
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
                {selectedProduct.sizes.map((size, index) => (
                  <li
                    className={`${s.boxListItem} ${size === selected.size ? s.boxListItemActive : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, size }))}
                    key={index}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </li>
            <li className={s.selectContainer}>
              <header className={s.selectHeader}>
                <h4 className={s.selectTitle}>SELECT QUANTITY:</h4>
                <p className={s.selectDescription}>AVAILABLE QUANTITIES</p>
              </header>
              <ul className={s.boxList}>
                {quantity.map((quantity, index) => (
                  <li
                    className={`${s.boxListItem} ${quantity === selected.quantity ? s.boxListItemActive : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, quantity }))}
                    key={index}
                  >
                    {quantity}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className={s.buttonContainer}>
            <div className={s.priceContainer}>
              <div className={s.oldPriceContainer}>
                <span className={s.oldPrice}>${selectedProduct.price}</span>
                <span className={s.discount}>-{selectedProduct.discount}%</span>
              </div>
              <p className={s.price}>
                ${Math.round(selectedProduct.price - (selectedProduct.discount / 100) * selectedProduct.price)}
              </p>
            </div>
            <button className={s.button} onClick={handleCartAdd}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProductInfo;