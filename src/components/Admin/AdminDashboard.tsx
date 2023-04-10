import s from "./AdminDashboard.module.scss";
import AdminDashboardCollection from "./AdminDashboardCollection";
import AdminDashboardInventory from "./AdminDashboardInventory";
import AdminDashboardSection from "./AdminDashboardSection";
import AdminDashboardSidePanel from "./AdminDashboardSidePanel";

const AdminDashboard = () => {
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

export default AdminDashboard;
