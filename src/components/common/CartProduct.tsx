import Image from "next/image";
import s from "./CartProduct.module.scss";
import PhotoNotFoundIcon from "@public/assets/icons/photo-not-found.svg";
import ExitIcon from "@public/assets/icons/x.svg";
import DropdownMenu from "./DropdownMenu";
import { useContext } from "react";
import { ProductsContext } from "src/context/products";
import { Product, ProductColorObject } from "src/context/products";

type Quantity = [number, ...number[]];

const CartProduct = (props: Product) => {
  const { id, name, inStock, price, img, sizes, colors } = props;
  const { setProducts } = useContext(ProductsContext);
  const quantity: Quantity = [1, 2, 3, 4, 5];

  const handleRemove = () => {
    setProducts((products) => products.filter((product) => product.id !== id));
  };

  // updates products based on selected dropdown value
  const handleDropdownChange = (type: string, value: string | number | ProductColorObject) => {
    setProducts((products) =>
      products.map((product) => {
        if (product.id === id) {
          product.selected = { ...product.selected, [type]: value };
        }
        return product;
      })
    );
  };

  return (
    <li className={s.main}>
      {img.src ? (
        <Image className={s.image} src={img.src} alt={img.alt} />
      ) : (
        <div className={`${s.image} ${s.imageNotFound}`}>
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
              <DropdownMenu items={sizes} onSelect={(value) => handleDropdownChange("size", value)} />
            </span>
          </li>
          <li className={s.infoItemDropdown}>
            Color:&nbsp;
            <DropdownMenu items={colors} onSelect={(value) => handleDropdownChange("color", value)} />
          </li>
          <li className={s.infoItemDropdown}>
            Quantity:&nbsp;
            <DropdownMenu items={quantity} onSelect={(value) => handleDropdownChange("quantity", value)} />
          </li>
        </ul>
      </div>
      <p className={s.price}>${price}</p>
      <ExitIcon className={s.remove} onClick={handleRemove} />
    </li>
  );
};

export default CartProduct;
