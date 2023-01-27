import Image from "next/image";
import contestant1 from "@public/assets/community/contestant-1.png";
import contestant2 from "@public/assets/community/contestant-2.png";
import contestant3 from "@public/assets/community/contestant-3.png";
import contestant4 from "@public/assets/community/contestant-4.png";
import ArrowIcon from "@public/assets/icons/arrow-long-fat.svg";
import s from "./HomeCommunity.module.scss";

const HomeCommunity = () => {
  return (
    <section className={s.main}>
      <header className={s.header}>
        <h1 className={s.title}>COMMUNITY</h1>
        <p className={s.subtitle}>JOIN US</p>
      </header>
      <div className={s.competeContainer}>
        <div className={s.competeTextContainer}>
          <header className={s.competeHeader}>
            <h2 className={s.competeTitle}>COMPETE FOR $25,000</h2>
          </header>
          <p className={s.competeDescription}>
            PHERRA is launching a $25,000 prize pool community competition. In order to enter all you need to do is
            submit your best photo wearing PHERRA via the button below. Competition ends 01/01/2024.
          </p>
          <a className={s.competeButton}>
            SUBMIT YOUR PHOTO <ArrowIcon className={s.competeButtonIcon} />
          </a>
        </div>
        <div className={s.competeContestantsContainer}>
          <p className={s.competeInstagram}>INSTAGRAM/PHERRAFASHION</p>
          <div className={s.competeImagesContainer}>
            <Image className={s.competeImage} src={contestant1} alt="contestant model" quality={100} />
            <Image className={s.competeImage} src={contestant2} alt="contestant model" quality={100} />
            <Image className={s.competeImage} src={contestant3} alt="contestant model" quality={100} />
            <Image className={s.competeImage} src={contestant4} alt="contestant model" quality={100} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCommunity;
