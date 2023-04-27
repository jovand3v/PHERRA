import s from "./index.module.scss";
import Collection from "./Collection";
import Inventory from "./Inventory";
import Section from "./Section";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Dashboard = () => {
  const collections = [
    { id: 1, title: "SUMMER" },
    { id: 2, title: "WINTER" },
  ];
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
                <Collection title={collection.title} id={collection.id} key={collection.id} />
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
