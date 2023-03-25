import { createContext, useState } from "react";
import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";
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
export type ProductSelected = {
  size: string;
  quantity: number;
  color: ProductColorObject;
};
export type CartProduct = { id: number; product: Product; selected: ProductSelected };
type Context = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  cart: CartProduct[];
  setCart: Dispatch<SetStateAction<CartProduct[]>>;
  quantity: number;
  total: number;
};

export const ProductsContext = createContext<Context>({
  products: [],
  setProducts: () => {},
  cart: [],
  setCart: () => {},
  quantity: 0,
  total: 0,
});

const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([
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
  ]);
  const [cart, setCart] = useState<CartProduct[]>([]);

  const quantity = cart.reduce((acc, curr) => acc + curr.selected.quantity, 0);
  const total = cart.reduce(
    (acc, curr) => acc + Math.round(curr.product.price - (curr.product.discount / 100) * curr.product.price),
    0
  );

  return (
    <ProductsContext.Provider value={{ products, setProducts, cart, setCart, quantity, total }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
