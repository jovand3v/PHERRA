import { createContext, useReducer } from "react";
import { Dispatch } from "react";
import { DropdownType, DropdownValue } from "src/components/common/CartProduct";
import { Product, ProductColorObject } from "src/db/init_db";
import { handlePriceDiscount } from "src/lib/products";

export type CartProductSelected = {
  size: string;
  quantity: number;
  color: ProductColorObject;
};
export type CartProduct = { id: number; product: Product; selected: CartProductSelected };
type CartAction<T extends DropdownType> =
  | { type: "ADD_PRODUCT"; payload: CartProduct }
  | { type: "UPDATE_PRODUCT"; payload: { product: CartProduct; type: DropdownType; value: DropdownValue[T] } }
  | { type: "REMOVE_PRODUCT"; payload: CartProduct };
type Context<T extends DropdownType> = {
  cartReducer: { state: CartProduct[]; dispatch: Dispatch<CartAction<T>> };
  quantity: number;
  total: number;
};

export const CartContext = createContext<Context<DropdownType>>({
  cartReducer: { state: [], dispatch: () => {} },
  quantity: 0,
  total: 0,
});

const handleProductCompare = (obj1: CartProduct, obj2: CartProduct) => {
  return (
    JSON.stringify(obj1.selected.color) === JSON.stringify(obj2.selected.color) &&
    JSON.stringify(obj1.selected.size) === JSON.stringify(obj2.selected.size) &&
    JSON.stringify(obj1.product) === JSON.stringify(obj2.product)
  );
};

const reducer = <T extends DropdownType>(state: CartProduct[], action: CartAction<T>): CartProduct[] => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const productIndex = state.findIndex((cp) => handleProductCompare(cp, action.payload));
      if (productIndex !== -1) {
        const product = state[productIndex];
        const quantitySum = product.selected.quantity + action.payload.selected.quantity;
        return [
          ...state.slice(0, productIndex),
          { ...product, selected: { ...product.selected, quantity: quantitySum > 5 ? 5 : quantitySum } },
          ...state.slice(productIndex + 1),
        ];
      } else {
        return [...state, action.payload];
      }
    }
    case "UPDATE_PRODUCT": {
      const productIndex = state.findIndex((cp) => cp.id === action.payload.product.id);
      if (productIndex !== -1) {
        const product: CartProduct = {
          ...action.payload.product,
          selected: { ...action.payload.product.selected, [action.payload.type]: action.payload.value },
        };
        return [...state.slice(0, productIndex), product, ...state.slice(productIndex + 1)];
      } else {
        console.error(`${action.payload.product} doesn't exist in cart`);
        return state;
      }
    }
    case "REMOVE_PRODUCT": {
      const productIndex = state.findIndex((cp) => cp.id === action.payload.id);
      if (productIndex !== -1) {
        const tempState = [...state];
        tempState.splice(productIndex, 1);
        return tempState;
      } else {
        console.error(`${action.payload} doesn't exist in cart`);
        return state;
      }
    }
  }
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const cartReducer = { state, dispatch };
  const quantity = cartReducer.state.reduce((acc, curr) => acc + curr.selected.quantity, 0);
  const total = cartReducer.state.reduce(
    (acc, curr) =>
      acc + Math.round(handlePriceDiscount(curr.product.price, curr.product.discount) * curr.selected.quantity),
    0
  );

  return <CartContext.Provider value={{ cartReducer, quantity, total }}>{children}</CartContext.Provider>;
};

export default CartProvider;
