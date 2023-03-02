import Image from "next/image";
import s from "./CartProduct.module.scss";
import PhotoNotFoundIcon from "@public/assets/icons/photo-not-found.svg";
import model from "@public/assets/models/summer-model-2.png";
import ExitIcon from "@public/assets/icons/x.svg";
import DropdownMenu from "./DropdownMenu";

type ColorObject = { name: string; value: string };

type Props = {
  name: string;
  inStock: boolean;
  price: number;
  sizes: [string, ...string[]];
  colors: [ColorObject, ...ColorObject[]];
  img: File | null;
};

type Quantity = [number, ...number[]];

const CartProduct = (props: Props) => {
  const { name, inStock, price, img, sizes, colors } = props;
  const quantity: Quantity = [1, 2, 3, 4, 5];

  return (
    <li className={s.main}>
      {img ? (
        <Image className={s.image} src={model} alt="model" />
      ) : (
        <div className={s.imageNotFound}>
          <PhotoNotFoundIcon className={s.imageNotFoundIcon} />
        </div>
      )}
      <div className={s.container}>
        <header className={s.header}>
          <h3 className={s.title}>{name}</h3>
          <p className={s.description}>2023 Collection</p>
        </header>
        <ul className={s.info}>
          <li className={s.stock}>{inStock ? "In Stock" : "Out of Stock"}</li>
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
      <p className={s.price}>${price}</p>
      <ExitIcon className={s.remove} />
    </li>
  );
};

export default CartProduct;
