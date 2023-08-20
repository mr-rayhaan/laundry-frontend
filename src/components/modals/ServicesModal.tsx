import React from "react";
import Service from "../../interfaces/Service";
import style from "../../styles/service_modal.module.css";
import { ServiceProps } from "../../types/ServiceProps";

export default function ServicesModal(props: ServiceProps) {
  const { show, onHide, selectedItem, onSelectService } = props;

  const services: any =
    selectedItem != undefined ? (
      selectedItem!.services.map((item: Service) => {
        return (
          <div
            key={item.id}
            className={` cursor-pointer hover:bg-green-200 ${style.gridItem}`}
            onClick={() =>
              onSelectService!(
                selectedItem.services.filter((e) => e.id == item.id)[0]
              )
            }
          >
            {item.service_name}
          </div>
        );
      })
    ) : (
      <>No item selected</>
    );
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    toggle: Number
  ) => {
    event.stopPropagation();

    switch (toggle) {
      case 0:
        onHide()
        break;
      case 1:

        break;
    }
  };

  if (show) {
    return (
      <div
        onClick={(event) => handleClick(event, 0)}
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/[.4] flex justify-center items-center"
      >
        <div
          onClick={(event) => handleClick(event, 1)}
          className="h-[fit-content] bg-white p-2 rounded"
        >
          <h1 >{selectedItem?.cloth_type}</h1>
          <div className={`grid gap-10 p-10 ${style.gridLayout}`}>
            {services}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
