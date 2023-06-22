import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "./uploadFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.body;
    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
    });
    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export default handler;
