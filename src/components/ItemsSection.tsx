import React, { useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import style from "../styles/items_section.module.css";
import ItemsData from "../data/items.json";
import ItemsModel, { Services } from "../interfaces/ItemsModel";
import ServiceType from "./modals/ServiceType";
import CartProps from "../interfaces/CartProps";
import { apiGet } from '../config/AxiosHelper'; 
import { cloths as clothApi }  from '../config/apis/Cloth'

type CartContextProps = {
  items?: Array<CartProps>;
  cartTotal?: Object;
  itemExists?: Function;
  updateCartItemQuantity?: Function;
  addToCart?: Function;
};

export default function ItemsSection() {
  const [modalService, setModalService] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ItemsModel>();

  const { ...cartContext }: CartContextProps = useContext(CartContext);

  // console.log("ItemsSection", cartContext);

  const allItems: ItemsModel[] = ItemsData.map((element: any) => {
    const item = element as ItemsModel;
    return {
      id: item.id,
      name: item.name,
      icon: item.icon,
      services: item.services,
    };
  });
  const displayItems: any = allItems.map((item: ItemsModel) => {
    return (
      <p className='cursor-pointer hover:bg-green-200'
        key={item.id}
        onClick={() => {
          // console.log("selectedItem", item);
          setModalService(true);
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
    setModalService(false);
    // console.log("selectedItem name:", item.name);

    const result = cartContext.itemExists!(item);
    // console.log("item exists= ", result);
    if (result) {
      cartContext.updateCartItemQuantity!(item);
    } else {
      const cartItem: CartProps = {
        id: cartContext.items!.length + 1,
        item: item,
        quantity: 1,
      };
      cartContext.addToCart!(cartItem);
    }
  }

  useEffect(() => {
    async function fetchCloths() {
      try {
        const cloths = await apiGet(clothApi.getCloths.url);
      } catch (error) {
        // Handle error
      }
    }

    fetchCloths();
  }, []);

  return (
    <div className={`${style.itemsSection}`}>
      <header>
        <h1>Items Section={cartContext.items!.length}</h1>
      </header>
      <main className={style.gridLayout}>{displayItems}</main>
      <ServiceType
        show={modalService}
        onHide={() => setModalService(false)}
        selectedItem={selectedItem}
        onSelectService={onSelectService}
      />
    </div>
  );
}
