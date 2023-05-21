import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import AdminDashboard from "src/components/Admin/Dashboard";
import { useRouter } from "next/router";

type Props = {
  authenticated: boolean;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const authResponse = await fetch("http://localhost:3000/api/auth", {
    headers: { Cookie: req.headers.cookie ?? "" },
  })
    .then((res) => res.ok && res.json())
    .catch((err) => console.log(err));

  return {
    props: { authenticated: authResponse?.authenticated ?? false },
  };
}

const AdminDashboardPage: NextPage<Props> = (props) => {
  const { authenticated } = props;
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
        <AdminDashboard />
      </main>
    </>
  ) : (
    <></>
  );
};

export default AdminDashboardPage;
