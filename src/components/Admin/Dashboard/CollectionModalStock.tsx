import s from "./CollectionModalStock.module.scss";
import { useState } from "react";
import CollectionModalStockProduct from "./CollectionModalStockProduct";
import CollectionModalStockProductAdd from "./CollectionModalStockProductAdd";

export type Sizes = ["XS", "S", "M", "L", "XL", "XXL"];
export type Inputs = Omit<Details, "id">;
export type Details = {
  id: number;
  colorName: string;
  colorHex: string;
  quantity: string;
  selectedSizes: { XS: boolean; S: boolean; M: boolean; L: boolean; XL: boolean; XXL: boolean };
};

const CollectionModalStock = () => {
  const [stock, setStock] = useState<Details[]>([]);
  const sizes: Sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className={s.main}>
      <p className={s.label}>STOCK</p>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr className={s.tableRow}>
            <th className={s.tableHeader}>COLOR NAME</th>
            <th className={s.tableHeader}>COLOR HEX</th>
            <th className={s.tableHeader}>QUANTITY</th>
            <th className={s.tableHeader}>SIZES</th>
            <th className={s.tableHeader}>FUNC</th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {stock.map((item) => (
            <CollectionModalStockProduct
              item={item}
              key={item.id}
              setStock={(stock) => setStock(stock)}
              sizes={sizes}
            />
          ))}
          <CollectionModalStockProductAdd setStock={(stock) => setStock(stock)} sizes={sizes} />
        </tbody>
      </table>
    </div>
  );
};

export default CollectionModalStock;
