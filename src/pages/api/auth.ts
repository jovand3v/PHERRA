import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.JWT_SECRET) {
    if (req.cookies.jwt_token) {
      jwt.verify(req.cookies.jwt_token, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
          res.json({ message: "success: user authenticated", authenticated: true });
        } else {
          console.log(err);
          res.json({ message: "error: jwt token found but failed to authenticate user", authenticated: false });
        }
      });
    } else {
      res.json({ message: "error: jwt token not found", authenticated: false });
    }
  } else {
    res.json({ message: "error: jwt secret not found", authenticated: false });
  }
};

export default handler;
