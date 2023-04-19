import s from "./AdminDashboardAddProductStock.module.scss";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import { useState, SetStateAction } from "react";
import { Details, Inputs, Sizes } from "./AdminDashboardAddProductStock";

type Props = {
  setStock: (stock: SetStateAction<Details[]>) => void;
  sizes: Sizes;
};

const AdminDashboardAddProductStockProductAdd = (props: Props) => {
  const { setStock, sizes } = props;
  const errDefault = { colorName: false, colorHex: false, quantity: false, sizes: false };
  const detailsDefault = {
    id: 0,
    colorName: "",
    colorHex: "",
    quantity: "1",
    selectedSizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
  };
  const [err, setErr] = useState(errDefault);
  const [details, setDetails] = useState<Details>(detailsDefault);

  const handleSubmit = () => {
    const errors = {
      colorName: !details.colorName,
      colorHex: !details.colorHex,
      quantity: !details.quantity || JSON.parse(details.quantity) < 1,
      sizes: Object.values(details.selectedSizes).every((s) => !s),
    };
    setErr(errors);
    if (Object.values(errors).every((e) => !e)) {
      setStock((prevState) => {
        const id = prevState[prevState.length - 1]?.id + 1 || 0;
        return [...prevState, { ...details, id }];
      });
      handleClear();
    }
  };

  const handleClear = () => {
    setDetails(detailsDefault);
    setErr(errDefault);
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
                onClick={() =>
                  handleChange("selectedSizes", { ...details.selectedSizes, [size]: !details.selectedSizes[size] })
                }
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
