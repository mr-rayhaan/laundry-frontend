import React from "react";

export default interface ItemsModel {
  id: number;
  name: string;
  icon: string;
  services: Array<Services>;
}

export interface Services {
  id: number;
  type?: string;
  sizes?: Sizes;
}

export interface Sizes {
  id: number;
  regular: number;
  custom: number;
}
