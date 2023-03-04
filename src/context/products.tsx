import { createContext, useState } from "react";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import shirt from "@public/assets/products/white-shirt.png";

export type ProductColorObject = { name: string; value: string };
export type ProductSelected = { color: ProductColorObject; size: string; quantity: number };
export type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  img: { src: StaticImageData | null; alt: string };
  sizes: [string, ...string[]];
  colors: [ProductColorObject, ...ProductColorObject[]];
  selected: ProductSelected;
};
type Context = {
  products: Product[] | [];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<Context>({ products: [], setProducts: () => {} });

const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "open shirt",
      price: 100,
      inStock: true,
      img: { src: shirt, alt: "model" },
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Beige", value: "#ffd481" },
        { name: "Blue", value: "lightblue" },
      ],
      selected: { color: { name: "Beige", value: "#ffd481" }, size: "S", quantity: 1 },
    },
    {
      id: 2,
      name: "RIPPED JEANS",
      price: 250,
      inStock: true,
      img: { src: null, alt: "" },
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Beige", value: "#ffd481" },
        { name: "Blue", value: "lightblue" },
      ],
      selected: { color: { name: "Beige", value: "#ffd481" }, size: "S", quantity: 1 },
    },
  ]);

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
