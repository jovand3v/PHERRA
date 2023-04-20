import GlobeIcon from "@public/assets/icons/globe.svg";
import s from "./Ad.module.scss";

const Ad = () => {
  const listCount = 2;
  const itemPerListCount = 7;

  return (
    <div className={s.main}>
      <div className={s.marquee}>
        {Array.from(Array(listCount).keys()).map((id) => (
          <ul key={id} className={s.list}>
            {Array.from(Array(itemPerListCount).keys()).map((id) => (
              <li className={s.item} key={id}>
                <p className={s.title}>SHIPPING WORLDWIDE</p>
                <GlobeIcon className={s.icon} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Ad;
