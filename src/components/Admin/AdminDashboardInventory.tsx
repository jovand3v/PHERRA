import s from "./AdminDashboardInventory.module.scss";

const AdminDashboardInventory = () => {
  return (
    <ul className={s.main}>
      <li className={s.category}>
        <p className={s.title}>CATEGORIES</p>
        <p className={s.amount}>3</p>
      </li>
      <li className={s.category}>
        <p className={s.title}>TOTAL PRODUCTS</p>
        <p className={s.amount}>35</p>
      </li>
      <li className={s.category}>
        <p className={s.title}>OUT OF STOCK</p>
        <p className={s.amount}>6</p>
      </li>
    </ul>
  );
};

export default AdminDashboardInventory;
