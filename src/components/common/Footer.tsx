import s from "./Footer.module.scss";
import LinkedInIcon from "@public/assets/icons/linked-in.svg";
import TwitterIcon from "@public/assets/icons/twitter.svg";
import InstagramIcon from "@public/assets/icons/instagram.svg";
import YoutubeIcon from "@public/assets/icons/youtube.svg";
import ArrowIcon from "@public/assets/icons/arrow-extra-long-thin.svg";

type Props = {
  separator: boolean;
};

const Footer = (props: Props) => {
  const { separator } = props;
  return (
    <footer className={`${s.main} ${separator ? s.separator : ""}`}>
      <div className={s.mainContentContainer}>
        <div className={s.connect}>
          <div className={s.header}>
            <h2 className={s.title}>PHERRA</h2>
            <p className={s.description}>Italian high-end luxury fashion house.</p>
          </div>
          <div className={s.newsletter}>
            <p className={s.newsletterTitle}>SUBSCRIBE TO OUR NEWSLETTER</p>
            <div className={s.newsletterContainer}>
              <input className={s.input} placeholder="Your e-mail" />
              <button className={s.button}>SUBSCRIBE</button>
            </div>
          </div>
          <div className={s.info}>
            <div className={s.infoContainer}>
              <p className={s.infoText}>
                Via Nuova Savoia 51 Street, <br />
                Treviso 04010, Italy
              </p>
              <p className={s.infoText}>
                pherrafashion@pharra.ph <br /> +39 303 5554850 931
              </p>
            </div>
            <div className={s.socials}>
              <LinkedInIcon className={s.social} />
              <TwitterIcon className={s.social} />
              <InstagramIcon className={s.social} />
              <YoutubeIcon className={s.social} />
            </div>
          </div>
        </div>
        <div className={s.services}>
          <div className={s.service}>
            <h4 className={s.serviceTitle}>HELP</h4>
            <ul className={s.serviceList}>
              <li className={s.serviceItem}>Contact us</li>
              <li className={s.serviceItem}>Shipping & Delivery</li>
              <li className={s.serviceItem}>Payment Options</li>
              <li className={s.serviceItem}>FAQs</li>
            </ul>
          </div>
          <div className={s.service}>
            <h4 className={s.serviceTitle}>
              EXCLUSIVE <br /> SERVICES
            </h4>
            <ul className={s.serviceList}>
              <li className={s.serviceItem}>Book an Appointment</li>
              <li className={s.serviceItem}>Collect In-Store</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.elevatorContainer}>
        <ArrowIcon className={s.elevator} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      </div>
      <p className={s.note}>NO REAL DATA WAS PROVIDED WHEN BUILDING THIS WEBSITE. PHERRA DOESN'T EXIST.</p>
    </footer>
  );
};

export default Footer;
