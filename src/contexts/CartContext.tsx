import React, { createContext, useState } from "react";
import CartProps from "../interfaces/CartProps";
import ItemsModel from "../interfaces/ItemsModel";

const CartContext = createContext({});

export function CartProvider({ children }: any) {
  console.log("CartProvider");
  const [items, setItems] = useState<Array<CartProps>>([]);

  const addToCart = (item: CartProps) => {
    console.log("addToCart");
    setItems((prevState: Array<CartProps>) => [...prevState, item]);
  };
  const updateCartRateItem = (item: CartProps) => {
    console.log("updateCart");
    setItems((prevState: Array<CartProps>) => {
      return { ...prevState, id: 9999 };
    });
  };
  return (
    <CartContext.Provider value={{ items, addToCart,updateCartRateItem }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
// const CartContext = createContext({});

// export function CartProvider({ children }: any) {
//   console.log("CartProvider");
//   const [items, setItems] = useState<Array<Object>>([
//     { name: "name", price: 1 },
//   ]);

//   const addToCart = (name: string, price: number) => {
//     console.log("addToCart");
//     setItems((prevState) => [...prevState, { name, price }]);
//   };
//   return (
//     <CartContext.Provider value={{ items, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartContext;
