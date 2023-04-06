import { NextPage } from "next";
import Head from "next/head";
import AdminLogin from "src/components/Admin/AdminLogin";

const AdminLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>PHERRA | Admin Login</title>
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <AdminLogin />
      </main>
    </>
  );
};

export default AdminLoginPage;
