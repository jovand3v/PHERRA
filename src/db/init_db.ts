import prisma from "../lib/prisma.js";

const handleInit = async () => {
  await prisma.products.deleteMany();
  await prisma.collections.deleteMany();
  await prisma.collections.create({
    data: {
      id: 1,
      name: "SUMMER",
      thumbnail: "image.png",
      year: 2023,
    },
  });
  await prisma.collections.create({
    data: {
      id: 2,
      name: "WINTER",
      thumbnail: "image.png",
      year: 2023,
    },
  });
  await prisma.products.create({
    data: {
      collection_id: 1,
      name: "OPEN SHIRT",
      price: 100,
      discount: 20,
      in_stock: true,
      img: "dummystring.png",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ['{ name: "White", value: "#fff" }', '{ name: "Green", value: "#8FFF73" }'],
    },
  });
};
handleInit();
