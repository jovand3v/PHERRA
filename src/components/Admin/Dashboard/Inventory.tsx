import { Collections } from "@prisma/client";
import s from "./Inventory.module.scss";
import { Product } from "src/db/init_db";

type Props = {
  collections: Collections[];
  products: Product[];
};

const Inventory = (props: Props) => {
  const { collections, products } = props;
  const outOfStockAmount = products.reduce((acc, curr) => {
    if (curr.stock.some((stock) => stock.sizes.some((size) => size.quantity === 0))) {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <ul className={s.main}>
      <li className={s.category}>
        <p className={s.title}>CATEGORIES:</p>
        <p className={s.amount}>{collections.length}</p>
      </li>
      <li className={s.category}>
        <p className={s.title}>TOTAL PRODUCTS:</p>
        <p className={s.amount}>{products.length}</p>
      </li>
      <li className={s.category}>
        <p className={s.title}>OUT OF STOCK:</p>
        <p className={s.amount}>{outOfStockAmount}</p>
      </li>
    </ul>
  );
};

export default Inventory;
