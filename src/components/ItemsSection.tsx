import React, { useContext, useEffect } from "react";
import style from "../styles/items_section.module.css"

import CartContext from "../contexts/CartContext";

import { cloths as clothApi } from '../config/apis/Cloth'
import { generateAPI } from "../config/ApiGenerate";
 
import Cloth from "../interfaces/Cloth"; 
import Service from "../interfaces/Service"

import ServicesModal from "./modals/ServicesModal";

export default function ItemsSection() {
  const [cloths, setCloths] = React.useState<Cloth[]>();
  const [modalService, setModalService] = React.useState<boolean>(false);
  const [selectedCloth, setSelectedCloth] = React.useState<Cloth>();

  const cartContext = useContext(CartContext);

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
    setModalService(false);
    const result = cartContext.addToCart(selectedCloth!, service)
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
        <h1>Items Section={cartContext.cartModel.cartItems.length}</h1>
      </header>
      <main className={style.gridLayout}>{displayItems}</main>
      <ServicesModal
        show={modalService}
        onHide={() => setModalService(false)}
        selectedItem={selectedCloth}
        onSelectService={onSelectService}
      />
    </div>
  );
}
