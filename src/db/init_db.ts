import { Collections } from "@prisma/client";
import prisma from "../lib/prisma.js";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL";
export type ProductSizes = ["XS", "S", "M", "L", "XL"];
export type ProductStock = { colorName: string; colorHex: string; sizes: { size: ProductSize; quantity: number }[] };
export type Product = {
  id: number;
  collection_id: number;
  name: string;
  img: string;
  price: number;
  discount: number;
  stock: ProductStock[];
  modified: string;
};

const handleInit = async () => {
  const collections: Collections[] = [
    { id: 1, name: "summer", thumbnail: "/assets/thumbnails/summer-model-2.png", year: 2023 },
    { id: 2, name: "winter", thumbnail: "/assets/thumbnails/winter-model-1.png", year: 2023 },
  ];
  const date = new Date().toLocaleDateString("en-GB");
  const products: Omit<Product, "id">[] = [
    {
      collection_id: 1,
      name: "open shirt",
      price: 100,
      discount: 10,
      img: "/assets/collections/summer/open-shirt.png",
      stock: [
        {
          colorName: "White",
          colorHex: "fff",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
        {
          colorName: "Green",
          colorHex: "8fff73",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
      ],
      modified: date,
    },
    {
      collection_id: 1,
      name: "fless set",
      price: 100,
      discount: 10,
      img: "/assets/collections/summer/fless-set.png",
      stock: [
        {
          colorName: "White",
          colorHex: "fff",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
        {
          colorName: "Green",
          colorHex: "8fff73",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
      ],
      modified: date,
    },
    {
      collection_id: 2,
      name: "oc coat",
      price: 100,
      discount: 10,
      img: "/assets/collections/winter/oc-coat.png",
      stock: [
        {
          colorName: "White",
          colorHex: "fff",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
        {
          colorName: "Green",
          colorHex: "8fff73",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
      ],
      modified: date,
    },
    {
      collection_id: 2,
      name: "cb coat",
      price: 100,
      discount: 10,
      img: "/assets/collections/winter/cb-coat.png",
      stock: [
        {
          colorName: "White",
          colorHex: "fff",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
        {
          colorName: "Green",
          colorHex: "8fff73",
          sizes: [
            { size: "XS", quantity: 5 },
            { size: "S", quantity: 5 },
            { size: "M", quantity: 5 },
            { size: "L", quantity: 5 },
            { size: "XL", quantity: 5 },
          ],
        },
      ],
      modified: date,
    },
  ];

  await prisma.products.deleteMany();
  await prisma.collections.deleteMany();
  // create collections
  for (let i = 0; i < collections.length; i++) {
    await prisma.collections.create({
      data: collections[i],
    });
  }
  // create products
  for (let i = 0; i < products.length; i++) {
    await prisma.products.create({
      data: {
        ...products[i],
        stock: JSON.stringify(products[i].stock),
      },
    });
  }
  console.log("Database initialized successfully!");
};
handleInit();
