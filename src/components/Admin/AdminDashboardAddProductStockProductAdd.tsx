import s from "./AdminDashboardAddProductStock.module.scss";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import { useState, SetStateAction } from "react";
import { Sizes } from "./AdminDashboardAddProductStock";

type Inputs = {
  colorName: string;
  colorHex: string;
  quantity: string;
};

export type Details = {
  id: number;
  colorName: string;
  colorHex: string;
  quantity: string;
  selectedSizes: { XS: boolean; S: boolean; M: boolean; L: boolean; XL: boolean; XXL: boolean };
};

type Props = {
  stock: Details[];
  setStock: (stock: SetStateAction<Details[]>) => void;
  sizes: Sizes;
};

const AdminDashboardAddProductStockProductAdd = (props: Props) => {
  const { stock, setStock, sizes } = props;
  const [err, setErr] = useState({ colorName: false, colorHex: false, quantity: false, sizes: false });
  const [details, setDetails] = useState<Details>({
    id: 0,
    colorName: "",
    colorHex: "",
    quantity: "1",
    selectedSizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
  });

  const handleSubmit = () => {
    if (
      details.colorName !== "" &&
      details.colorHex !== "" &&
      JSON.parse(details.quantity) > 0 &&
      Object.values(details.selectedSizes).some((s) => s)
    ) {
      const id = stock[stock.length - 1] ? stock[stock.length - 1].id + 1 : 0;
      setStock((prevState) => [...prevState, { ...details, id }]);
      handleClear();
    }
    setErr({
      colorName: details.colorName === "",
      colorHex: details.colorHex === "",
      quantity: details.quantity === "" || (details.quantity !== "" && JSON.parse(details.quantity) < 1),
      sizes: Object.values(details.selectedSizes).every((s) => !s),
    });
  };

  const handleClear = () => {
    setDetails({
      id: 0,
      colorName: "",
      colorHex: "",
      quantity: "1",
      selectedSizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
    });
    setErr({ colorName: false, colorHex: false, quantity: false, sizes: false });
  };

  const handleSizeSelect = (size: keyof Details["selectedSizes"]) => {
    setDetails((prevState) => ({
      ...prevState,
      selectedSizes: { ...prevState.selectedSizes, [size]: !prevState.selectedSizes[size] },
    }));
  };

  const handleChange = <T extends keyof Inputs>(field: T, value: Inputs[T]) => {
    setDetails((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <tr className={`${s.tableRow} ${s.tableRowAdd}`}>
      <td className={`${s.tableData} ${err.colorName ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="White"
          value={details.colorName}
          onChange={(e) => handleChange("colorName", e.target.value)}
        />
      </td>
      <td className={`${s.tableData} ${err.colorHex ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="#FFFFFF"
          value={details.colorHex}
          onChange={(e) => handleChange("colorHex", e.target.value)}
        />
      </td>
      <td className={`${s.tableData} ${err.quantity ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="5"
          value={details.quantity}
          onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("quantity", e.target.value)}
        />
      </td>
      <td className={`${s.tableData} ${err.sizes ? s.tableDataErr : ""} `}>
        <ul className={s.tableSizesList}>
          {sizes.map((size, index) => {
            const match = details.selectedSizes[size];
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
        </ul>
      </td>
      <td className={s.tableData}>
        <CheckmarkIcon className={s.icon} onClick={handleSubmit} />{" "}
        <TrashcanIcon className={s.icon} onClick={handleClear} />
      </td>
    </tr>
  );
};

export default AdminDashboardAddProductStockProductAdd;
