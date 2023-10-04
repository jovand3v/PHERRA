import { NextApiRequest, NextApiResponse } from "next";
import { s3 } from "./uploadFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const fileName = url.split("/").pop().split("?")[0];
  const params = {
    Bucket: process.env.BUCKET_NAME!,
    Key: fileName,
  };
  try {
    await s3.deleteObject(params).promise(); // use promise to make it async/await compatible
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while deleting the object." });
  }
};

export default handler;
