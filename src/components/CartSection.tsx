import React, { useState, useContext, ReactNode, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import CartProps, { Cart } from "../interfaces/CartProps";
import style from "../styles/cart_section.module.css";
import Customer from "../interfaces/Customer";
import CustomerComponent from "./CustomerComponent";
import { generateAPI } from "../config/ApiGenerate";
import { customerOrderApis } from "../config/apis/CustomerOrder"

type CartContextProps = {
  items?: Array<CartProps>;
  itemExists?: Function;
  addToCart?: Function;
  changeCartItemQuantity?: Function;
  changeCartItemRate?: Function;
  cart?: Cart;
  changeCartDiscount?: Function;
};

export default function CartSection() {
  const cartContext: CartContextProps = useContext(CartContext);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  // const [customerInputText, setCustomerInputText] = useState<string>('');

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
      cartContext.changeCartDiscount!(Number(newDiscount));
    }
  }
  const createCustomerOrder = async () => {

    const api = customerOrderApis.createCustomerOrder;
    api.data = {
      action: 'create',
      customer_id: selectedCustomer!.id,
      total_quantity: 0,
      discount: 0,
      vat: 0,
      total_amount: 0,
      amount_paid: 0,
      amount_pending: 0,
      comments: '',
      employee_id: 0,
      delivery_date: ''
    }
    try {
      const response = await generateAPI(api)
      alert(response?.data.message)
    } catch (ex) {
      console.log(ex)
    }
  }

  const cartItems: ReactNode = cartContext.items!.map(
    (element: CartProps, index: number) => {
      let unitPrice = element.item.services[0].price_list.price;

      // console.log("unitPrice", unitPrice);

      return (
        <tr key={element.id}>
          <td>{++index}</td>
          <td>{element.item.cloth_type}</td>
          <td>{element.item.services[0].service_name}</td>
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


  return (
    <div className={style.cartSection}>
      <CustomerComponent selectedCustomer={selectedCustomer} onSelectCustomer={(value: Customer) => setSelectedCustomer(value)} />

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
      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={createCustomerOrder}
      >
        Save
      </button>
    </div>
  );
}
