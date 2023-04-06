import { StaticImageData } from "next/image";
import shirt from "@public/assets/collections/summer/open-shirt.png";
import flessSet from "@public/assets/collections/summer/fless-set.png";
import cbCoat from "@public/assets/collections/winter/cb-coat.png";
import ocCoat from "@public/assets/collections/winter/oc-coat.png";

export type ProductColorObject = { name: string; value: string };
export type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
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
    img: shirt,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Green", value: "#8FFF73" },
    ],
    collection: "summer",
  },
  {
    id: 2,
    name: "FLESS SET",
    price: 400,
    discount: 10,
    img: flessSet,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Red", value: "#D81F29" },
    ],
    collection: "summer",
  },
  {
    id: 3,
    name: "OC COAT",
    price: 500,
    discount: 15,
    img: ocCoat,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Yellow", value: "#FFBE3F" },
      { name: "Cyan", value: "#57FFF5" },
    ],
    collection: "winter",
  },
  {
    id: 4,
    name: "CB COAT",
    price: 400,
    discount: 10,
    img: cbCoat,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pink", value: "#FFC0C0" },
      { name: "Red", value: "#D81F29" },
    ],
    collection: "winter",
  },
];

export const discountedPrice = (price: Product["price"], discount: Product["discount"]): number => {
  return Math.round(price - (discount / 100) * price);
};
