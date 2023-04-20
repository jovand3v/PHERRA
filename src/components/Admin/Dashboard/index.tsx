import s from "./index.module.scss";
import Collection from "./Collection";
import Inventory from "./Inventory";
import Section from "./Section";
import SidePanel from "./SidePanel";

const Dashboard = () => {
  return (
    <div className={s.main}>
      <SidePanel />
      <div className={s.content}>
        <Section title="INVENTORY" description="INVENTORY STATE" main={<Inventory />} />
        <Section title="COLLECTIONS" description="AVAILABLE COLLECTIONS" main={<Collection />} />
      </div>
      <span className={s.year}>2023</span>
    </div>
  );
};

export default Dashboard;
