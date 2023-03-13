import { useContext } from "react";
import s from "./Collection.module.scss";
import CollectionProduct from "./CollectionProduct";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import summerThumbnail from "@public/assets/thumbnails/summer-model-2.png";
import winterThumbnail from "@public/assets/thumbnails/winter-model-1.png";
import Image from "next/image";
import Searchbar from "../common/Searchbar";
import DropdownMenu from "../common/DropdownMenu";
import Cart from "../common/Cart";
import Link from "next/link";
import { ProductsContext } from "src/context/products";

const Collection = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className={s.main}>
      <div className={s.thumbnailContainer}>
        <div className={s.thumbnailContainerSticky}>
          <Link href="/">
            <ArrowIcon className={s.arrowIcon} />
          </Link>
          <Image className={s.thumbnailImage} src={summerThumbnail} alt="model" />
        </div>
      </div>
      <div className={s.mainContainer}>
        <header className={s.header}>
          <h1 className={s.title}>
            SUMMER <br />
            <span className={s.titleSmall}>COLLECTION</span>
          </h1>
          <p className={s.subtitle}>2023</p>
        </header>
        <div className={s.productsContainer}>
          <div className={s.filters}>
            <Searchbar />
            <div className={s.dropdown}>
              SORT BY:&nbsp;
              <DropdownMenu items={["POPULARITY", "PRICE ASCENDING", "PRICE DESCENDING"]} onSelect={() => {}} />
            </div>
          </div>
          <ul className={s.products}>
            {products.map((product) => (
              <CollectionProduct product={product} key={product.id} />
            ))}
          </ul>
        </div>
      </div>
      <div className={s.cartWrapper}>
        <Cart />
      </div>
    </div>
  );
};

export default Collection;
