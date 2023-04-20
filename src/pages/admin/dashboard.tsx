import { NextPage } from "next";
import Head from "next/head";
import AdminDashboard from "src/components/Admin/Dashboard";

const AdminDashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>PHERRA | Admin Dashboard</title>
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <AdminDashboard />
      </main>
    </>
  );
};

export default AdminDashboardPage;
