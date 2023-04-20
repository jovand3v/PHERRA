import { ReactNode } from "react";
import s from "./Section.module.scss";

type Props = {
  title: string;
  description: string;
  main: ReactNode;
};

const Section = (props: Props) => {
  const { title, description, main } = props;

  return (
    <section className={s.main}>
      <header className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.subtitle}>{description}</p>
      </header>
      {main}
    </section>
  );
};

export default Section;
