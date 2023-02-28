import { useState } from "react";
import s from "./DropdownMenu.module.scss";
import ArrowIcon from "@public/assets/icons/arrow-short.svg";

type Props = {
  items: { id: number; value: string | number; color?: string }[];
};

const DropdownMenu = (props: Props) => {
  const { items } = props;
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <div className={s.main} onClick={() => setActive(!active)}>
      <span className={s.selected}>
        {selectedItem.color && <div className={s.colorBox} style={{ background: selectedItem.color }}></div>}
        {selectedItem.value}
        <ArrowIcon className={s.arrowIcon} />
      </span>
      {active && (
        <ul className={s.list}>
          {items.map((item) => (
            <li
              className={`${s.item} ${selectedItem.id === item.id ? s.itemSelected : ""}`}
              key={item.id}
              onClick={() => setSelectedItem(item)}
            >
              {item.color && <div className={s.colorBox} style={{ background: item.color }}></div>}
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
