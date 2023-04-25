import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";
import style from "../styles/items_section.module.css";
import ItemsData from "../data/items.json";
import ItemsModel, { Services } from "../interfaces/ItemsModel";
import ServiceType from "./modals/ServiceType";
import CartProps from "../interfaces/CartProps";

export default function ItemsSection() {
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ItemsModel>();

  const { ...cartContext }: any = useContext(CartContext);

  console.log("ItemsSection", cartContext);

  const allItems: ItemsModel[] = ItemsData.map((element: any) => {
    const item = element as ItemsModel;
    return {
      id: item.id,
      name: item.name,
      icon: item.icon,
      services: item.services,
    };
  });
  const items1: any = allItems.map((item: ItemsModel) => {
    return (
      <p
        key={item.id}
        onClick={() => {
          // console.log("selectedItem", item);
          setModalShow(true);
          setSelectedItem(item);
        }}
      >
        {item.name}
      </p>
    );
  });
  function onSelectService(service: Services) { 
    const item: ItemsModel = { ...selectedItem! };
    item.services = [service]; 
    setModalShow(false);

    const cartItem: CartProps = {id:cartContext.items.length+1,item:item,quantity:1};
    cartContext.addToCart(cartItem); 
  }
  return (
    <div className={style.itemsSection}>
      <header>
        <h1>Items Section={cartContext.items.length}</h1>
      </header>
      <main className={style.gridLayout}>{items1}</main>
      <ServiceType
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedItem={selectedItem}
        onSelectService={onSelectService}
      />
    </div>
  );
}
