import s from "./HomeContact.module.scss";

const HomeContact = () => {
  return (
    <div className={s.main}>
      <header className={s.header}>
        <h1 className={s.title}>CONTACT US</h1>
        <p className={s.subtitle}>GET IN TOUCH</p>
      </header>
      <div className={s.contact}>
        <form className={s.form}>
          <label className={s.label}>
            NAME
            <input className={s.input} placeholder="Your name" />
          </label>
          <label className={s.label}>
            E-MAIL
            <input className={s.input} placeholder="Your e-mail" />
          </label>
          <label className={s.label}>
            MESSAGE
            <textarea className={`${s.input} ${s.messageInput}`} placeholder="Your message" />
          </label>
          <button type="submit" className={s.button} onClick={(e) => e.preventDefault()}>
            SUBMIT
          </button>
        </form>
        <ul className={s.infoContainer}>
          <li className={s.info}>
            <h3 className={s.infoTitle}>LOCATION</h3>
            <p className={s.infoDescription}>
              Via Nuova Savoia 51 Street, <br />
              Treviso 04010, <br />
              <span className={s.infoCountry}>Italy</span>
            </p>
          </li>
          <li className={s.info}>
            <h3 className={s.infoTitle}>CONTACT</h3>
            <p className={s.infoDescription}>pherrafashion@pherra.ph</p>
            <p className={s.infoDescription}>+39 303 5554850 931</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeContact;
