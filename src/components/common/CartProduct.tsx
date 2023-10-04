import Image from "next/image";
import s from "./CartProduct.module.scss";
import ExitIcon from "@public/assets/icons/x.svg";
import DropdownMenu from "./DropdownMenu";
import { memo, useContext } from "react";
import { CartContext } from "src/context/cart";
import { CartProduct } from "src/context/cart";
import { ProductSize } from "src/db/init_db";

type Props = {
  cartProduct: CartProduct;
};
export type DropdownType = "size" | "color" | "quantity";
export type DropdownValue = { size: ProductSize; color: { colorName: string; colorHex: string }; quantity: number };

const CartProduct = (props: Props) => {
  const { cartProduct } = props;
  const { cartReducer } = useContext(CartContext);
  const quantityMax = cartProduct.product.stock
    .find(
      (s) => s.colorHex === cartProduct.selected.color.colorHex && s.colorName === cartProduct.selected.color.colorName
    )
    ?.sizes.find((s) => s.size === cartProduct.selected.size)!.quantity!;
  const quantityArr = Array.from({ length: quantityMax }, (_, index) => index + 1);

  const handleRemove = () => {
    cartReducer.dispatch({ type: "REMOVE_PRODUCT", payload: cartProduct });
  };

  const handleDropdownChange = <T extends DropdownType>(type: T, value: DropdownValue[T]) => {
    cartReducer.dispatch({ type: "UPDATE_PRODUCT", payload: { product: cartProduct, type, value } });
  };

  return (
    <li className={s.main}>
      <Image
        className={s.image}
        src={cartProduct.product.img}
        width={140}
        height={220}
        alt={`${cartProduct.selected.color.colorName} ${cartProduct.product.name}`}
      />
      <div className={s.container}>
        <header className={s.header}>
          <h3 className={s.title}>{cartProduct.product.name}</h3>
          <p className={s.description}>2023 Collection</p>
        </header>
        <ul className={s.info}>
          <li className={s.stock}>In Stock</li>
          <li className={s.infoItemDropdown}>
            Size:&nbsp;
            <DropdownMenu
              items={
                cartProduct.product.stock
                  .find((stockObj) => stockObj.colorName === cartProduct.selected.color.colorName)
                  ?.sizes.map((s) => s.quantity !== 0 && s.size)
                  .filter((s) => s) as ProductSize[]
              }
              customDefault={cartProduct.selected.size}
              onSelect={(value) => handleDropdownChange("size", value)}
            />
          </li>
          <li className={s.infoItemDropdown}>
            Color:&nbsp;
            <DropdownMenu
              items={cartProduct.product.stock.map((stockObj) => ({
                colorName: stockObj.colorName,
                colorHex: stockObj.colorHex,
              }))}
              customDefault={cartProduct.selected.color}
              onSelect={(value) => handleDropdownChange("color", value)}
            />
          </li>
          <li className={s.infoItemDropdown}>
            Quantity:&nbsp;
            <DropdownMenu
              items={quantityArr}
              customDefault={cartProduct.selected.quantity}
              onSelect={(value) => handleDropdownChange("quantity", value)}
            />
          </li>
        </ul>
      </div>
      <p className={s.price}>
        ${Math.round(cartProduct.product.price - (cartProduct.product.discount / 100) * cartProduct.product.price)}
      </p>
      <ExitIcon className={s.remove} onClick={handleRemove} />
    </li>
  );
};

export default memo(CartProduct);
