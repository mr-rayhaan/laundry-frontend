import React, { ReactNode, createContext, useState } from "react";
import CartProps, { Cart } from "../interfaces/CartProps";
import ItemsModel from "../interfaces/Cloth";

const CartContext = createContext({});

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  // console.log("CartProvider");
  const [items, setItems] = useState<Array<CartProps>>([]);
  const [cart, setCart] = useState<Cart>({ totalAmount: 0, discount: 0 });

  const addToCart = (item: CartProps) => {
    console.log("Cart Context addToCart");
    setItems((prevState: Array<CartProps>) => [...prevState, item]);

    let tempCart = {
      totalAmount: cart.totalAmount + item.item.services[0].price_list.price,
      discount: 0,
    };
    setCart(() => tempCart);
  };

  const itemExists = (item: ItemsModel) => {
    if (items.length < 1) {
      return false;
    }
    const result: CartProps = items.find(
      (element) =>
        element.item.id == item.id &&
        element.item.services[0].id == item.services[0].id
    )!;
    if (result == undefined) {
      return false;
    }
    return true;
  };
  const updateCartItemQuantity = (item: ItemsModel) => {
    // console.log("update quantity");
    let result = items;
    result.map((e) => {
      if (
        e.item.id == item.id &&
        e.item.services[0].id == item.services[0].id
      ) {
        console.log("increment quantity");
        e.quantity = e.quantity + 1;
        return e;
      }
    });
    calculateCartAmount();

    setItems((prevState: Array<CartProps>) => [...result]);

    // console.log(items);
  };
  const changeCartItemQuantity = (quantity: number, cartItemId: number) => {
    console.log("editCartItemQuantity", quantity, cartItemId);
    let result = items;
    result.map((e) => {
      if (e.id == cartItemId) {
        e.quantity = quantity;
        return e;
      }
    });

    calculateCartAmount();

    setItems((prevState: Array<CartProps>) => [...result]);
  };
  const changeCartItemRate = (rate: number, cartItem: CartProps) => {
    console.log("changeCartItemRate", cartItem);
    let cartItemfromState = items.filter((e) => e.id == cartItem.id)[0];
    cartItemfromState.item.services.map((service) => {
      if (service.service_name == cartItem.item.services[0].service_name) {
        service.price_list.price = rate;
      }
    });
    let result = items;
    result.filter((e) => e.id == cartItem.id)[0] = cartItemfromState;

    calculateCartAmount();

    setItems((prevState: Array<CartProps>) => [...result]);
  };
  const changeCartDiscount = (discount: number) => {
    console.log("changeCartDiscount", discount);

    calculateCartAmount(discount);
  };

  const calculateCartAmount = (discount?: number) => {
    let tempTotalAmount = 0;
    items.forEach((element) => {
      let unitPrice = 0;
      if (element.item.services[0].price_list == null) {
        unitPrice = element.item.services[0].price_list;
      } else {
        unitPrice = element.item.services[0].price_list.price;
      }
      tempTotalAmount += unitPrice * element.quantity;
    });
    let tempCart = {
      totalAmount: tempTotalAmount - (discount == null ? cart.discount : discount),
      discount: discount == null ? cart.discount : discount,
    };
    console.log(tempCart)
    setCart(() => tempCart);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        cart,
        addToCart,
        itemExists,
        updateCartItemQuantity,
        changeCartItemQuantity,
        changeCartItemRate,
        changeCartDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
