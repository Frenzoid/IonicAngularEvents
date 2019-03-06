// Interfaz de gestion de usuarios (innecesario para este ejercicio)

export default interface IUser {
  id?: number;
  name: string;
  avatar?: string;
  email: string;
  email2?: string;
  password?: string;
  lat?: number;
  lng?: number;
  me?: boolean;
}
