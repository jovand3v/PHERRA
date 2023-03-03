import { createContext, useState } from "react";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
import shirt from "@public/assets/products/white-shirt.png";

type ProductColorObject = { name: string; value: string };
type Products = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  img: { src: StaticImageData | null; alt: string };
  sizes: [string, ...string[]];
  colors: [ProductColorObject, ...ProductColorObject[]];
}[];
type Context = {
  products: Products | [];
  setProducts: Dispatch<SetStateAction<Products>>;
};

export const ProductsContext = createContext<Context>({ products: [], setProducts: () => {} });

const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Products>([
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
    },
  ]);

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
