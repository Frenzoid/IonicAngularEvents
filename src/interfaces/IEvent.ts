// Interfaz de gestion de los eventos

import IUser from './IUser';

export default interface IEvent {
    id?: number;
    title: string;
    date: Date | string;
    description: string;
    image: string;
    price: number;
    address: string;
    lat: number;
    lng: number;
    creator?: IUser;
    mine?: boolean;
    attend?: boolean;
    distance?: number;
}
