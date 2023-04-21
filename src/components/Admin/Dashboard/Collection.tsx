import { useState } from "react";
import DropdownMenu from "src/components/common/DropdownMenu";
import s from "./Collection.module.scss";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";
import CollectionModal from "./CollectionModal";

type DropdownType = [string, ...string[]];
export type AdminDashboardCollectionProduct = {
  id: number;
  name: string;
  price: string;
  discount: string;
  stock: {
    id: number;
    colorName: string;
    colorHex: string;
    quantity: string;
    selectedSizes: { XS: boolean; S: boolean; M: boolean; L: boolean; XL: boolean; XXL: boolean };
  }[];
  img: { name: string; src: string };
};

const Collection = () => {
  const sortOptions: DropdownType = ["ID ASCENDING", "ID DESCENDING"];
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<AdminDashboardCollectionProduct[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={s.main}>
      <h4 className={s.title}>1. SUMMER</h4>
      <div className={s.filters}>
        <div className={s.searchbar}>
          <input
            className={s.searchbarInput}
            placeholder="SEARCH FOR A PRODUCT..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className={s.searchbarIcon} />
        </div>
        <div className={s.dropdown}>
          SORT BY: &nbsp; <DropdownMenu items={sortOptions} onSelect={(val) => setSortBy(val)} />
        </div>
      </div>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr className={s.tableRow}>
            <th className={s.tableHeader}>ID</th>
            <th className={s.tableHeader}>NAME</th>
            <th className={s.tableHeader}>PRICE</th>
            <th className={s.tableHeader}>DISCOUNT</th>
            <th className={s.tableHeader}>STOCK</th>
            <th className={s.tableHeader}>IMAGE</th>
            <th className={s.tableHeader}>DATE ADDED</th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {products.map((product) => (
            <tr className={s.tableRow} key={product.id}>
              <td className={s.tableData}>{product.id}</td>
              <td className={s.tableData}>{product.name}</td>
              <td className={s.tableData}>{product.price}</td>
              <td className={s.tableData}>{product.discount}</td>
              <td className={s.tableData}>
                <ul className={s.colorList}>
                  {product.stock.map((item) => (
                    <li className={s.colorItem} key={item.id}>
                      <div className={s.colorBox} style={{ background: item.colorHex }}></div>
                      {item.colorName}
                    </li>
                  ))}
                </ul>
              </td>
              <td className={s.tableData}>image.png</td>
              <td className={s.tableData}>10/04/2023</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={s.button} onClick={() => setModalOpen(true)}>
        ADD PRODUCT
      </button>
      {modalOpen && <CollectionModal setModalOpen={setModalOpen} setProducts={setProducts} />}
    </div>
  );
};

export default Collection;
