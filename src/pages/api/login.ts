import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.name === process.env.ADMIN_NAME && req.body.password === process.env.ADMIN_PASSWORD) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(404).json({ message: "error: jwt secret not found" });
    } else {
      const jwtToken = jwt.sign({ sub: 1, name: process.env.ADMIN_NAME, admin: true }, secret, { expiresIn: "1d" });
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
