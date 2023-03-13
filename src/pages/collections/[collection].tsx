import type { NextPage } from "next";
import Head from "next/head";
import Collection from "src/components/Collections/Collection";
import Footer from "src/components/common/Footer";

const CollectionPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PHERRA | Summer Collection 2023</title>
        <meta
          name="description"
          content="Designed to keep you cool while rocking fashion during those hot summer days by utilizing summer specific fabrics and designs."
        />
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <Collection />
      </main>
      <Footer separator={false} />
    </div>
  );
};

export default CollectionPage;
