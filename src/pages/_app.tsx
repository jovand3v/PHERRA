import "../styles/globals.scss";
import "../styles/variables.scss";
import type { AppProps } from "next/app";
import { Raleway } from "@next/font/google";
import CartProvider from "src/context/cart";

const raleway = Raleway({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={raleway.className}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </div>
  );
};

export default MyApp;
