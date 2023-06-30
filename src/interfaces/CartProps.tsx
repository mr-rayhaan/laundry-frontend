import ItemsModel from "./ItemsModel";

export default interface CartProps {
  id: number;
  item: ItemsModel;
  quantity: number;
}

export interface Cart {
  discount: number;
  totalAmount: number;
}
