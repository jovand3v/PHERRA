import "../styles/globals.scss";
import "../styles/variables.scss";
import type { AppProps } from "next/app";
import { Raleway } from "@next/font/google";
import ProductsProvider from "src/context/products";

const raleway = Raleway({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={raleway.className}>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </div>
  );
};

export default MyApp;
