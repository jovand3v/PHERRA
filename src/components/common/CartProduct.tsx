import Image from "next/image";
import s from "./CartProduct.module.scss";
import ExitIcon from "@public/assets/icons/x.svg";
import DropdownMenu from "./DropdownMenu";
import { useContext } from "react";
import { ProductsContext } from "src/context/products";
import { Product, ProductColorObject } from "src/context/products";

type Quantity = [number, ...number[]];
type Props = {
  product: Product;
};

const CartProduct = (props: Props) => {
  const { product } = props;
  const { setProducts } = useContext(ProductsContext);
  const quantity: Quantity = [1, 2, 3, 4, 5];

  const handleRemove = () => {
    setProducts((products) => products.filter((p) => p.id !== product.id));
  };

  // updates products based on selected dropdown value
  const handleDropdownChange = (type: string, value: string | number | ProductColorObject) => {
    setProducts((products) =>
      products.map((p) => {
        if (p.id === product.id) {
          p.selected = { ...p.selected, [type]: value };
        }
        return p;
      })
    );
  };

  return (
    <li className={s.main}>
      <Image className={s.image} src={product.img.src} alt={product.img.alt} />
      <div className={s.container}>
        <header className={s.header}>
          <h3 className={s.title}>{product.name}</h3>
          <p className={s.description}>2023 Collection</p>
        </header>
        <ul className={s.info}>
          <li className={s.stock}>{product.inStock ? "In Stock" : "Out of Stock"}</li>
          <li className={s.infoItemDropdown}>
            Size:&nbsp;
            <span>
              <DropdownMenu items={product.sizes} onSelect={(value) => handleDropdownChange("size", value)} />
            </span>
          </li>
          <li className={s.infoItemDropdown}>
            Color:&nbsp;
            <DropdownMenu items={product.colors} onSelect={(value) => handleDropdownChange("color", value)} />
          </li>
          <li className={s.infoItemDropdown}>
            Quantity:&nbsp;
            <DropdownMenu items={quantity} onSelect={(value) => handleDropdownChange("quantity", value)} />
          </li>
        </ul>
      </div>
      <p className={s.price}>${Math.round(product.price - (product.discount / 100) * product.price)}</p>
      <ExitIcon className={s.remove} onClick={handleRemove} />
    </li>
  );
};

export default CartProduct;
