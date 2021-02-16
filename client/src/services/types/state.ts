import { IDependancies } from "./dependancies";
import { IErrors } from "./errors";
import { IFacilities } from "./facility";
import { IStatuses } from "./statuses";
import { IUI } from "./ui";
import { IUsers } from "./users";

export type IState = {
  ui: IUI;
  dependancies: IDependancies;
  errors: IErrors;
  status: IStatuses;
  facilities: IFacilities;
  users: IUsers;
};
