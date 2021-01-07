import { IRole } from "./dependancies";

export type IUser = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  archived_date: null | string;
  created_at: null | string;
  realm: null | string;
  emailVerified: null | boolean;
  id: number;
  role?: IRole;
};

export type ICurrentUser = {
  authenticated: boolean;
  authDetails: {
    id: string;
    ttl: number;
    created: string;
    userId: number;
    role: string;
  };
  details: IUser;
};

export type IUsers = {
  users: Array<IUser>;
  currentUser: ICurrentUser;
};
