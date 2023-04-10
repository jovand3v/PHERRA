import { useState } from "react";
import DropdownMenu from "../common/DropdownMenu";
import s from "./AdminDashboardCollection.module.scss";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";

type DropdownType = [string, ...string[]];

const AdminDashboardCollection = () => {
  const sortOptions: DropdownType = ["ID ASCENDING", "ID DESCENDING"];
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");

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
          <tr className={s.tableRow}>
            <td className={s.tableData}>0</td>
            <td className={s.tableData}>Product 1</td>
            <td className={s.tableData}>$159.99</td>
            <td className={s.tableData}>20%</td>
            <td className={s.tableData}>
              <ul className={s.colorList}>
                <li className={s.colorItem}>
                  <div className={s.colorBox} style={{ background: "white" }}></div> White,
                </li>
                <li className={s.colorItem}>
                  <div className={s.colorBox} style={{ background: "red" }}></div> Red
                </li>
              </ul>
            </td>
            <td className={s.tableData}>shirt.jpg</td>
            <td className={s.tableData}>10/04/2023</td>
          </tr>
        </tbody>
      </table>
      <button className={s.button}>ADD PRODUCT</button>
    </div>
  );
};

export default AdminDashboardCollection;
