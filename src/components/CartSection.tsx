import React, { useState, useContext } from "react";
import CartContext from "../contexts/CartContext";
import CartProps from "../interfaces/CartProps";
import Props from "../interfaces/CartProps";
import ItemsModel, { Services } from "../interfaces/ItemsModel";
import style from "../styles/cart_section.module.css";

export default function CartSection() {
  // const [searchText, setSearchText] = useState("Search customer...");
  const { ...cartContext }: any = useContext(CartContext);
  const [selectedCartItem, setSelectedCartItem] = useState<CartProps>();
  console.log("CartSection", cartContext.items);

  function onChangeItemRate(e: any) {
    const newValue:string = e.currentTarget.value;
    console.log("onChangeItemRate", newValue);
    if (newValue.trim().length > 0) { 
      cartContext.updateCartRateItem(selectedCartItem);
    }  
  }

  const cartItems: any = cartContext.items.map((element: CartProps) => {
    return (
      <tr key={element.id}>
        <td>{element.item.name}</td>
        <td>{element.item.services[0].type}</td>
        <td>
          <input
            type="text"
            onChange={(e) => {
              setSelectedCartItem(element);
              onChangeItemRate(e);
            }}
            defaultValue={element.item.services[0].sizes!.small}
          />
        </td>
        <td>{element.quantity}</td>
      </tr>
    );
  });

  return (
    <div className={style.cartSection}>
      <h1>Cart Section</h1>
      {/* <input type="text" defaultValue={searchText} /> */}
      <table width="100%">
        <thead></thead>
        <tbody>
          <tr className={style.tableCaption}>
            <td>Item</td>
            <td>Service</td>
            <td>Rate</td>
            <td>Quantity</td>
            <td>&nbsp;</td>
          </tr>
          {cartItems}
        </tbody>
      </table>
    </div>
  );
}
