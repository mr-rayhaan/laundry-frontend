import ItemsModel, { Services } from "./ItemsModel";

export default interface CartProps {
    id: number;
    item: ItemsModel;  
    quantity: number;
}