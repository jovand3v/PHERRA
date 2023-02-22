import Image from "next/image";
import Link from "next/link";
import s from "./HomeCollections.module.scss";
import summerModel from "@public/assets/models/summer-model-2.png";
import winterModel from "@public/assets/models/winter-model-1.png";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";

const HomeCollections = () => {
  return (
    <section className={s.main} id="collections">
      <header className={s.header}>
        <h1 className={s.title}>COLLECTIONS:</h1>
        <p className={s.subtitle}>2023</p>
      </header>
      <div className={s.collections}>
        <Link className={s.collection} href="/collections/summer">
          <Image className={s.collectionImage} src={summerModel} alt="summer model" quality={100} />
          <div className={s.collectionHeader}>
            <ArrowIcon className={s.collectionArrowIcon} />
            <h2 className={s.collectionTitle}>SUMMER</h2>
          </div>
        </Link>
        <Link className={`${s.collection} ${s.collectionWinter}`} href="/collections/winter">
          <Image className={s.collectionImage} src={winterModel} alt="winter model" quality={100} />
          <div className={s.collectionHeader}>
            <ArrowIcon className={s.collectionArrowIcon} />
            <h2 className={s.collectionTitle}>WINTER</h2>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HomeCollections;
