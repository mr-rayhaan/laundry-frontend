import CartModel from "./CartModel"
import Customer from "./Customer"
import Employee from "./Employee"

enum customerOrderStatus {
  Received = 1,
  Processing,
  Ready,
  Delivered
}

export default interface CustomerOrder {
  status: customerOrderStatus
  customer?: Customer
  cartModel: CartModel
  amountPaid: number
  amountPending: number
  comments?: string
  employee?: Employee
  deliveryDate: Date
  createdAt: Date
  updatedAt: Date
}