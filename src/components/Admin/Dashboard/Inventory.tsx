import { AdminDashboardCollection } from "./Collection";
import s from "./Inventory.module.scss";

type Props = {
  collections: AdminDashboardCollection[];
};

const Inventory = (props: Props) => {
  const { collections } = props;
  const categoryAmount: number = collections.length;
  const productAmount: number = collections.reduce((acc, curr) => (acc += curr.products.length), 0);
  const outOfStockAmount: number = collections.reduce((acc, curr) => {
    const stocks = curr.products.map((product) => product.stock);
    stocks.forEach((stockArr) => stockArr.forEach((stock) => JSON.parse(stock.quantity) === 0 && (acc += 1)));
    return acc;
  }, 0);

  return (
    <ul className={s.main}>
      <li className={s.category}>
        <p className={s.title}>CATEGORIES:</p>
        <p className={s.amount}>{categoryAmount}</p>
      </li>
      <li className={s.category}>
        <p className={s.title}>TOTAL PRODUCTS:</p>
        <p className={s.amount}>{productAmount}</p>
      </li>
      <li className={s.category}>
        <p className={s.title}>OUT OF STOCK:</p>
        <p className={s.amount}>{outOfStockAmount}</p>
      </li>
    </ul>
  );
};

export default Inventory;
