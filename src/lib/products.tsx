import { StaticImageData } from "next/image";
import shirt from "@public/assets/collections/summer/open-shirt.png";
import flessSet from "@public/assets/collections/summer/fless-set.png";
import cbCoat from "@public/assets/collections/winter/cb-coat.png";
import ocCoat from "@public/assets/collections/winter/oc-coat.png";
import { Product } from "src/db/init_db";

// temp, will be deleted once admin is re-factored
export type CollectionProductColorObject = { name: string; value: string };
export type CollectionProduct = {
  id: number;
  name: string;
  price: number;
  discount: number;
  in_stock: boolean;
  img: StaticImageData;
  sizes: [string, ...string[]];
  colors: [CollectionProductColorObject, ...CollectionProductColorObject[]];
};

export const products: CollectionProduct[] = [
  {
    id: 1,
    name: "OPEN SHIRT",
    price: 100,
    discount: 20,
    in_stock: true,
    img: shirt,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Green", value: "#8FFF73" },
    ],
  },
  {
    id: 2,
    name: "FLESS SET",
    price: 400,
    discount: 10,
    in_stock: true,
    img: flessSet,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Red", value: "#D81F29" },
    ],
  },
  {
    id: 3,
    name: "OC COAT",
    price: 500,
    discount: 15,
    in_stock: true,
    img: ocCoat,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#fff" },
      { name: "Yellow", value: "#FFBE3F" },
      { name: "Cyan", value: "#57FFF5" },
    ],
  },
  {
    id: 4,
    name: "CB COAT",
    price: 400,
    discount: 10,
    in_stock: true,
    img: cbCoat,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Pink", value: "#FFC0C0" },
      { name: "Red", value: "#D81F29" },
    ],
  },
];

export const handlePriceDiscount = (price: Product["price"], discount: Product["discount"]): number => {
  return Math.round(price - (discount / 100) * price);
};
