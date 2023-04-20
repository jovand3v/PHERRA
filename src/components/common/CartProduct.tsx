import Image from "next/image";
import s from "./CartProduct.module.scss";
import ExitIcon from "@public/assets/icons/x.svg";
import DropdownMenu from "./DropdownMenu";
import { memo, useContext } from "react";
import { CartContext } from "src/context/cart";
import { CartProduct } from "src/context/cart";
import { CollectionProductColorObject } from "src/lib/products";

type Quantity = [number, ...number[]];
type Props = {
  cartProduct: CartProduct;
};
export type DropdownType = "size" | "color" | "quantity";
export type DropdownValue = { size: string; color: CollectionProductColorObject; quantity: number };

const CartProduct = (props: Props) => {
  const { cartProduct } = props;
  const product = cartProduct.product;
  const { cartReducer } = useContext(CartContext);
  const quantity: Quantity = [1, 2, 3, 4, 5];

  const handleRemove = () => {
    cartReducer.dispatch({ type: "REMOVE_PRODUCT", payload: cartProduct });
  };

  const handleDropdownChange = <T extends DropdownType>(type: T, value: DropdownValue[T]) => {
    cartReducer.dispatch({ type: "UPDATE_PRODUCT", payload: { product: cartProduct, type, value } });
  };

  return (
    <li className={s.main}>
      <Image className={s.image} src={product.img} alt={`${product.colors[0].name} ${product.name}`} />
      <div className={s.container}>
        <header className={s.header}>
          <h3 className={s.title}>{product.name}</h3>
          <p className={s.description}>2023 Collection</p>
        </header>
        <ul className={s.info}>
          <li className={s.stock}>{product.inStock ? "In Stock" : "Out of Stock"}</li>
          <li className={s.infoItemDropdown}>
            Size:&nbsp;
            <DropdownMenu
              items={product.sizes}
              customDefault={cartProduct.selected.size}
              onSelect={(value) => handleDropdownChange("size", value)}
            />
          </li>
          <li className={s.infoItemDropdown}>
            Color:&nbsp;
            <DropdownMenu
              items={product.colors}
              customDefault={cartProduct.selected.color}
              onSelect={(value) => handleDropdownChange("color", value)}
            />
          </li>
          <li className={s.infoItemDropdown}>
            Quantity:&nbsp;
            <DropdownMenu
              items={quantity}
              customDefault={cartProduct.selected.quantity}
              onSelect={(value) => handleDropdownChange("quantity", value)}
            />
          </li>
        </ul>
      </div>
      <p className={s.price}>${Math.round(product.price - (product.discount / 100) * product.price)}</p>
      <ExitIcon className={s.remove} onClick={handleRemove} />
    </li>
  );
};

export default memo(CartProduct);
