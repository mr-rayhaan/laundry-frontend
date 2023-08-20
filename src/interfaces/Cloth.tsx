import Service from "./Service";

export default interface Cloth {
  id: number;
  cloth_type: string;
  cloth_code: string;
  cloth_image: string;
  created_at: Date
  updated_at: Date
  services: Array<Service>;
}




