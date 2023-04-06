import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { StaticImageData } from "next/image";
import Collection from "src/components/Collections/Collection";
import Footer from "src/components/common/Footer";
import { Product, products } from "src/lib/products";
import summerThumbnail from "@public/assets/thumbnails/summer-model-2.png";
import winterThumbnail from "@public/assets/thumbnails/winter-model-1.png";

type Collections = "summer" | "winter";
type StaticPaths = { params: { collection: Collections } }[];
export type StaticProps = { collection: Collections; products: Product[]; thumbnail: StaticImageData };

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: StaticPaths = [{ params: { collection: "summer" } }, { params: { collection: "winter" } }];
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const collectionProducts = products.filter((product) => product.collection === params!.collection);
  // this is temporarily, the thumnbail will be retrieved from the db later on
  let thumbnail = summerThumbnail;
  switch (params!.collection) {
    case "summer":
      thumbnail = summerThumbnail;
      break;
    case "winter":
      thumbnail = winterThumbnail;
      break;
  }
  return {
    props: { collection: params!.collection, products: collectionProducts, thumbnail },
  };
};

const CollectionPage: NextPage<StaticProps> = (props) => {
  const { collection, products, thumbnail } = props;

  const handleCapitalize = (collection: Collections) => {
    return collection.charAt(0).toUpperCase() + collection.slice(1);
  };
  const title = `PHERRA | ${handleCapitalize(collection)} Collection 2023`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Designed to keep you cool while rocking fashion during those hot summer days by utilizing summer specific fabrics and designs."
        />
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <Collection collection={collection} products={products} thumbnail={thumbnail} />
      </main>
      <Footer separator={false} />
    </>
  );
};

export default CollectionPage;
