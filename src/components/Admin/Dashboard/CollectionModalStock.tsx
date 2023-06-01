import s from "./CollectionModalStock.module.scss";
import { Dispatch, SetStateAction } from "react";
import CollectionModalStockProduct from "./CollectionModalStockProduct";
import CollectionModalStockProductAdd from "./CollectionModalStockProductAdd";
import { InputErrors } from "./CollectionModal";
import { CollectionModalProductInputs } from "./CollectionModal";
import { ProductSizes } from "src/db/init_db";

type Props = {
  product: CollectionModalProductInputs;
  setProduct: Dispatch<SetStateAction<CollectionModalProductInputs>>;
  err: InputErrors;
};

const CollectionModalStock = (props: Props) => {
  const { product, setProduct, err } = props;
  const sizes: ProductSizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className={s.main}>
      <p className={`${s.label} ${err.stock ? s.inputErr : ""}`}>STOCK*</p>
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead className={s.tableHead}>
            <tr className={s.tableRow}>
              <th className={s.tableHeader}>COLOR NAME</th>
              <th className={s.tableHeader}>COLOR HEX</th>
              <th className={s.tableHeader}>SIZES</th>
              <th className={s.tableHeader}>FUNC</th>
            </tr>
          </thead>
          <tbody className={s.tableBody}>
            {product.stock.map((stock) => (
              <CollectionModalStockProduct
                product={product}
                productStock={stock}
                sizes={sizes}
                key={Math.random().toString(36).substring(2, 10)}
                setProduct={setProduct}
              />
            ))}
            <CollectionModalStockProductAdd product={product} sizes={sizes} setProduct={setProduct} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionModalStock;
