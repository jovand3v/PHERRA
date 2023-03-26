import { useContext, useEffect, useState } from "react";
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
import CollectionProductInfo from "./CollectionProductInfo";
import { Product } from "src/lib/products";
import { products } from "src/lib/products";

const Collection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [showcaseActive, setShowcaseActive] = useState(false);
  const [showChild, setShowChild] = useState(false);

  // wait until client-side hydration to load child because it uses useLayoutEffect
  useEffect(() => {
    setShowChild(true);
  }, []);

  return (
    <div className={s.main}>
      <div className={s.thumbnailContainer}>
        <div className={s.thumbnailContainerSticky}>
          <Link href="/">
            <ArrowIcon className={s.arrowIcon} />
          </Link>
          {showChild && (
            <CollectionProductInfo
              selectedProduct={selectedProduct}
              showcaseActive={showcaseActive}
              setShowcaseActive={(s) => setShowcaseActive(s)}
            />
          )}
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
              <CollectionProduct
                product={product}
                key={product.id}
                setSelectedProduct={(p: Product) => setSelectedProduct(p)}
                setShowcaseActive={(s) => setShowcaseActive(s)}
              />
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
