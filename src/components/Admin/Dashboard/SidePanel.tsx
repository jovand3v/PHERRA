import s from "./SidePanel.module.scss";
import ArrowIcon from "@public/assets/icons/arrow-long-thin.svg";
import UserIcon from "@public/assets/icons/user.svg";
import ExitIcon from "@public/assets/icons/exit.svg";
import Link from "next/link";

const SidePanel = () => {
  return (
    <div className={s.main}>
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
          <li className={s.sectionListItem}>1. SUMMER</li>
          <li className={s.sectionListItem}>2. WINTER</li>
        </ul>
      </div>
      <div className={s.footer}>
        <div className={s.user}>
          <UserIcon className={s.userIcon} />
          <p className={s.userName}>Dremiq</p>
        </div>
        <ExitIcon className={s.logoutIcon} />
      </div>
      <div className={s.grip}>
        <div className={s.gripLine}></div>
        <div className={s.gripLine}></div>
        <div className={s.gripLine}></div>
      </div>
    </div>
  );
};

export default SidePanel;
