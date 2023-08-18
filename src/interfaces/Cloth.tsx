
export default interface Cloth {
  id: number;
  cloth_type: string;
  cloth_code: string;
  cloth_image: string;
  created_at: Date
  updated_at: Date
  services: Array<Service>;
}

export interface Service {
  id: number;
  service_name: string;
  service_code: string;
  created_at: Date
  updated_at: Date
  price_list: PriceList
}

export interface PriceList {
  cloth_id: number;
  service_id: number;
  price: number;
}
