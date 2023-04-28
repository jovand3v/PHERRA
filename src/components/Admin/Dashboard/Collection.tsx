import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DropdownMenu from "src/components/common/DropdownMenu";
import s from "./Collection.module.scss";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";
import EditIcon from "@public/assets/icons/edit.svg";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import CollectionModal from "./CollectionModal";
import { AdminDashboardCollectionStockItem } from "./CollectionModalStockProductAdd";

type DropdownType = [string, ...string[]];
export type AdminDashboardCollection = {
  id: number;
  title: "SUMMER" | "WINTER";
  products: AdminDashboardCollectionProduct[];
};
export type AdminDashboardCollectionProduct = {
  id: number;
  name: string;
  price: string;
  discount: string;
  stock: AdminDashboardCollectionStockItem[];
  img: { name: string; src: string };
  modifiedDate: string;
};
export type AdminDashboardCollectionModal = {
  open: boolean;
  customDefaultInputs?: AdminDashboardCollectionProduct;
};

type Props = {
  id: AdminDashboardCollection["id"];
  title: AdminDashboardCollection["title"];
  products: AdminDashboardCollection["products"];
  setCollections: Dispatch<SetStateAction<AdminDashboardCollection[]>>;
};

const Collection = (props: Props) => {
  const { id, title, products, setCollections } = props;
  const sortOptions: DropdownType = ["ID ASCENDING", "ID DESCENDING"];
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<AdminDashboardCollectionModal>({
    open: false,
  });
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // get height of first 11 table rows and set as max height
  useEffect(() => {
    if (tableWrapperRef.current && tableRef.current && tableRef.current.rows.length > 10) {
      let maxHeight = 1;
      for (let i = 0; i < 11; i++) {
        maxHeight += tableRef.current.rows[i].getBoundingClientRect().height;
      }
      tableWrapperRef.current.style.maxHeight = `${maxHeight}px`;
    }
  }, [products]);

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflowY = modal.open ? "hidden" : "visible";
  }, [modal]);

  const handleProductsFilters = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortBy === "ID ASCENDING") {
        return a.id - b.id;
      } else if (sortBy === "ID DESCENDING") {
        return b.id - a.id;
      }
      return a.id - b.id;
    });
    const handleMatch = (value: string | number): boolean => {
      const pattern = new RegExp(search.toLowerCase().replace(/[$]/g, "\\$"));
      return Boolean(JSON.stringify(value).toLowerCase().match(pattern));
    };
    const searchedProducts = sortedProducts.filter((product) => {
      return (
        handleMatch(product.id) ||
        handleMatch(product.name) ||
        handleMatch(`$${product.price}`) ||
        handleMatch(`${product.discount}%`) ||
        handleMatch(product.img.name) ||
        handleMatch(product.modifiedDate) ||
        Object.values(product.stock)
          .map(
            (productStockValue) =>
              handleMatch(productStockValue.colorName) || handleMatch(`#${productStockValue.colorHex}`)
          )
          .some((productStockValue) => productStockValue)
      );
    });
    return searchedProducts;
  };

  const handleDelete = (id: number) => {
    setCollections((collections) =>
      collections.map((collection) => {
        if (collection.title === title) {
          const filteredArr = collection.products.filter((collectionProduct) => collectionProduct.id !== id);
          return { ...collection, products: [...filteredArr] };
        }
        return collection;
      })
    );
  };

  return (
    <div className={s.main} id={`collection_${title}_${id}`}>
      <h4 className={s.title}>
        {id}. {title}
      </h4>
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
          SORT BY:&nbsp; <DropdownMenu items={sortOptions} onSelect={(val) => setSortBy(val)} />
        </div>
      </div>
      <div className={s.tableWrapper} ref={tableWrapperRef}>
        <table className={s.table} ref={tableRef}>
          <thead className={s.tableHead}>
            <tr className={s.tableRow}>
              <th className={s.tableHeader}>ID</th>
              <th className={s.tableHeader}>NAME</th>
              <th className={s.tableHeader}>PRICE</th>
              <th className={s.tableHeader}>DISCOUNT</th>
              <th className={s.tableHeader}>STOCK</th>
              <th className={s.tableHeader}>IMAGE</th>
              <th className={s.tableHeader}>MODIFIED</th>
              <th className={s.tableHeader}>FUNC</th>
            </tr>
          </thead>
          <tbody className={s.tableBody}>
            {handleProductsFilters().map((product) => (
              <tr className={s.tableRow} key={product.id}>
                <td className={s.tableData}>{product.id}</td>
                <td className={s.tableData}>{product.name}</td>
                <td className={s.tableData}>${product.price}</td>
                <td className={s.tableData}>{product.discount}%</td>
                <td className={s.tableData}>
                  <ul className={s.colorList}>
                    {product.stock.map((item) => (
                      <li className={s.colorItem} key={item.id}>
                        <div className={s.colorBox} style={{ background: `#${item.colorHex}` }}></div>
                        {item.colorName}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className={s.tableData}>{product.img.name}</td>
                <td className={s.tableData}>{product.modifiedDate}</td>
                <td className={s.tableData}>
                  <div className={s.tableDataIconsWrapper}>
                    <EditIcon
                      className={s.tableDataIcon}
                      onClick={() => setModal({ open: true, customDefaultInputs: product })}
                    />
                    <TrashcanIcon className={s.tableDataIcon} onClick={() => handleDelete(product.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={s.button} onClick={() => setModal({ open: true })}>
        ADD PRODUCT
      </button>
      {modal.open && (
        <CollectionModal modal={modal} setModal={setModal} collectionId={id} setCollections={setCollections} />
      )}
    </div>
  );
};

export default Collection;
