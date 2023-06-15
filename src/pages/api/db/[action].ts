import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "src/db/init_db";
import prisma from "src/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;

  switch (action) {
    case "add_product": {
      try {
        const date = new Date().toLocaleDateString("en-GB");
        const data: Product = {
          ...req.body.product,
          collection_id: req.body.collectionId,
          modified: date,
        };
        await prisma.products.create({
          data,
        });
        res.json({ message: "product added successfully", error: false });
      } catch (err) {
        console.log(err);
        res.json({ message: "failed to add product", error: true });
      }
      break;
    }
    case "delete_product": {
      try {
        await prisma.products.delete({ where: { id: req.body.id } });
        res.json({ message: "product deleted successfully", error: false });
      } catch (err) {
        console.log(err);
        res.json({ message: "failed to delete product", error: true });
      }
      break;
    }
    case "update_product": {
      try {
        const date = new Date().toLocaleDateString("en-GB");
        const data: Product = {
          ...req.body.product,
          modified: date,
        };
        await prisma.products.update({
          where: { id: req.body.product.id },
          data,
        });
        res.json({ message: "product update successfully", error: false });
      } catch (err) {
        console.log(err);
        res.json({ message: "failed to update product", error: true });
      }
      break;
    }
    default:
      throw new Error("Invalid Action");
  }
};

export default handler;
