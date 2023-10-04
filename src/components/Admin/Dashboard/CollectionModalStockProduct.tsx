import s from "./CollectionModalStock.module.scss";
import EditIcon from "@public/assets/icons/edit.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import { Dispatch, useRef, useState } from "react";
import { SetStateAction } from "react";
import { CollectionModalInputs, CollectionModalProductStock } from "./CollectionModal";
import { ProductSizes } from "src/db/init_db";

type Props = {
  product: CollectionModalInputs;
  productStock: CollectionModalProductStock;
  sizes: ProductSizes;
  setProduct: Dispatch<SetStateAction<CollectionModalInputs>>;
};

const CollectionModalStockProduct = (props: Props) => {
  const { product, productStock, setProduct, sizes } = props;
  const [local, setLocal] = useState<CollectionModalProductStock>({
    colorName: productStock.colorName,
    colorHex: productStock.colorHex,
    sizes: [...productStock.sizes],
  });
  const [editing, setEditing] = useState(false);
  const [err, setErr] = useState({ colorName: false, colorHex: false, sizes: false });
  const colorNameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const filteredProducts = product.stock.filter((stock) => JSON.stringify(stock) !== JSON.stringify(productStock));
    const errors = {
      colorName: !local.colorName || filteredProducts.some((s) => s.colorName === local.colorName),
      colorHex: !local.colorHex || filteredProducts.some((s) => s.colorHex === local.colorHex),
      sizes: local.sizes.some((size) => size.quantity === ""),
    };
    setErr(errors);
    if (Object.values(errors).every((e) => !e)) {
      setEditing(false);
      setProduct((prevState) => {
        const index = prevState.stock.findIndex(
          (stockItem) => JSON.stringify(stockItem) === JSON.stringify(productStock)
        );
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
      stock: prevState.stock.filter((stockItem) => JSON.stringify(stockItem) !== JSON.stringify(productStock)),
    }));
  };

  return (
    <tr className={s.tableRow}>
      <td className={`${s.tableData} ${err.colorName ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          value={local.colorName}
          onChange={(e) => {
            if (!editing) return;
            setLocal((prevState) => ({ ...prevState, colorName: e.target.value }));
          }}
          disabled={!editing}
          ref={colorNameInputRef}
        />
      </td>
      <td className={`${s.tableData} ${err.colorHex ? s.tableDataErr : ""} `}>
        <div className={s.inputConstantWrapper}>
          <p className={s.inputConstant}>#</p>
          <input
            className={s.input}
            value={local.colorHex}
            onChange={(e) => {
              if (!editing) return;
              setLocal((prevState) => ({ ...prevState, colorHex: e.target.value }));
            }}
            disabled={!editing}
          />
        </div>
      </td>
      <td className={`${s.tableData} ${err.sizes ? s.tableDataErr : ""}`}>
        <div className={s.sizesContainer}>
          {sizes.map((size, index) => (
            <label className={s.sizesLabel} key={index}>
              {size}:
              <input
                className={s.sizesInput}
                maxLength={3}
                value={local.sizes.find((s) => s.size === size)?.quantity}
                disabled={!editing}
                onChange={(e) => {
                  if (!editing || !e.target.value.match("^[0-9]*$")) return;
                  setLocal((prevState) => {
                    const arr = prevState.sizes.map((s) => (s.size === size ? { ...s, quantity: e.target.value } : s));
                    return { ...prevState, sizes: arr };
                  });
                }}
              />
            </label>
          ))}
        </div>
      </td>
      <td className={s.tableData}>
        <div className={s.tableDataFuncWrapper}>
          {editing ? (
            <CheckmarkIcon className={s.icon} onClick={handleSubmit} />
          ) : (
            <EditIcon className={s.icon} onClick={handleEdit} />
          )}{" "}
          <TrashcanIcon className={s.icon} onClick={handleDelete} />
        </div>
      </td>
    </tr>
  );
};

export default CollectionModalStockProduct;
