import CartModel from "../interfaces/CartModel";
import Cloth from "../interfaces/Cloth";
import Service from "../interfaces/Service";
import CartItem from "../interfaces/CartItem";

export type CartContextProps = {
    cartModel: CartModel
    addToCart: (cloth: Cloth, service: Service) => {},
    updateCartItemQuantity: (quantity: number, cartItemId: number) => {},
    updateCartItemRate: (rate: number, cartItem: CartItem) => {},
    updateCartDiscount: (discount: number) => {}, 
    updateAmountPaid: (amountPaid: number) => {}
}

