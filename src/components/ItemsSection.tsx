import React, { useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import style from "../styles/items_section.module.css";
import ItemsData from "../data/items.json";
import Cloth, { Service } from "../interfaces/Cloth";
import ServiceType from "./modals/ServiceType";
import CartProps from "../interfaces/CartProps";
// import { apiGet } from '../config/AxiosHelper';
import { cloths as clothApi } from '../config/apis/Cloth'
import { generateAPI } from "../config/ApiGenerate";

type CartContextProps = {
  items?: Array<CartProps>;
  cartTotal?: Object;
  itemExists?: Function;
  updateCartItemQuantity?: Function;
  addToCart?: Function;
};

export default function ItemsSection() {
  const [cloths, setCloths] = React.useState<Cloth[]>();
  const [modalService, setModalService] = React.useState<boolean>(false);
  const [selectedCloth, setSelectedCloth] = React.useState<Cloth>();

  const { ...cartContext }: CartContextProps = useContext(CartContext);

  // console.log("ItemsSection", cartContext);

  // const allItems: ItemsModel[] = ItemsData.map((element: any) => {
  //   const item = element as ItemsModel;
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     icon: item.icon,
  //     services: item.services,
  //   };
  // });
  // const displayItems: any = allItems.map((item: ItemsModel) => {
  //   return (
  //     <p className='cursor-pointer hover:bg-green-200'
  //       key={item.id}
  //       onClick={() => {
  //         // console.log("selectedItem", item);
  //         setModalService(true);
  //         setSelectedItem(item);
  //       }}
  //     >
  //       {item.name}
  //     </p>
  //   );
  // });

  const displayItems: any = cloths?.map((item: Cloth) => {
    return (
      <p className='cursor-pointer hover:bg-green-200'
        key={item.id}
        onClick={() => {
          // console.log("selectedItem", item);
          setModalService(true);
          setSelectedCloth(item);
        }}
      >
        {item.cloth_type}
      </p>
    )
  })
  function onSelectService(service: Service) {
    const item: Cloth = { ...selectedCloth! };
    item.services = [service];
    setModalService(false);
    console.log("selectedItem:", item);

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
        const api = clothApi.getCloths
        var response: any = await generateAPI(api)

        response = response.data.cloths.map((cloth: Cloth) => {
          cloth.created_at = new Date(cloth.created_at)
          cloth.updated_at = new Date(cloth.updated_at)
          return cloth
        })

        setCloths(() => response);

      } catch (error) {
        // Handle error
        console.log('unable to get cloths: ', error)
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
        selectedItem={selectedCloth}
        onSelectService={onSelectService}
      />
    </div>
  );
}
