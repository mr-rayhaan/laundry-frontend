import React from "react";
import ItemsModel from "./Cloth";

export default interface ServiceTypeProps {
    show: boolean;
    onHide: VoidFunction;
    selectedItem?: ItemsModel;
    onSelectService?: Function;
}
