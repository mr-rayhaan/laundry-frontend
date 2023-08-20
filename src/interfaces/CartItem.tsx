import ClothType from "./Cloth";
import ServiceType from "./Service";

export default interface CartItem {
  id: number
  customerOrderId?: number
  cloth: ClothType
  service: ServiceType
  rate: number
  quantity: number
  totalAmount: number
}

