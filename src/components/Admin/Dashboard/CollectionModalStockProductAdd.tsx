import s from "./CollectionModalStock.module.scss";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import { useState, SetStateAction, Dispatch } from "react";
import { Sizes } from "./CollectionModalStock";
import { AdminDashboardCollectionProduct } from "./Collection";

type Props = {
  sizes: Sizes;
  setProduct: Dispatch<SetStateAction<AdminDashboardCollectionProduct>>;
};
export type StockItem = {
  id: number;
  colorName: string;
  colorHex: string;
  quantity: string;
  selectedSizes: {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
    XXL: boolean;
  };
};

const CollectionModalStockProductAdd = (props: Props) => {
  const { sizes, setProduct } = props;
  const errDefault = { colorName: false, colorHex: false, quantity: false, sizes: false };
  const itemDefault = {
    id: 0,
    colorName: "",
    colorHex: "",
    quantity: "1",
    selectedSizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
  };
  const [err, setErr] = useState(errDefault);
  const [item, setItem] = useState<StockItem>(itemDefault);

  const handleSubmit = () => {
    const errors = {
      colorName: !item.colorName,
      colorHex: !item.colorHex,
      quantity: !item.quantity || JSON.parse(item.quantity) < 1,
      sizes: Object.values(item.selectedSizes).every((s) => !s),
    };
    setErr(errors);
    if (Object.values(errors).every((e) => !e)) {
      setProduct((prevState) => {
        const id = prevState.stock[prevState.stock.length - 1]?.id + 1 || 0;
        return { ...prevState, stock: [...prevState.stock, { ...item, id }] };
      });
      handleClear();
    }
  };

  const handleClear = () => {
    setItem(itemDefault);
    setErr(errDefault);
  };

  const handleChange = <K extends keyof StockItem>(field: K, value: StockItem[K]) => {
    setItem((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <tr className={`${s.tableRow} ${s.tableRowAdd}`}>
      <td className={`${s.tableData} ${err.colorName ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="White"
          value={item.colorName}
          onChange={(e) => handleChange("colorName", e.target.value)}
        />
      </td>
      <td className={`${s.tableData} ${err.colorHex ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="#FFFFFF"
          value={item.colorHex}
          onChange={(e) => handleChange("colorHex", e.target.value)}
        />
      </td>
      <td className={`${s.tableData} ${err.quantity ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="5"
          value={item.quantity}
          onChange={(e) => e.target.value.match("^(?!0)[0-9]*$") && handleChange("quantity", e.target.value)}
        />
      </td>
      <td className={`${s.tableData} ${err.sizes ? s.tableDataErr : ""} `}>
        <ul className={s.tableSizesList}>
          {sizes.map((size, index) => {
            const match = item.selectedSizes[size];
            return (
              <li
                key={index}
                className={`${s.tableSize} ${match ? s.tableSizeActive : ""}`}
                onClick={() =>
                  handleChange("selectedSizes", { ...item.selectedSizes, [size]: !item.selectedSizes[size] })
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

export default CollectionModalStockProductAdd;
