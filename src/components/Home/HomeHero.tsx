import { useRef } from "react";
import Image from "next/image";
import s from "./HomeHero.module.scss";
import Cart from "../common/Cart";
import model from "@public/assets/models/summer-model-1.png";
import LinkedInIcon from "@public/assets/icons/linked-in.svg";
import TwitterIcon from "@public/assets/icons/twitter.svg";
import InstagramIcon from "@public/assets/icons/instagram.svg";
import YoutubeIcon from "@public/assets/icons/youtube.svg";
import useMinHeight from "src/hooks/useMinHeight";

const HomeHero = () => {
  const mainNodesRef = useRef<Array<HTMLElement>>([]);
  const mainPaddingNodeRef = useRef<HTMLDivElement>(null);
  const minHeight = useMinHeight(mainNodesRef, mainPaddingNodeRef);

  const handleMainNodes = (el: HTMLElement | null): void => {
    if (!el || mainNodesRef.current.includes(el)) return;
    mainNodesRef.current.push(el);
  };

  return (
    <section className={s.main} style={{ minHeight: `${minHeight}px` }}>
      <div className={s.textContainer} ref={mainPaddingNodeRef}>
        <header className={s.header}>
          <div className={s.title} ref={(el) => handleMainNodes(el)}>
            PHERRA
          </div>
          <h1 className={s.subtitle} ref={(el) => handleMainNodes(el)}>
            A WORLD OF INNOVATION, ELEGANCE AND INSPIRATION
          </h1>
          <p className={s.description} ref={(el) => handleMainNodes(el)}>
            PHERRA is an Italian high-end luxury fashion house based in Italy established in 2015. Our products are made
            by the finest Italian raw materials, processed & distributed by us.
          </p>
        </header>
        {/* cart and socials container for mobile only */}
        <div className={s.cartSocialsContainerMobile} ref={(el) => handleMainNodes(el)}>
          <Cart />
          <div className={s.socials}>
            <LinkedInIcon className={s.socialIcon} />
            <TwitterIcon className={s.socialIcon} />
            <InstagramIcon className={s.socialIcon} />
            <YoutubeIcon className={s.socialIcon} />
          </div>
        </div>
        <div className={s.navContainer} ref={(el) => handleMainNodes(el)}>
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
          {/* nav container for mobile only */}
          <nav className={s.navMobile}>
            <ul className={s.navList}>
              <li className={s.navLink}>Collections</li>
              <li className={s.navLink}>Community</li>
              <li className={s.navLink}>Contact us</li>
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
