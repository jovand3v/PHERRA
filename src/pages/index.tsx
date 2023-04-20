import type { NextPage } from "next";
import Home from "src/components/Home";
import Head from "next/head";
import Footer from "src/components/common/Footer";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>PHERRA | Italian high-end luxury fashion clothing & accessories</title>
        <meta
          name="description"
          content="Discover luxury clothing & accessories by exploring PHERRA's Summer and Winter 2023 Collections. Shop in-store or online. Worldwide shipping available."
        />
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <Home />
      </main>
      <Footer separator={true} />
    </>
  );
};

export default HomePage;
