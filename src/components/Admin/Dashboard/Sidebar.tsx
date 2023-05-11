import s from "./Sidebar.module.scss";
import ArrowIcon from "@public/assets/icons/arrow-long-thin.svg";
import UserIcon from "@public/assets/icons/user.svg";
import ExitIcon from "@public/assets/icons/exit.svg";
import ArrowShortIcon from "@public/assets/icons/arrow-short.svg";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import useWindowWidth from "src/hooks/useWindowWidth";
import { useRouter } from "next/router";

type Props = {
  sidebarActive: boolean;
  collections: { id: number; title: string }[];
  setSidebarActive: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = (props: Props) => {
  const { sidebarActive, collections, setSidebarActive } = props;
  const windowWidth = useWindowWidth();
  const router = useRouter();

  const handleScrollIntoView = (type: string, id: number, title: string) => {
    const el = document.getElementById(`${type}_${title}_${id}`);
    el?.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth < 1024 || (windowWidth !== 0 && windowWidth < 1024)) {
      setSidebarActive(false);
    }
  };

  const handleLogout = () => {
    fetch("/api/logout")
      .then((res) => {
        if (res.redirected) {
          router.push("/admin/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${s.main} ${sidebarActive ? s.mainActive : ""}`}>
      <header className={s.header}>
        <h1 className={s.titleContainer}>
          <span className={s.title}>PHERRA</span>
          <span className={s.subtitle}>ADMIN DASHBOARD</span>
        </h1>
      </header>
      <Link href="/" className={s.viewLiveContainer} target="_blank">
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
              key={collection.id}
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
        <ExitIcon className={s.logoutIcon} onClick={handleLogout} />
      </div>
      <ArrowShortIcon
        className={`${s.arrowShortIcon} ${sidebarActive ? s.arrowShortIconActive : ""}`}
        onClick={() => setSidebarActive(!sidebarActive)}
      />
    </div>
  );
};

export default Sidebar;
