import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  deleteCookie("jwt_token", {
    req,
    res,
  });
  res.redirect("/admin/login");
};

export default handler;
