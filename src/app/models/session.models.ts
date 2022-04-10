import { User } from "./user.models";

export class Session{
    public token: string | undefined;
    public user: User | undefined;
    public user_nombre: string | undefined;

  }