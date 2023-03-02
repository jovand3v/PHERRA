import { useEffect, useRef, useState } from "react";
import s from "./DropdownMenu.module.scss";
import ArrowIcon from "@public/assets/icons/arrow-short.svg";

type ColorObject = {
  name: string;
  value: string;
};

type Props = {
  items: [string, ...string[]] | [number, ...number[]] | [ColorObject, ...ColorObject[]];
};

const DropdownMenu = (props: Props) => {
  const { items } = props;
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const mainRef = useRef<HTMLDivElement>(null);
  const isSelectedItemColor = typeof selectedItem === "object";

  useEffect(() => {
    if (!active) return;
    const handleBlur = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !mainRef.current?.contains(e.target)) {
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
        <ArrowIcon className={s.arrowIcon} />
      </span>
      {active && (
        <ul className={s.list}>
          {items.map((item, i) => {
            const isItemColor = typeof item === "object";
            return (
              <li
                className={`${s.item} ${JSON.stringify(selectedItem) === JSON.stringify(item) ? s.itemSelected : ""}`}
                key={i}
                onClick={() => setSelectedItem(item)}
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
