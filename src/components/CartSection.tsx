import React, { useState, useContext, ReactNode, useEffect } from "react";
import CartContext from "../contexts/CartContext";
// import CartProps, { Cart } from "../interfaces/CartItem";
import style from "../styles/cart_section.module.css";
import { generateAPI } from "../config/ApiGenerate";
import { customerOrderApis } from "../config/apis/CustomerOrder"
// import { CartContextProps } from "../types/CartContextProps";
import CartItem from "../interfaces/CartItem"


import Customer from "../interfaces/Customer"
import CustomerSelect from "./CustomerSelect"

import EmployeeSelect from "./EmployeeSelect"
import Employee from "../interfaces/Employee"
import DateTimePicker from "react-datetime-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CartSection() {
  const cartContext = useContext(CartContext);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>()
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    console.log('delivery date:', date)
    setSelectedDate(date);
  };

  function onChangeItemRate(rate: string, cartItem: CartItem) {
    if (rate.trim().length > 0) {
      cartContext.updateCartItemRate!(Number(rate), cartItem);
    }
  }
  function onChangeItemQuantity(quantity: string, cartItemId: number) {
    if (quantity.trim().length > 0) {
      cartContext.updateCartItemQuantity(Number(quantity), cartItemId);
    }
  }
  function onChangeDiscount(discount: string) {
    if (discount.trim().length > 0) {
      cartContext.updateCartDiscount!(Number(discount));
    }
  }
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Now, send the formattedDate to your backend API
  };

  const getCartItems = () => {
    return cartContext.cartModel.cartItems.map(({ id, rate, quantity, totalAmount, service, cloth }) => {
      return { id, cloth_id: cloth.id, service_id: service.id, rate: rate, quantity: quantity, total_amount: totalAmount }
    })
  }

  const createCustomerOrder = async () => {
    // console.log( selectedCustomer!.id)

    const api = customerOrderApis.createCustomerOrder;
    api.data = {
      action: 'create',
      customer_id: selectedCustomer == null ? null : selectedCustomer.id,
      total_quantity: cartContext.cartModel.totalQuantity,
      discount: cartContext.cartModel.discount,
      vat: cartContext.cartModel.vat,
      total_amount: cartContext.cartModel.totalAmount,
      amount_paid: cartContext.cartModel.amountPaid,
      amount_pending: cartContext.cartModel.totalAmount - cartContext.cartModel.amountPaid,
      comments: '',
      employee_id: selectedEmployee == null ? null : selectedEmployee.id,
      delivery_date: formatDate(selectedDate),
      cart_items: getCartItems()
    }
    console.log(api)
    try {
      const response = await generateAPI(api)
      // alert(response?.data.message)
    } catch (ex) {
      console.log(ex)
    }
  }

  const cartItems: ReactNode = cartContext.cartModel.cartItems.map(
    (element: CartItem, index: number) => {
      let unitPrice = element.service.price_list.price;

      return (
        <tr key={element.id}>
          <td>{++index}</td>
          <td>{element.cloth.cloth_type}</td>
          <td>{element.service.service_name}</td>
          <td>
            <input
              type="number"
              onChange={(e) => {
                onChangeItemRate(e.target.value, element);
              }}
              value={unitPrice}
            />
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => {
                onChangeItemQuantity(e.target.value, element.id);
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
      <CustomerSelect

        selectedOption={selectedCustomer}
        onSelectOption={(value: Customer) => setSelectedCustomer(value)}
      />

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
                  onChangeDiscount(e.target.value);
                }}
                value={cartContext.cartModel.discount}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>{cartContext.cartModel.totalAmount}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Amount paid</td>
            <td><input type="number" value={cartContext.cartModel.amountPaid} onChange={(e) => { cartContext.updateAmountPaid(Number(e.target.value.trim())) }} /></td>
          </tr>
        </tbody>
      </table>
      <EmployeeSelect
        selectedOption={selectedEmployee}
        onSelectOption={(value: Employee) => setSelectedEmployee(value)}
      />
      <div className="flex justify-between">
        <p>Delivery Date:</p>
        <DateTimePicker
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={createCustomerOrder}
      >
        Save
      </button>
    </div>
  );
}
