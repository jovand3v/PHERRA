import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "./uploadFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.body;
    const fileName = url.split("/").pop().split("?")[0];
    s3.deleteObject({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileName,
    });
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export default handler;
