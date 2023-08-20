import Cloth from "../interfaces/Cloth";

export type ServiceProps = {
    show: boolean;
    onHide: VoidFunction;
    selectedItem?: Cloth;
    onSelectService?: Function;
}