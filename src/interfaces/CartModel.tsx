import CartItem from "./CartItem";

export default interface CartModel {
  cartItems: Array<CartItem>
  totalQuantity: number
  totalAmount: number
  discount: number
  vat: number
  amountPaid: number
}
