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
    sizes?:  Sizes;
}

export interface Sizes {
    id: number;
    small: number;
    medium: number;
    larger: number;
    custom: number;
}