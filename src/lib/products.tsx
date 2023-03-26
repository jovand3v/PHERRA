import { StaticImageData } from "next/image";
import shirt from "@public/assets/collections/summer/open-shirt.png";
import flessSet from "@public/assets/collections/summer/fless-set.png";

export type ProductColorObject = { name: string; value: string };
export type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  inStock: boolean;
  img: StaticImageData;
  sizes: [string, ...string[]];
  colors: [ProductColorObject, ...ProductColorObject[]];
  collection: "summer" | "winter";
};

export const products: Product[] = [
  {
    id: 1,
    name: "OPEN SHIRT",
    price: 100,
    discount: 20,
    inStock: true,
    img: shirt,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Lime", value: "#78FF62" },
      { name: "Baby Blue", value: "#43D2FF" },
    ],
    collection: "summer",
  },
  {
    id: 2,
    name: "FLESS SET",
    price: 400,
    discount: 10,
    inStock: true,
    img: flessSet,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Red", value: "#D81F29" },
      { name: "White", value: "#fff" },
    ],
    collection: "summer",
  },
];
