import s from "./CollectionModalStock.module.scss";
import EditIcon from "@public/assets/icons/edit.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import { Dispatch, useRef, useState } from "react";
import { SetStateAction } from "react";
import { Sizes } from "./CollectionModalStock";
import { StockItem } from "./CollectionModalStockProductAdd";
import { AdminDashboardCollectionProduct } from "./Collection";

type Props = {
  item: StockItem;
  sizes: Sizes;
  setProduct: Dispatch<SetStateAction<AdminDashboardCollectionProduct>>;
};

const CollectionModalStockProduct = (props: Props) => {
  const { item, sizes, setProduct } = props;
  const [local, setLocal] = useState<StockItem>({
    id: item.id,
    colorName: item.colorName,
    colorHex: item.colorHex,
    quantity: item.quantity,
    selectedSizes: { ...item.selectedSizes },
  });
  const [editing, setEditing] = useState(false);
  const [err, setErr] = useState({ colorName: false, colorHex: false, quantity: false, sizes: false });
  const colorNameInputRef = useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof StockItem>(field: K, value: StockItem[K]) => {
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
      setProduct((prevState) => {
        const index = prevState.stock.findIndex((stockItem) => stockItem.id === item.id);
        return {
          ...prevState,
          stock: [...prevState.stock.slice(0, index), local, ...prevState.stock.slice(index + 1)],
        };
      });
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => colorNameInputRef.current?.focus(), 0);
  };

  const handleDelete = () => {
    setProduct((prevState) => ({
      ...prevState,
      stock: prevState.stock.filter((stockItem) => stockItem.id !== item.id),
    }));
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

export default CollectionModalStockProduct;
