import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import AdminDashboard from "src/components/Admin/Dashboard";
import { useRouter } from "next/router";
import prisma from "src/lib/prisma";
import { Collections } from "@prisma/client";
import { Product } from "src/db/init_db";

type Props = {
  authenticated: boolean;
  collections: Collections[];
  products: Product[];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const authResponse = await fetch(`${process.env.API_URL}/api/auth`, {
    headers: { Cookie: req.headers.cookie ?? "" },
  })
    .then((res) => res.ok && res.json())
    .catch((err) => console.log(err));
  const collections = await prisma.collections.findMany();
  const products = await prisma.products.findMany();
  // parse db products values to match with Product type
  const parsedProducts: Product[] = products.map((product) => ({
    ...product,
    stock: JSON.parse(product.stock as string),
  }));

  return {
    props: { authenticated: authResponse?.authenticated ?? false, collections, products: parsedProducts },
  };
}

const AdminDashboardPage: NextPage<Props> = (props) => {
  const { authenticated, collections, products } = props;
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/admin/login");
    }
  }, [authenticated]);

  return authenticated ? (
    <>
      <Head>
        <title>PHERRA | Admin Dashboard</title>
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <AdminDashboard collections={collections} products={products} />
      </main>
    </>
  ) : (
    <></>
  );
};

export default AdminDashboardPage;
