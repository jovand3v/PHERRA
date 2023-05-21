import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminLogin from "src/components/Admin/Login";

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

const AdminLoginPage: NextPage<Props> = (props) => {
  const { authenticated } = props;
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.replace("/admin/dashboard");
    }
  }, [authenticated]);

  return !authenticated ? (
    <>
      <Head>
        <title>PHERRA | Admin Login</title>
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </Head>
      <main>
        <AdminLogin />
      </main>
    </>
  ) : (
    <></>
  );
};

export default AdminLoginPage;
