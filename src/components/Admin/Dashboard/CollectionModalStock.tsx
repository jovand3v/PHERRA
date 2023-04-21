import s from "./CollectionModalStock.module.scss";
import { Dispatch, SetStateAction } from "react";
import CollectionModalStockProduct from "./CollectionModalStockProduct";
import CollectionModalStockProductAdd from "./CollectionModalStockProductAdd";
import { AdminDashboardCollectionProduct } from "./Collection";

export type Sizes = ["XS", "S", "M", "L", "XL", "XXL"];
type Props = {
  product: AdminDashboardCollectionProduct;
  setProduct: Dispatch<SetStateAction<AdminDashboardCollectionProduct>>;
};

const CollectionModalStock = (props: Props) => {
  const { product, setProduct } = props;
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
          {product.stock.map((item) => (
            <CollectionModalStockProduct item={item} key={item.id} sizes={sizes} setProduct={setProduct} />
          ))}
          <CollectionModalStockProductAdd sizes={sizes} setProduct={setProduct} />
        </tbody>
      </table>
    </div>
  );
};

export default CollectionModalStock;
