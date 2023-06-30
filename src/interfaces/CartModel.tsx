import CartProps from "./CartProps";

export default interface CartModel {
  cartPropsArray?: CartProps[];
  totalQuantity?: number;
  totalAmount?: number;
}
