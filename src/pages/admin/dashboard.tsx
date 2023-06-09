import { NextPage } from "next";
import Head from "next/head";
import AdminDashboard from "src/components/Admin/Dashboard";
import prisma from "src/lib/prisma";
import { Collections } from "@prisma/client";
import { Product } from "src/db/init_db";

type Props = {
  collections: Collections[];
  products: Product[];
};

export async function getServerSideProps() {
  const collections = await prisma.collections.findMany();
  const products = await prisma.products.findMany();
  // parse db products values to match with Product type
  const parsedProducts: Product[] = products.map((product) => ({
    ...product,
    stock: JSON.parse(product.stock as string),
  }));

  return {
    props: { collections, products: parsedProducts },
  };
}

const AdminDashboardPage: NextPage<Props> = (props) => {
  const { collections, products } = props;

  return (
    <>
      <Head>
        <title>PHERRA | Admin Dashboard</title>
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <AdminDashboard collections={collections} products={products} />
      </main>
    </>
  );
};

export default AdminDashboardPage;
