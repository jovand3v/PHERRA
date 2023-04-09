import s from "./AdminDashboard.module.scss";
import AdminDashboardCollection from "./AdminDashboardCollection";
import AdminDashboardInventory from "./AdminDashboardInventory";
import AdminDashboardSidePanel from "./AdminDashboardSidePanel";

const AdminDashboard = () => {
  return (
    <div className={s.main}>
      <AdminDashboardSidePanel />
      <div className={s.content}>
        <AdminDashboardInventory />
        <div className={s.collections}>
          <AdminDashboardCollection />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
