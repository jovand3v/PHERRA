import s from "./Searchbar.module.scss";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";

type Props = {
  setSearch: (v: string) => void;
  placeholder: string;
};

const Searchbar = (props: Props) => {
  const { setSearch, placeholder } = props;
  return (
    <div className={s.main} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}>
      <input className={s.input} placeholder={placeholder} />
      <MagnifyingGlassIcon className={s.searchIcon} />
    </div>
  );
};

export default Searchbar;
