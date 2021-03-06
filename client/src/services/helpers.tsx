import React from "react";
import { MenuItem } from "@material-ui/core";
// @ts-ignore
import { intersection, slice, uniqWith, uniq } from "lodash";
import store from "../services/redux/store.js";
import {
  IService,
  IFacilityService,
  IFacilityCurrent,
  IFacilityType,
  IServiceCurrent,
  IServiceType,
  IFilterTypes
} from "./types/index.js";

export const renderOptions = (
  dependancy: any,
  entityName: string,
  withObject = false
) => {
  return dependancy.map((entity: any) => (
    <MenuItem
      key={entity.id}
      value={withObject ? entity : entity.id}
      style={{ textTransform: "capitalize" }}
    >
      {entity[entityName].replace("_", " ")}
    </MenuItem>
  ));
};

export const getServicesLeaves: any = (hierachy: Array<any>) => {
  let leaves: Array<any> = [];
  for (let leaf of hierachy) {
    leaves =
      leaf.children.length == 0
        ? [...leaves, leaf]
        : [...leaves, ...getServicesLeaves(leaf.children)];
  }
  return leaves;
};

export const getServicesHierachy: any = (
  services: Array<any>,
  allServices: Array<any> = [],
  level: number = 0
) => {
  const curServices =
    level == 0
      ? services.filter(ser => ser.service_category_id == 0)
      : [...services];

  allServices = level == 0 ? services : allServices;

  if (curServices.length == 0) {
    return [];
  }

  return curServices.map(service => ({
    ...service,
    serviceType: {},
    children: getServicesHierachy(
      allServices.filter(ser => ser.service_category_id == service.id),
      allServices,
      level + 1
    )
  }));
};

export const getServicesHierachyForRedux: any = (
  services: Array<IFacilityService>,
  allServices: Array<IServiceCurrent> = [],
  serviceTypes: Array<IServiceType> = [],
  level: number = 0
) => {
  if ((level = 0)) {
    return uniqWith(
      services
        .filter(serv => serv.service.service_category_id === 0)
        .map(ser => {
          return {
            service: ser.service,
            serviceType: serviceTypes.filter(
              (type: any) => type.id == ser.service.service_type_id
            )[0],
            facilityService: ser,
            children: [
              ...getServicesHierachyForRedux(
                services.filter(
                  s => s.service.service_category_id === ser.service.id
                ),
                allServices,
                serviceTypes,
                level + 1
              )
            ]
          } as IServiceCurrent;
        }),
      (c: IServiceCurrent, n: IServiceCurrent) => c.service.id === n.service.id
    );
  }

  if (services.length === 0) return [];

  return uniqWith(
    services.map(ser => {
      return {
        service: ser.service,
        serviceType: serviceTypes.filter(
          (type: any) => type.id == ser.service.service_type_id
        )[0],
        facilityService: ser,
        children: [
          ...getServicesHierachyForRedux(
            services.filter(
              s => s.service.service_category_id === ser.service.id
            ),
            allServices,
            serviceTypes,
            level + 1
          )
        ]
      } as IServiceCurrent;
    }),
    (c: IServiceCurrent, n: IServiceCurrent) => c.service.id === n.service.id
  );
};

export const getServicesFromLeavesForPost = (
  leaves: Array<number>,
  allServices: Array<IService> = [],
  accServices: Array<IService> = []
) => {
  for (let leaf of leaves) {
    let currentService = allServices.find(s => s.id === leaf);
    if (currentService) {
      accServices =
        currentService.service_category_id == 0
          ? [...accServices, leaf]
          : [
              ...accServices,
              leaf,
              ...getServicesFromLeavesForPost(
                allServices
                  .filter(ser => ser.id == currentService?.service_category_id)
                  .map(s => s.id),
                allServices,
                accServices
              )
            ];
    }
  }
  return uniq(accServices);
};

export const getServicesFromLeaves = (
  leaves: Array<any>,
  allServices: Array<any> = [],
  accServices: Array<any> = []
) => {
  let services: Array<any> = [...accServices];

  for (let leaf of leaves) {
    services =
      leaf.service_category_id == 0
        ? [...services, leaf]
        : [
            ...services,
            leaf,
            ...getServicesFromLeaves(
              allServices.filter(ser => ser.id == leaf.service_category_id),
              allServices,
              services
            )
          ];
  }
  return uniqWith(
    services,
    (curSer: any, nextSer: any) => curSer.id == nextSer.id
  );
};

export const groupIntersect: any = (val: Array<any>) => {
  const mapped = val.filter(
    value => value != null || typeof value != "undefined"
  );

  if (mapped.length <= 1) {
    if (mapped.length == 0) return [];
    return mapped[0].filter(
      (value: any) => value != null || typeof value != "undefined"
    );
  }

  return intersection(
    mapped[0],
    groupIntersect(slice(mapped, 1, mapped.length))
  );
};

export const hasFilterValuesForType = (
  type: string | IFilterTypes,
  values: Array<any>
) => {
  switch (type) {
    case "basic":
      return (
        values.filter(
          val =>
            val.type === "districts" ||
            val.type === "facilityTypes" ||
            val.type === "regulatoryStatuses" ||
            val.type === "operationalStatuses" ||
            val.type === "facilityOwners" ||
            val.type === "lastUpdatedRange"
        ).length > 0
      );

    default:
      return values.filter(val => val.type === type).length > 0;
  }
};

export const isLoggedIn = () => sessionStorage.getItem("token");

export const getUser = () => {
  const state: any = store ? store.getState() : null;

  const user =
    state &&
    state.users &&
    state.users.currentUser &&
    state.users.currentUser.authenticated
      ? state.users.currentUser.authDetails
      : null;

  return user ? user : { role: "public" };
};

export const OrderEntities = (
  orderBy: string,
  entities: Array<any>,
  dir = "asc" as "asc" | "desc"
) => {
  return dir == "asc"
    ? entities.sort((a, b) => (a[orderBy].trim() > b[orderBy].trim() ? 1 : -1))
    : entities.sort((a, b) => (a[orderBy].trim() > b[orderBy].trim() ? -1 : 1));
};
