import s from "./index.module.scss";
import Collection, { AdminDashboardCollection } from "./Collection";
import Inventory from "./Inventory";
import Section from "./Section";
import Sidebar from "./Sidebar";
import { useState } from "react";

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

  return (
    <div className={s.main}>
      <Sidebar sidebarActive={sidebarActive} collections={collections} />
      <div className={`${s.content} ${sidebarActive ? s.contentActive : ""}`}>
        <Section title="INVENTORY" description="INVENTORY STATE" main={<Inventory />} />
        <button className={s.sidebarVisibilityButton} onClick={() => setSidebarActive(!sidebarActive)}>
          {sidebarActive ? "HIDE SIDEBAR" : "SHOW SIDEBAR"}
        </button>
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
