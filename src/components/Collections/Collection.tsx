import { useEffect, useState } from "react";
import s from "./Collection.module.scss";
import CollectionProduct from "./CollectionProduct";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import Image from "next/image";
import Searchbar from "../common/Searchbar";
import DropdownMenu from "../common/DropdownMenu";
import Cart from "../common/Cart";
import Link from "next/link";
import CollectionProductInfo from "./CollectionProductInfo";
import { Product, discountedPrice } from "src/lib/products";
import { StaticProps } from "src/pages/collections/[collection]";

type SortOptions = "POPULARITY" | "PRICE ASCENDING" | "PRICE DESCENDING";

const Collection = (props: StaticProps) => {
  const { collection, products, thumbnail } = props;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);
  const [showcaseActive, setShowcaseActive] = useState(false);
  const [showChild, setShowChild] = useState(false);
  const [search, setSearch] = useState("");
  const sortingOptions: [SortOptions, ...SortOptions[]] = ["POPULARITY", "PRICE ASCENDING", "PRICE DESCENDING"];
  const [productsLocal, setProductsLocal] = useState([...products]);

  // wait until client-side hydration to load child because it uses useLayoutEffect
  useEffect(() => {
    setShowChild(true);
  }, []);

  const handleSearch = () => {
    const searchedProducts = productsLocal.filter((product) => product.name.toLowerCase().match(search.toLowerCase()));
    if (searchedProducts.length !== 0) {
      return searchedProducts.map((sp) => (
        <CollectionProduct
          product={sp}
          key={sp.id}
          setSelectedProduct={(p: Product) => setSelectedProduct(p)}
          setShowcaseActive={(s) => setShowcaseActive(s)}
        />
      ));
    } else {
      return <li className={s.productsEmptyMessage}>NO PRODUCTS FOUND</li>;
    }
  };

  const handleSelect = (selected: SortOptions) => {
    switch (selected) {
      case "POPULARITY":
        return setProductsLocal([...products]);
      case "PRICE ASCENDING":
        return setProductsLocal((pl) =>
          [...pl].sort((a, b) => discountedPrice(a.price, a.discount) - discountedPrice(b.price, b.discount))
        );
      case "PRICE DESCENDING":
        return setProductsLocal((pl) =>
          [...pl].sort((a, b) => discountedPrice(b.price, b.discount) - discountedPrice(a.price, a.discount))
        );
    }
  };

  return (
    <div className={s.main}>
      <div className={s.thumbnailContainer}>
        <div className={s.thumbnailContainerSticky}>
          <Link href="/">
            <ArrowIcon className={s.arrowIcon} />
          </Link>
          {showChild && selectedProduct && (
            <CollectionProductInfo
              selectedProduct={selectedProduct}
              showcaseActive={showcaseActive}
              setShowcaseActive={(s) => setShowcaseActive(s)}
            />
          )}
          <Image className={s.thumbnailImage} src={thumbnail} alt="model" />
        </div>
      </div>
      <div className={s.mainContainer}>
        <header className={s.header}>
          <h1 className={s.title}>
            {collection} <br />
            <span className={s.titleSmall}>COLLECTION</span>
          </h1>
          <p className={s.subtitle}>2023</p>
        </header>
        <div className={s.productsContainer}>
          <div className={s.filters}>
            <Searchbar setSearch={(value) => setSearch(value)} placeholder="SEARCH FOR A PRODUCT..." />
            <div className={s.dropdown}>
              SORT BY:&nbsp;
              <DropdownMenu items={sortingOptions} onSelect={(selected) => handleSelect(selected)} />
            </div>
          </div>
          <ul className={s.products}>{handleSearch()}</ul>
        </div>
      </div>
      <div className={s.cartWrapper}>
        <Cart />
      </div>
    </div>
  );
};

export default Collection;
