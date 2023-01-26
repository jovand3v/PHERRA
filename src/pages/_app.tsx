import "../styles/globals.scss";
import "../styles/variables.scss";
import type { AppProps } from "next/app";
import { Raleway } from "@next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={raleway.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
