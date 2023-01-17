import type { NextPage } from "next";
import Image from "next/image";
import s from "./HomeHero.module.scss";
import Cart from "../common/Cart";
import model from "@public/assets/models/beige-top-white-pants-cup-hold-model.png";
import LinkedInIcon from "@public/assets/icons/linked-in.svg";
import TwitterIcon from "@public/assets/icons/twitter.svg";
import InstagramIcon from "@public/assets/icons/instagram.svg";
import YoutubeIcon from "@public/assets/icons/youtube.svg";

const HomeHero: NextPage = () => {
  return (
    <section className={s.main}>
      <div className={s.textContainer}>
        <header className={s.header}>
          <div className={s.title}>PHERRA</div>
          <h1 className={s.subtitle}> A WORLD OF INNOVATION, ELEGANCE AND INSPIRATION</h1>
          <p className={s.description}>
            PHERRA is an Italian high-end luxury fashion house based in Italy established in 2015. Our products are made
            by the finest Italian raw materials, processed & distributed by us.
          </p>
        </header>
        <div className={s.navContainer}>
          <h2 className={s.navTitle}>Explore:</h2>
          <nav className={s.nav}>
            <span className={s.navLinkBig} aria-hidden="true">
              CO
            </span>
            <ul className={s.navList}>
              <li className={s.navLink} aria-label="Collections">
                llections
              </li>
              <li className={s.navLink} aria-label="Community">
                mmunity
              </li>
              <li className={s.navLink} aria-label="Contact us">
                ntact us
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Image className={s.image} src={model} alt="model smiling, wearing a beige top" priority quality={100} />
      <div className={s.cartSocialsContainer}>
        <Cart />
        <div className={s.socials}>
          <LinkedInIcon className={s.socialIcon} />
          <TwitterIcon className={s.socialIcon} />
          <InstagramIcon className={s.socialIcon} />
          <YoutubeIcon className={s.socialIcon} />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
