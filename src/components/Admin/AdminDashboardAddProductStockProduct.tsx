import s from "./AdminDashboardAddProductStock.module.scss";
import EditIcon from "@public/assets/icons/edit.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import { useRef, useState } from "react";
import { SetStateAction } from "react";
import { Details, Inputs, Sizes } from "./AdminDashboardAddProductStock";

type Props = {
  item: Details;
  setStock: (stock: SetStateAction<Details[]>) => void;
  sizes: Sizes;
};

const AdminDashboardAddProductStockProduct = (props: Props) => {
  const { item, setStock, sizes } = props;
  const [local, setLocal] = useState<Details>({
    id: item.id,
    colorName: item.colorName,
    colorHex: item.colorHex,
    quantity: item.quantity,
    selectedSizes: { ...item.selectedSizes },
  });
  const [editing, setEditing] = useState(false);
  const [err, setErr] = useState({ colorName: false, colorHex: false, quantity: false, sizes: false });
  const colorNameInputRef = useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof Inputs>(field: K, value: Inputs[K]) => {
    if (!editing) return;
    setLocal((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    const errors = {
      colorName: !local.colorName,
      colorHex: !local.colorHex,
      quantity: !local.quantity || JSON.parse(local.quantity) < 1,
      sizes: Object.values(local.selectedSizes).every((s) => !s),
    };
    setErr(errors);
    if (Object.values(errors).every((e) => !e)) {
      setEditing(false);
      setStock((prevState) => {
        const index = prevState.findIndex((prevItem) => prevItem.id === item.id);
        const updatedItem = { ...local, selectedSizes: { ...local.selectedSizes } };
        return [...prevState.slice(0, index), updatedItem, ...prevState.slice(index + 1)];
      });
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => colorNameInputRef.current?.focus(), 0);
  };

  const handleDelete = () => {
    setStock((prevState) => [...prevState].filter((prevItem) => prevItem.id !== item.id));
  };

  return (
    <tr className={s.tableRow}>
      <td className={`${s.tableData} ${s.tableDataInputWrapper} ${err.colorName ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          value={local.colorName}
          onChange={(e) => handleChange("colorName", e.target.value)}
          disabled={!editing}
          ref={colorNameInputRef}
        />
      </td>
      <td className={`${s.tableData} ${s.tableDataInputWrapper} ${err.colorHex ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          value={local.colorHex}
          onChange={(e) => handleChange("colorHex", e.target.value)}
          disabled={!editing}
        />
      </td>
      <td className={`${s.tableData} ${s.tableDataInputWrapper} ${err.quantity ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          value={local.quantity}
          onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("quantity", e.target.value)}
          disabled={!editing}
        />
      </td>
      <td className={`${s.tableData} ${err.sizes ? s.tableDataErr : ""} `}>
        <ul className={s.tableSizesList}>
          {sizes.map((size, index) => {
            if (editing) {
              return (
                <li
                  key={index}
                  className={`${s.tableSize} ${local.selectedSizes[size] ? s.tableSizeActive : ""}`}
                  onClick={() =>
                    handleChange("selectedSizes", { ...local.selectedSizes, [size]: !local.selectedSizes[size] })
                  }
                >
                  {size}
                </li>
              );
            } else {
              return item.selectedSizes[size] && <li key={index}>{size}</li>;
            }
          })}
        </ul>
      </td>
      <td className={s.tableData}>
        {editing ? (
          <CheckmarkIcon className={s.icon} onClick={handleSubmit} />
        ) : (
          <EditIcon className={s.icon} onClick={handleEdit} />
        )}{" "}
        <TrashcanIcon className={s.icon} onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default AdminDashboardAddProductStockProduct;
