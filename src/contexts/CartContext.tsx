import React, { ReactNode, createContext, useState } from "react";
import CartItem from "../interfaces/CartItem";
import Cloth from "../interfaces/Cloth";
import { CartContextProps } from "../types/CartContextProps";
import Service from "../interfaces/Service";
import CartModel from "../interfaces/CartModel";

const initialCartModel: CartModel = {
  cartItems: [],
  discount: 0,
  totalAmount: 0,
  totalQuantity: 0,
  vat: 0,
  amountPaid: 0
}

const CartContext = createContext({
  cartModel: initialCartModel,
  addToCart: (cloth: Cloth, service: Service) => { },
  updateCartItemQuantity: (quantity: number, cartItemId: number) => { },
  updateCartItemRate: (rate: number, cartItem: CartItem) => { },
  updateCartDiscount: (discount: number) => { },
  updateAmountPaid: (amountPaid: number) => { }
  // ... other properties and functions
});

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartModel, setCartModel] = useState<CartModel>(initialCartModel)

  const addToCart = (cloth: Cloth, service: Service) => {
    // console.log("Cart Context addToCart")

    const result: Array<CartItem> = cartModel.cartItems.filter((element: CartItem) =>
      element.cloth.id == cloth.id &&
      element.service.id == service.id
    );
    if (result.length == 0) {
      //ADD NEW ITEM TO CART
      addNewItemToCart({ id: cartModel.cartItems.length + 1, cloth: cloth, service: service, rate: service.price_list.price, quantity: 1, totalAmount: service.price_list.price })
    } else {
      //UPDATE QUANTITY OF CARTITEM
      updateCartItemQuantity(result[0].quantity + 1, result[0].id)
    }

  }
  function addNewItemToCart(newItem: CartItem) {
    console.log('addNewItemToCart')
    // Clone the current cart items array and add the new item
    const updatedCartItems = [...cartModel.cartItems, newItem];

    // Calculate the new total amount
    const newTotalAmount = cartModel.totalAmount + newItem.totalAmount

    // Update the cartModel state
    setCartModel({
      ...cartModel,
      cartItems: updatedCartItems,
      totalAmount: newTotalAmount,
      totalQuantity: cartModel.totalQuantity + 1
    });
  }
  const updateCartItemQuantity = (quantity: number, cartItemId: number) => {
    console.log("updateCartItemQuantity")

    const updatedCartItems = cartModel.cartItems.map((cartItem: CartItem) => {
      if (cartItem.id == cartItemId) {
        cartItem.quantity = quantity;
        cartItem.totalAmount = cartItem.rate * quantity
      }
      return cartItem;
    });
    let newTotalAmount = updatedCartItems.reduce(
      (total, cartItem) => total + cartItem.totalAmount, 0);
    newTotalAmount -= cartModel.discount

    setCartModel({
      ...cartModel,
      cartItems: updatedCartItems,
      totalAmount: newTotalAmount,
      totalQuantity: cartModel.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    })
  };
  const updateCartItemRate = (rate: number, cartItem: CartItem) => {
    console.log("updateCartItemRate", cartItem, rate)

    let cartItemfromState = cartModel.cartItems.filter((e) => e.id == cartItem.id)[0]

    cartItemfromState.service.price_list.price = rate
    cartItemfromState.rate = rate
    cartItemfromState.totalAmount = cartItemfromState.rate * cartItemfromState.quantity

    const updatedCartItems = cartModel.cartItems.map((cartItem: CartItem) => {
      if (cartItem.id == cartItemfromState.id) {
        cartItem = cartItemfromState
      }
      return cartItem

    })
    let updatedTotalAmount = updatedCartItems.reduce(
      (total, cartItem) => total + cartItem.totalAmount,
      0
    )
    updatedTotalAmount -= cartModel.discount


    setCartModel({ ...cartModel, cartItems: [...updatedCartItems], totalAmount: updatedTotalAmount })

  };
  const updateCartDiscount = (discount: number) => {
    console.log("updateCartDiscount", discount)
    let newTotalAmount = 0

    cartModel.cartItems.forEach((cartItem) => {
      newTotalAmount += cartItem.quantity * cartItem.rate
    })
    newTotalAmount -= discount

    setCartModel({ ...cartModel, discount: discount, totalAmount: newTotalAmount })
  };
  const updateAmountPaid = (value: number) => {
    // cartModel.amountPaid = value
    setCartModel({ ...cartModel, amountPaid: value })
  }

  return (
    <CartContext.Provider
      value={{
        cartModel,
        addToCart,
        updateCartItemQuantity,
        updateCartItemRate,
        updateCartDiscount,
        updateAmountPaid
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
