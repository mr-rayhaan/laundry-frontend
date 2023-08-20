import PriceList from "./PriceList";

export default interface Service {
    id: number;
    service_name: string;
    service_code: string;
    created_at: Date
    updated_at: Date
    price_list: PriceList
}