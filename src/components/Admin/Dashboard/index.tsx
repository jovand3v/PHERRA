import s from "./index.module.scss";
import Collection from "./Collection";
import Inventory from "./Inventory";
import Section from "./Section";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Collections } from "@prisma/client";
import { Product } from "src/db/init_db";

type Props = {
  collections: Collections[];
  products: Product[];
};

const Dashboard = (props: Props) => {
  const { collections, products } = props;
  const [sidebarActive, setSidebarActive] = useState(true);

  useEffect(() => {
    if (sidebarActive && window.innerWidth <= 1024) {
      setSidebarActive(false);
    }
  }, []);

  return (
    <div className={s.main}>
      <Sidebar sidebarActive={sidebarActive} collections={collections} setSidebarActive={setSidebarActive} />
      <div className={`${s.content} ${sidebarActive ? s.contentActive : ""}`}>
        <Section
          title="INVENTORY"
          description="INVENTORY STATE"
          main={<Inventory collections={collections} products={products} />}
        />
        <Section
          title="COLLECTIONS"
          description="AVAILABLE COLLECTIONS"
          main={
            <div className={s.collections}>
              {collections.map((collection) => (
                <Collection
                  collection={collection}
                  products={(() => products.filter((p) => p.collection_id === collection.id))()}
                  key={collection.id}
                  sidebarActive={sidebarActive}
                />
              ))}
            </div>
          }
        />
      </div>
      <span className={s.year}>2023</span>
    </div>
  );
};

export default Dashboard;
