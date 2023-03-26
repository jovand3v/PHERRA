import { createContext, useReducer } from "react";
import { Dispatch } from "react";
import { ProductColorObject, Product } from "src/lib/products";

export type CartProductSelected = {
  size: string;
  quantity: number;
  color: ProductColorObject;
};
export type CartProduct = { id: number; product: Product; selected: CartProductSelected };
type Context = {
  cartReducer: { state: CartProduct[]; dispatch: Dispatch<CartAction> };
  quantity: number;
  total: number;
};
type CartAction = {
  type: string;
  payload: CartProduct;
};

export const CartContext = createContext<Context>({
  cartReducer: { state: [], dispatch: () => {} },
  quantity: 0,
  total: 0,
});

const reducer = (state: CartProduct[], action: CartAction) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const cartTemp = [...state];
      const index = cartTemp.map((cp) => cp.product.name).indexOf("OPEN SHIRT");
      if (index !== -1) {
        cartTemp[index].selected.quantity += 1;
        return cartTemp;
      } else {
        return [...state, action.payload];
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);
  const cartReducer = { state, dispatch };
  console.log(state[0]?.selected.quantity);
  // const quantity = cart.reduce((acc, curr) => acc + curr.selected.quantity, 0);
  // const total = cart.reduce(
  //   (acc, curr) => acc + Math.round(curr.product.price - (curr.product.discount / 100) * curr.product.price),
  //   0
  // );
  const quantity = 0;
  const total = 0;

  return <CartContext.Provider value={{ cartReducer, quantity, total }}>{children}</CartContext.Provider>;
};

export default CartProvider;
