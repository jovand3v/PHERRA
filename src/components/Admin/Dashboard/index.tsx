import s from "./index.module.scss";
import Collection, { AdminDashboardCollection } from "./Collection";
import Inventory from "./Inventory";
import Section from "./Section";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [collections, setCollections] = useState<AdminDashboardCollection[]>([
    {
      id: 1,
      title: "SUMMER",
      products: [],
    },
    { id: 2, title: "WINTER", products: [] },
  ]);
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
        <Section title="INVENTORY" description="INVENTORY STATE" main={<Inventory collections={collections} />} />
        <Section
          title="COLLECTIONS"
          description="AVAILABLE COLLECTIONS"
          main={
            <div className={s.collections}>
              {collections.map((collection) => (
                <Collection
                  title={collection.title}
                  id={collection.id}
                  products={collection.products}
                  key={collection.id}
                  sidebarActive={sidebarActive}
                  setCollections={setCollections}
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
