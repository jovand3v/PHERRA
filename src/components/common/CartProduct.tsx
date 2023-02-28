import Image from "next/image";
import s from "./CartProduct.module.scss";
import PhotoNotFoundIcon from "@public/assets/icons/photo-not-found.svg";
import model from "@public/assets/models/summer-model-2.png";
import ExitIcon from "@public/assets/icons/x.svg";
import DropdownMenu from "./DropdownMenu";

const CartProduct = () => {
  const image = false;
  const sizes = [
    { id: 1, value: "S" },
    { id: 2, value: "M" },
    { id: 3, value: "L" },
    { id: 4, value: "XL" },
    { id: 5, value: "XXL" },
  ];
  const colors = [
    { id: 1, value: "Beige", color: "#ffd481" },
    { id: 2, value: "Blue", color: "lightblue" },
  ];
  const quantity = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

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
          <li className={s.infoItemDropdown}>
            Size:&nbsp;
            <span>
              <DropdownMenu items={sizes} />
            </span>
          </li>
          <li className={s.infoItemDropdown}>
            Color:&nbsp;
            <DropdownMenu items={colors} />
          </li>
          <li className={s.infoItemDropdown}>
            Quantity:&nbsp;
            <DropdownMenu items={quantity} />
          </li>
        </ul>
      </div>
      <p className={s.price}>$159.99</p>
      <ExitIcon className={s.remove} />
    </li>
  );
};

export default CartProduct;
