import s from "./AdminDashboardAddProductStock.module.scss";
import EditIcon from "@public/assets/icons/edit.svg";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import { useState } from "react";

type Inputs = {
  colorName: string;
  colorHex: string;
  quantity: number;
};

type Details = {
  colorName: string;
  colorHex: string;
  quantity: number;
  selectedSizes: { XS: boolean; S: boolean; M: boolean; L: boolean; XL: boolean; XXL: boolean };
};

const AdminDashboardAddProductStock = () => {
  const [stock, setStock] = useState<Details[]>([]);
  const [details, setDetails] = useState<Details>({
    colorName: "",
    colorHex: "",
    quantity: 0,
    selectedSizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
  });

  const handleChange = <T extends keyof Inputs>(field: T, value: Inputs[T]) => {
    setDetails((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    setStock((prevState) => [...prevState, { ...details }]);
  };

  const handleClear = () => {
    setDetails({
      colorName: "",
      colorHex: "",
      quantity: 0,
      selectedSizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
    });
  };

  //   const handleSizeSelect = (size: keyof Details["selectedSizes"]) => {
  //     setDetails((prevState) => ({
  //       ...prevState,
  //       selectedSizes: { ...prevState.selectedSizes, [size]: !prevState.selectedSizes[size] },
  //     }));
  //   };

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
            <tr className={s.tableRow}>
              <td className={s.tableData}>{item.colorName}</td>
              <td className={s.tableData}>#{item.colorHex}</td>
              <td className={s.tableData}>{item.quantity}</td>
              <td className={s.tableData}>
                {/* <ul className={s.tableSizesList}>
                  {Object.keys(item.selectedSizes).map(
                    (size, index) => item.selectedSizes[size] && <li key={index}>{size}</li>
                  )}
                </ul> */}{" "}
                <ul className={s.tableSizesList}>
                  {Object.keys(details.selectedSizes).map((size, index) => (
                    <li key={index} className={s.tableSize}>
                      {size}
                    </li>
                  ))}
                </ul>
              </td>
              <td className={s.tableData}>
                <EditIcon className={s.icon} /> <TrashcanIcon className={s.icon} />
              </td>
            </tr>
          ))}
          <tr className={`${s.tableRow} ${s.tableRowAdd}`}>
            <td className={s.tableData}>
              <input
                className={s.input}
                placeholder="White"
                onChange={(e) => handleChange("colorName", e.target.value)}
              />
            </td>
            <td className={s.tableData}>
              <input
                className={s.input}
                placeholder="#FFFFFF"
                onChange={(e) => handleChange("colorHex", e.target.value)}
              />
            </td>
            <td className={s.tableData}>
              <input
                className={s.input}
                placeholder="5"
                onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
                type="number"
              />
            </td>
            <td className={s.tableData}>
              {/* <ul className={s.tableSizesList}>
                {Object.keys(details.selectedSizes).map((size, index) => {
                  const match = Boolean(details.selectedSizes[size]);
                  return (
                    <li
                      key={index}
                      className={`${s.tableSize} ${match ? s.tableSizeActive : ""}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </li>
                  );
                })}
              </ul> */}
              <ul className={s.tableSizesList}>
                {Object.keys(details.selectedSizes).map((size, index) => (
                  <li key={index} className={s.tableSize}>
                    {size}
                  </li>
                ))}
              </ul>
            </td>
            <td className={s.tableData}>
              <CheckmarkIcon className={s.icon} onClick={handleSubmit} />{" "}
              <TrashcanIcon className={s.icon} onClick={handleClear} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardAddProductStock;
