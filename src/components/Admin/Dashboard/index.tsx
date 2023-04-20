import s from "./index.module.scss";
import AdminDashboardCollection from "./Collection";
import AdminDashboardInventory from "./Inventory";
import AdminDashboardSection from "./Section";
import AdminDashboardSidePanel from "./SidePanel";

const Dashboard = () => {
  return (
    <div className={s.main}>
      <AdminDashboardSidePanel />
      <div className={s.content}>
        <AdminDashboardSection title="INVENTORY" description="INVENTORY STATE" main={<AdminDashboardInventory />} />
        <AdminDashboardSection
          title="COLLECTIONS"
          description="AVAILABLE COLLECTIONS"
          main={<AdminDashboardCollection />}
        />
      </div>
      <span className={s.year}>2023</span>
    </div>
  );
};

export default Dashboard;
