import { useEffect, useRef, useState } from "react";
import s from "./DropdownMenu.module.scss";
import ArrowIcon from "@public/assets/icons/arrow-short.svg";
import { ProductColorObject } from "src/context/products";

type Props = {
  items: [string, ...string[]] | [number, ...number[]] | [ProductColorObject, ...ProductColorObject[]];
  customDefault?: string | number | ProductColorObject;
  onSelect: (value: string | number | ProductColorObject) => void;
};

const DropdownMenu = (props: Props) => {
  const { items, customDefault, onSelect } = props;
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(customDefault ?? items[0]);
  const mainRef = useRef<HTMLDivElement>(null);
  const isSelectedItemColor = typeof selectedItem === "object";

  // disables dropdown on blur
  useEffect(() => {
    if (!active) return;
    const handleBlur = (e: MouseEvent) => {
      if (e.target instanceof Element && !mainRef.current?.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleBlur);

    return () => document.removeEventListener("click", handleBlur);
  }, [active]);

  return (
    <div className={s.main} ref={mainRef} onClick={() => setActive(!active)}>
      <span className={s.selected}>
        {isSelectedItemColor && <div className={s.colorBox} style={{ background: selectedItem.value }}></div>}
        {isSelectedItemColor ? selectedItem.name : selectedItem}
        <ArrowIcon className={`${s.arrowIcon} ${active ? s.arrowIconActive : ""}`} />
      </span>
      {active && (
        <ul className={s.list}>
          {items.map((item, i) => {
            const isItemColor = typeof item === "object";
            return (
              <li
                className={`${s.item} ${JSON.stringify(selectedItem) === JSON.stringify(item) ? s.itemSelected : ""}`}
                key={i}
                onClick={() => {
                  setSelectedItem(item);
                  onSelect(item);
                }}
              >
                {isItemColor && <div className={s.colorBox} style={{ background: item.value }}></div>}
                {isItemColor ? item.name : item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
