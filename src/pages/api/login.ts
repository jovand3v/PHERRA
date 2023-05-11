import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // temp static admin until admins db table is created
  const admin = { id: 1, name: "admin", password: "admin" };
  if (req.body.name === admin.name && req.body.password === admin.password) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(404).json({ message: "error: jwt secret not found" });
    } else {
      const jwtToken = jwt.sign({ sub: admin.id, name: admin.name, admin: true }, secret, { expiresIn: "1d" });
      setCookie("jwt_token", jwtToken, {
        req,
        res,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });
      res.redirect(302, "/admin/dashboard");
    }
  }
};

export default handler;
