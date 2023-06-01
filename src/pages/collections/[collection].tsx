import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Collection from "src/components/Collection";
import Footer from "src/components/common/Footer";
import prisma from "src/lib/prisma";
import { Product } from "src/db/init_db";

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await prisma.collections.findMany();
  const paths = collections.map((c) => ({ params: { collection: c.name } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const path = params!.collection as string;

  // get collection info
  const collection = await prisma.collections.findUniqueOrThrow({
    where: {
      name: path.toLowerCase(),
    },
  });
  // get collection products
  const products = await prisma.products.findMany({
    where: {
      collection_id: collection.id,
    },
  });
  // parse db products values to match with Product type
  const parsedProducts: Product[] = products.map((product) => ({
    ...product,
    stock: JSON.parse(product.stock as string),
  }));

  return {
    props: { collection: collection.name, products: parsedProducts, thumbnail: collection.thumbnail },
  };
};

export type StaticProps = {
  collection: string;
  products: Product[];
  thumbnail: string;
};

const CollectionPage: NextPage<StaticProps> = (props) => {
  const { collection, products, thumbnail } = props;

  const handleCapitalize = (collection: string) => {
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
