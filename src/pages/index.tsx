import type { NextPage } from "next";
import Head from "next/head";
import HomeHero from "../components/Home/HomeHero";
import HomeAd from "src/components/Home/HomeAd";
import HomeCollections from "src/components/Home/HomeCollections";
import HomeCommunity from "src/components/Home/HomeCommunity";
import Footer from "src/components/common/Footer";

const Home: NextPage = () => {
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
      <HomeHero />
      <HomeAd />
      <HomeCollections />
      <HomeCommunity />
      <Footer />
    </>
  );
};

export default Home;
