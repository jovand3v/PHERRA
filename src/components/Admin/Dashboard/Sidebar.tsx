import s from "./Sidebar.module.scss";
import ArrowIcon from "@public/assets/icons/arrow-long-thin.svg";
import UserIcon from "@public/assets/icons/user.svg";
import ExitIcon from "@public/assets/icons/exit.svg";
import Link from "next/link";

type Props = {
  sidebarActive: boolean;
  collections: { id: number; title: string }[];
};

const Sidebar = (props: Props) => {
  const { sidebarActive, collections } = props;

  const handleScrollIntoView = (type: string, id: number, title: string) => {
    const el = document.getElementById(`${type}_${title}_${id}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${s.main} ${sidebarActive ? s.mainActive : ""}`}>
      <header className={s.header}>
        <h1 className={s.titleContainer}>
          <span className={s.title}>PHERRA</span>
          <span className={s.subtitle}>ADMIN DASHBOARD</span>
        </h1>
      </header>
      <Link href="/" className={s.viewLiveContainer}>
        <p className={s.viewLiveText}>VIEW LIVE SITE</p>
        <ArrowIcon className={s.viewLiveIcon} />
      </Link>
      <div className={s.section}>
        <header className={s.sectionHeader}>
          <h3 className={s.sectionTitle}>COLLECTIONS</h3>
          <p className={s.sectionSubtitle}>AVAILABLE COLLECTIONS</p>
        </header>
        <ul className={s.sectionList}>
          {collections.map((collection) => (
            <li
              className={s.sectionListItem}
              onClick={() => handleScrollIntoView("collection", collection.id, collection.title)}
            >
              {collection.id}. {collection.title}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.footer}>
        <div className={s.user}>
          <UserIcon className={s.userIcon} />
          <p className={s.userName}>Dremiq</p>
        </div>
        <ExitIcon className={s.logoutIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
