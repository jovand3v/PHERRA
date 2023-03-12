import s from "./Searchbar.module.scss";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";

const Searchbar = () => {
  return (
    <div className={s.main}>
      <input className={s.input} placeholder="SEARCH FOR A PRODUCT..." />
      <MagnifyingGlassIcon className={s.searchIcon} />
    </div>
  );
};

export default Searchbar;
