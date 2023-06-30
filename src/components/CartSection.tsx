import React, { useState, useContext, ReactNode, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import CartProps, { Cart } from "../interfaces/CartProps";
import style from "../styles/cart_section.module.css";

type CartContextProps = {
  items?: Array<CartProps>;
  itemExists?: Function;
  addToCart?: Function;
  changeCartItemQuantity?: Function;
  changeCartItemRate?: Function;
  cart?: Cart;
  changeCartDiscount?: Function
};

export default function CartSection() {
  const cartContext: CartContextProps = useContext(CartContext);
  console.log("CartSection", cartContext.cart!.discount);

  // const [cartDiscount, setCartDiscount] = useState(0);
  // const [totalAmount, setTotalAmount] = useState(0.0);

  function onChangeItemRate(e: any, cartItem: CartProps) {
    // console.log("onChangeItemRate: ", cartItem);
    const newValue: string = e.currentTarget.value;
    if (newValue.trim().length > 0) {
      cartContext.changeCartItemRate!(Number(e.target.value), cartItem);
    }
  }
  function onChangeItemQuantity(e: any, cartItemId: Number) {
    // console.log("onChangeItemQuantity: ", cartItemId);
    const newQuantity: string = e.currentTarget.value;
    if (newQuantity.trim().length > 0) {
      cartContext.changeCartItemQuantity!(Number(newQuantity), cartItemId);
    }
  }
  function onChangeDiscount(e: any) {
    const newDiscount: string = e.target.value;
    if (newDiscount.trim().length > 0) {
      cartContext.changeCartDiscount!(Number(newDiscount))
    }
  }

  const cartItems: ReactNode = cartContext.items!.map(
    (element: CartProps, index: number) => {
      let unitPrice = 0;
      if (element.item.services[0].sizes!.custom == null) {
        unitPrice = element.item.services[0].sizes!.regular;
      } else {
        unitPrice = element.item.services[0].sizes!.custom;
      }

      console.log("unitPrice", unitPrice);

      return (
        <tr key={element.id}>
          <td>{++index}</td>
          <td>{element.item.name}</td>
          <td>{element.item.services[0].type}</td>
          <td>
            <input
              type="number"
              onChange={(e) => {
                onChangeItemRate(e, element);
              }}
              value={unitPrice}
            />
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => {
                onChangeItemQuantity(e, element.id);
              }}
              value={element.quantity}
            />
          </td>
          <td>{element.quantity * unitPrice}</td>
        </tr>
      );
    }
  );

  // useEffect(() => {
  //   console.log("useEffect CartSection");
  //   let result = 0;
  //   cartContext.items!.forEach((element: CartProps) => {
  //     let unitPrice = 0;
  //     if (element.item.services[0].sizes!.custom == null) {
  //       unitPrice = element.item.services[0].sizes!.regular;
  //     } else {
  //       unitPrice = element.item.services[0].sizes!.custom;
  //     }
  //     result += element.quantity * unitPrice - cartDiscount;
  //   });
  //   setTotalAmount(result);
  //   console.log("result: ", result);
  // }, [cartContext.items]);

  return (
    <div className={style.cartSection}>
      <h1>Cart Section</h1>
      {/* <input type="text" defaultValue={searchText} /> */}
      <table width="100%">
        <thead></thead>
        <tbody>
          <tr className={style.tableCaption}>
            <td>#</td>
            <td>Item</td>
            <td>Service</td>
            <td>Rate</td>
            <td>Quantity</td>
            <td>Total</td>
          </tr>
          {cartItems}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Discount</td>
            <td>
              <input
                type="number"
                onChange={(e) => {
                  onChangeDiscount(e);
                }}
                value={cartContext.cart!.discount}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>{cartContext.cart!.totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
