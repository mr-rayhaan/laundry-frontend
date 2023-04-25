// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Props from "../../interfaces/ServiceTypeProps";
import { Services } from "../../interfaces/ItemsModel";
import style from "../../styles/service_modal.module.css";

export default function ServiceType(props: Props) {
  const { show, onHide, selectedItem, onSelectService } = props;

  const services: any =
    selectedItem != undefined ? (
      selectedItem!.services.map((item: Services) => {
        return (
          <div
            key={item.id}
            className={style.gridItem}
            onClick={() =>
              onSelectService!(
                selectedItem.services.filter((e) => e.id == item.id)[0]
              )
            }
          >
            {item.type}
          </div>
        );
      })
    ) : (
      <>No</>
    );
  return (
    <Modal
      contentClassName={style.modalWrapper}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>{selectedItem && selectedItem.name}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={style.gridLayout}>{services}</div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
