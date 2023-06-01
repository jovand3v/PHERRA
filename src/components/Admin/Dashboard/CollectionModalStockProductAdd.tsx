import s from "./CollectionModalStock.module.scss";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import CheckmarkIcon from "@public/assets/icons/checkmark.svg";
import { useState, SetStateAction, Dispatch } from "react";
import { CollectionModalProductInputs, CollectionModalProductStock } from "./CollectionModal";
import { ProductSizes } from "src/db/init_db";

type Props = {
  product: CollectionModalProductInputs;
  sizes: ProductSizes;
  setProduct: Dispatch<SetStateAction<CollectionModalProductInputs>>;
};

const CollectionModalStockProductAdd = (props: Props) => {
  const { product, sizes, setProduct } = props;
  const errDefault = { colorName: false, colorHex: false, sizes: false };
  const productStockDefault: CollectionModalProductStock = {
    colorName: "",
    colorHex: "",
    sizes: [
      { size: "XS", quantity: "" },
      { size: "S", quantity: "" },
      { size: "M", quantity: "" },
      { size: "L", quantity: "" },
      { size: "XL", quantity: "" },
    ],
  };
  const [err, setErr] = useState(errDefault);
  const [productStock, setProductStock] = useState<CollectionModalProductStock>(productStockDefault);

  const handleSubmit = () => {
    const errors = {
      colorName: !productStock.colorName || product.stock.some((s) => s.colorName === productStock.colorName),
      colorHex: !productStock.colorHex || product.stock.some((s) => s.colorHex === productStock.colorHex),
      sizes: productStock.sizes.some((size) => size.quantity === ""),
    };
    setErr(errors);
    if (Object.values(errors).every((e) => !e)) {
      setProduct((prevState) => ({ ...prevState, stock: [...prevState.stock, { ...productStock }] }));
      handleClear();
    }
  };

  const handleClear = () => {
    setProductStock(productStockDefault);
    setErr(errDefault);
  };

  return (
    <tr className={`${s.tableRow} ${s.tableRowAdd}`}>
      <td className={`${s.tableData} ${err.colorName ? s.tableDataErr : ""} `}>
        <input
          className={s.input}
          placeholder="White"
          value={productStock.colorName}
          onChange={(e) => setProductStock((prevState) => ({ ...prevState, colorName: e.target.value }))}
        />
      </td>
      <td className={`${s.tableData} ${err.colorHex ? s.tableDataErr : ""} `}>
        <div className={s.inputConstantWrapper}>
          <p className={s.inputConstant}>#</p>
          <input
            className={s.input}
            placeholder="FFFFFF"
            value={productStock.colorHex}
            onChange={(e) => setProductStock((prevState) => ({ ...prevState, colorHex: e.target.value }))}
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
                value={productStock.sizes.find((s) => s.size === size)?.quantity}
                onChange={(e) => {
                  if (e.target.value.match("^(?!0)[0-9]*$")) {
                    setProductStock((prevState) => {
                      const arr = prevState.sizes.map((s) =>
                        s.size === size ? { ...s, quantity: e.target.value } : s
                      );
                      return { ...prevState, sizes: arr };
                    });
                  }
                }}
              />
            </label>
          ))}
        </div>
      </td>
      <td className={s.tableData}>
        <div className={s.tableDataFuncWrapper}>
          <CheckmarkIcon className={s.icon} onClick={handleSubmit} />{" "}
          <TrashcanIcon className={s.icon} onClick={handleClear} />
        </div>
      </td>
    </tr>
  );
};

export default CollectionModalStockProductAdd;
