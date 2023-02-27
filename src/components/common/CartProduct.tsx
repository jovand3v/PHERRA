import { useState } from "react";
import Image from "next/image";
import s from "./CartProduct.module.scss";
import PhotoNotFoundIcon from "@public/assets/icons/photo-not-found.svg";
import model from "@public/assets/models/summer-model-2.png";
import ExitIcon from "@public/assets/icons/x.svg";
import PlusIcon from "@public/assets/icons/plus.svg";
import MinusIcon from "@public/assets/icons/minus.svg";
import ArrowIcon from "@public/assets/icons/arrow-short.svg";

const CartProduct = () => {
  const [dropdown, setDropdown] = useState({ size: false, color: false });
  const [quantity, setQuantity] = useState("1");
  const image = false;
  const colors = [
    { value: "#ffd481", name: "beige" },
    { value: "lightblue", name: "blue" },
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleDropdown = (type: "size" | "color"): void => {
    const size = dropdown.size ? false : type === "size";
    const color = dropdown.color ? false : type === "color";
    setDropdown({ size, color });
  };

  return (
    <li className={s.main}>
      {image ? (
        <Image className={s.image} src={model} alt="model" />
      ) : (
        <div className={s.imageNotFound}>
          <PhotoNotFoundIcon className={s.imageNotFoundIcon} />
        </div>
      )}
      <div className={s.container}>
        <header className={s.header}>
          <h3 className={s.title}>OPEN SHIRT</h3>
          <p className={s.description}>2023 Collection</p>
        </header>
        <ul className={s.info}>
          <li className={s.stock}>In Stock</li>
          <li className={s.size}>
            Size:&nbsp;
            <div className={s.dropdownContainer}>
              <span className={s.sizeInput} onClick={() => handleDropdown("size")}>
                S<ArrowIcon className={s.dropdownIcon} />
              </span>
              {dropdown.size && (
                <ul className={s.dropdown}>
                  {sizes.map((size, k) => (
                    <li className={s.dropdownItem} key={k}>
                      {size}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li className={s.color}>
            Color:
            <div className={s.dropdownContainer}>
              <div className={s.colorDisplay} style={{ background: "#ffd481" }}></div>
              <span className={s.colorInput} onClick={() => handleDropdown("color")}>
                Beige
                <ArrowIcon className={s.dropdownIcon} />
              </span>
              {dropdown.color && (
                <ul className={s.dropdown}>
                  {colors.map((c, k) => (
                    <li className={`${s.dropdownItem} ${s.dropdownItemColor}`} key={k}>
                      <div className={s.colorDisplay} style={{ background: `${c.value}` }}></div>
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </ul>
        <div className={s.quantity}>
          Quantity: <MinusIcon className={s.quantityFunction} />
          <input
            className={s.quantityInput}
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <PlusIcon className={s.quantityFunction} />
        </div>
      </div>
      <p className={s.price}>$159.99</p>
      <ExitIcon className={s.remove} />
    </li>
  );
};

export default CartProduct;
