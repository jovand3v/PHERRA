import s from "./Collection.module.scss";
import CollectionProduct from "./CollectionProduct";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import summerThumbnail from "@public/assets/thumbnails/summer-model-2.png";
import winterThumbnail from "@public/assets/thumbnails/winter-model-1.png";
import Image from "next/image";
import Searchbar from "../common/Searchbar";
import DropdownMenu from "../common/DropdownMenu";
import Cart from "../common/Cart";

const Collection = () => {
  return (
    <div className={s.main}>
      <div className={s.thumbnail}>
        <ArrowIcon className={s.arrowIcon} />
        <Image className={s.thumbnail} src={summerThumbnail} alt="model" quality={100} />
      </div>
      <div className={s.productShowcase}></div>
      <div className={s.mainContainer}>
        <header className={s.header}>
          <h1 className={s.title}>
            SUMMER <span className={s.titleSmall}>COLLECTION</span>
          </h1>
          <p className={s.subtitle}>2023</p>
        </header>
        <div className={s.productsContainer}>
          <div className={s.filters}>
            <Searchbar />
            <div className={s.dropdown}>
              SORT BY:
              <DropdownMenu items={["POPULARITY", "PRICE ASCENDING", "PRICE DESCENDING"]} onSelect={() => {}} />
            </div>
          </div>
          <ul className={s.products}>
            <CollectionProduct />
          </ul>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default Collection;
