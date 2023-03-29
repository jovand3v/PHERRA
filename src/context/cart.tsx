import { createContext, useReducer } from "react";
import { Dispatch } from "react";
import { ProductColorObject, Product } from "src/lib/products";

export type CartProductSelected = {
  size: string;
  quantity: number;
  color: ProductColorObject;
};
export type CartProduct = { id: number; product: Product; selected: CartProductSelected };

type CartAction = { type: "ADD_PRODUCT"; payload: CartProduct } | { type: "UPDATE_PRODUCT"; payload: CartProduct[] };

type Context = {
  cartReducer: { state: CartProduct[]; dispatch: Dispatch<CartAction> };
  quantity: number;
  total: number;
};
export const CartContext = createContext<Context>({
  cartReducer: { state: [], dispatch: () => {} },
  quantity: 0,
  total: 0,
});

const reducer = (state: CartProduct[], action: CartAction): CartProduct[] => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return [...state, action.payload];
    }
    case "UPDATE_PRODUCT": {
      return action.payload;
    }
  }
};

const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);
  const cartReducer = { state, dispatch };
  const quantity = cartReducer.state.reduce((acc, curr) => acc + curr.selected.quantity, 0);
  const total = cartReducer.state.reduce(
    (acc, curr) =>
      acc +
      Math.round(curr.product.price - (curr.product.discount / 100) * curr.product.price) * curr.selected.quantity,
    0
  );

  return <CartContext.Provider value={{ cartReducer, quantity, total }}>{children}</CartContext.Provider>;
};

export default CartProvider;
