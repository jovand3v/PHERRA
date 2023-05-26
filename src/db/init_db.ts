import prisma from "../lib/prisma.js";

export type ProductColorObject = { name: string; value: string };
export type Product = {
  id: number;
  collection_id: number;
  name: string;
  img: string;
  price: number;
  discount: number;
  sizes: string[];
  in_stock: boolean;
  colors: [ProductColorObject, ...ProductColorObject[]];
};

const handleInit = async () => {
  // temp defined here
  const collections = [
    { id: 1, name: "summer", thumbnail: "/assets/thumbnails/summer-model-2.png", year: 2023 },
    { id: 2, name: "winter", thumbnail: "/assets/thumbnails/winter-model-1.png", year: 2023 },
  ];
  const products = [
    {
      collection_id: 1,
      name: "open shirt",
      price: 100,
      discount: 20,
      in_stock: true,
      img: "/assets/collections/summer/open-shirt.png",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", value: "#fff" },
        { name: "Green", value: "#8FFF73" },
      ],
    },
    {
      collection_id: 1,
      name: "fless set",
      price: 400,
      discount: 10,
      in_stock: true,
      img: "/assets/collections/summer/fless-set.png",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", value: "#fff" },
        { name: "Red", value: "#D81F29" },
      ],
    },
    {
      collection_id: 2,
      name: "oc coat",
      price: 500,
      discount: 15,
      in_stock: true,
      img: "/assets/collections/winter/oc-coat.png",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", value: "#fff" },
        { name: "Yellow", value: "#FFBE3F" },
        { name: "Cyan", value: "#57FFF5" },
      ],
    },
    {
      collection_id: 2,
      name: "cb coat",
      price: 400,
      discount: 10,
      in_stock: true,
      img: "/assets/collections/winter/cb-coat.png",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Pink", value: "#FFC0C0" },
        { name: "Red", value: "#D81F29" },
      ],
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
      data: { ...products[i], colors: JSON.stringify(products[i].colors) },
    });
  }
  console.log("Database initialized successfully!");
};
handleInit();
