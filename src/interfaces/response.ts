// interfaz de gestion de respuestas del servidor

import IEvent from './IEvent';
import IUser from './IUser';
export interface ResponseEvents {
  events: IEvent[];
}

export interface Responsersult {
  error: string;
  result: {token: string, events?: IEvent[], attendants?: IUser[], users?: IUser };
  errorMessage: string;
}
