import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  authenticated: boolean;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const authResponse = await fetch("http://localhost:3000/api/auth", {
    headers: { Cookie: req.headers.cookie ?? "" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: { authenticated: authResponse.authenticated },
  };
}

const AdminPage: NextPage<Props> = (props) => {
  const { authenticated } = props;
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [authenticated]);

  return <></>;
};
export default AdminPage;