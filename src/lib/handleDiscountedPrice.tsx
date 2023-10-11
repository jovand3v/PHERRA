import { Product } from "src/db/init_db";

export const handleDiscountedPrice = (price: Product["price"], discount: Product["discount"]): number => {
  return Math.round(price - (discount / 100) * price);
};
