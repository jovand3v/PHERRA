import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "src/db/init_db";
import prisma from "src/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;

  switch (action) {
    case "add_product": {
      const date = new Date().toLocaleDateString("en-GB");
      const data: Product = {
        ...req.body.product,
        collection_id: req.body.collectionId,
        modified: date,
      };
      await prisma.products.create({
        data,
      });
      res.status(201).end();
      break;
    }
    case "delete_product": {
      await prisma.products.delete({ where: { id: req.body.id } });
      res.end();
      break;
    }
    case "update_product": {
      const date = new Date().toLocaleDateString("en-GB");
      const data: Product = {
        ...req.body.product,
        modified: date,
      };
      await prisma.products.update({
        where: { id: req.body.product.id },
        data,
      });
      res.end();
      break;
    }
    default:
      throw new Error("Invalid Action");
  }
};

export default handler;
