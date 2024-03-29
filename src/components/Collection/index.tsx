import { useEffect, useState } from "react";
import s from "./index.module.scss";
import Product from "./Product";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import Image from "next/image";
import DropdownMenu from "../common/DropdownMenu";
import Cart from "../common/Cart";
import Link from "next/link";
import ProductInfo from "./ProductInfo";
import { handleDiscountedPrice } from "src/lib/handleDiscountedPrice";
import { StaticProps } from "src/pages/collections/[collection]";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";
import { Product as ProductType } from "src/db/init_db";

type SortOptions = "POPULARITY" | "PRICE ASCENDING" | "PRICE DESCENDING";

const Collection = (props: StaticProps) => {
  const { collection, products, thumbnail } = props;
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(products[0]);
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
        <Product
          product={sp}
          key={sp.id}
          setSelectedProduct={(p: ProductType) => setSelectedProduct(p)}
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
          [...pl].sort(
            (a, b) => handleDiscountedPrice(a.price, a.discount) - handleDiscountedPrice(b.price, b.discount)
          )
        );
      case "PRICE DESCENDING":
        return setProductsLocal((pl) =>
          [...pl].sort(
            (a, b) => handleDiscountedPrice(b.price, b.discount) - handleDiscountedPrice(a.price, a.discount)
          )
        );
    }
  };

  return (
    <div className={s.main}>
      <div className={s.productInfoMobileContainer}>
        {showChild && selectedProduct && (
          <ProductInfo
            selectedProduct={selectedProduct}
            showcaseActive={showcaseActive}
            setShowcaseActive={(s) => setShowcaseActive(s)}
          />
        )}
      </div>
      <div className={s.thumbnailContainer}>
        <div className={s.thumbnailContainerSticky}>
          <Link href="/">
            <ArrowIcon className={s.arrowIcon} />
          </Link>
          <div className={s.productInfoDesktopContainer}>
            {showChild && selectedProduct && (
              <ProductInfo
                selectedProduct={selectedProduct}
                showcaseActive={showcaseActive}
                setShowcaseActive={(s) => setShowcaseActive(s)}
              />
            )}
          </div>
          <Image className={s.thumbnailImage} src={thumbnail} width={650} height={1000} alt="model" priority={true} />
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
            <div className={s.searchbar}>
              <input
                className={s.searchbarInput}
                placeholder="SEARCH FOR A PRODUCT..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon className={s.searchbarIcon} />
            </div>
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
