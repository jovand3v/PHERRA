import { useEffect, useRef, useState } from "react";
import DropdownMenu from "src/components/common/DropdownMenu";
import s from "./Collection.module.scss";
import MagnifyingGlassIcon from "@public/assets/icons/magnifying-glass.svg";
import EditIcon from "@public/assets/icons/edit.svg";
import TrashcanIcon from "@public/assets/icons/trashcan.svg";
import { Collections } from "@prisma/client";
import { Product } from "src/db/init_db";
import CollectionModal, { CollectionModal as CollectionModalType } from "./CollectionModal";
import { useRouter } from "next/router";

type DropdownType = [string, ...string[]];
type Props = {
  collection: Collections;
  products: Product[];
  sidebarActive: boolean;
};

const Collection = (props: Props) => {
  const { collection, products, sidebarActive } = props;
  const sortOptions: DropdownType = ["ID ASCENDING", "ID DESCENDING"];
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<CollectionModalType>({
    open: false,
  });
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const router = useRouter();

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
        handleMatch(product.img) ||
        handleMatch(product.modified) ||
        Object.values(product.stock)
          .map((s) => handleMatch(s.colorName) || handleMatch(`${s.colorHex}`))
          .some((s) => s)
      );
    });
    return searchedProducts;
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/db/delete_product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.replace(router.asPath);
  };

  return (
    <div className={s.main} id={`collection_${collection.name}_${collection.id}`}>
      <h4 className={s.title}>
        {collection.id}. {collection.name}
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
      <div className={`${s.tableWrapper} ${!sidebarActive ? s.tableWrapperActive : ""}`} ref={tableWrapperRef}>
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
                    {product.stock.map((stock, index) => (
                      <li className={s.colorItem} key={index}>
                        <div className={s.colorBox} style={{ background: `#${stock.colorHex}` }}></div>
                        {stock.colorName}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className={s.tableData}>{product.img}</td>
                <td className={s.tableData}>{product.modified}</td>
                <td className={s.tableData}>
                  <div className={s.tableDataIconsWrapper}>
                    <EditIcon
                      className={s.tableDataIcon}
                      onClick={() =>
                        setModal({
                          open: true,
                          product,
                        })
                      }
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
      {modal.open && <CollectionModal modal={modal} setModal={setModal} collectionId={collection.id} />}
    </div>
  );
};

export default Collection;
