import * as yup from "yup";
import { check } from "../../atoms/Ac";
import { getUser } from "../../../services/helpers";

const REQUIRED_MESSAGE = "You can't leave this field blank";
const PHONE_MIN_MESSAGE = "Invalid phone number";
const INVALID_NUM_MESSAGE = "Invalid number";
const INVALID_TEXT = "This is not a valid text";

export const contactSchema: yup.ObjectSchema<any> = yup.object().shape({
  postal_address: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(5, "Postal Address is too short")
    .required(REQUIRED_MESSAGE),
  physical_address: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Physical Address is too short")
    .required(REQUIRED_MESSAGE),
  contact_person_fullname: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Contact Name is too short")
    .required(REQUIRED_MESSAGE),
  contact_person_email: yup
    .string()
    .typeError(INVALID_TEXT)
    .email("Invalid Email format")
    .required(REQUIRED_MESSAGE),
  contact_person_phone: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(8, PHONE_MIN_MESSAGE)
    .max(10, PHONE_MIN_MESSAGE)
    .matches(/^[0]{1}?[1,2,8,9]{1}?[0-9]{6,8}$/im, "Invalid Phone number")
    .required(REQUIRED_MESSAGE),
  catchment_area: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Catchment Area is too short")
    .required(REQUIRED_MESSAGE),
  catchment_population: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .integer()
    .required(REQUIRED_MESSAGE),
  longitude: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .positive()
    .required(REQUIRED_MESSAGE),
  latitude: yup
    .number()
    .typeError(INVALID_NUM_MESSAGE)
    .negative()
    .required(REQUIRED_MESSAGE)
});

export const basicSchema: yup.ObjectSchema<any> = yup.object().shape({
  facility_name: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Facility name must have atleast 3 characters")
    .required(REQUIRED_MESSAGE),
  common_name: yup
    .string()
    .typeError(INVALID_TEXT)
    .min(3, "Common name must have atleast 3 characters")
    .required(REQUIRED_MESSAGE),
  facility_type_id: yup
    .number()
    .typeError(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE)
    .min(1, "Please select facility type"),
  facility_operational_status_id: yup
    .number()
    .typeError(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE)
    .min(1, "Please select facility operational status"),
  facility_regulatory_status_id: yup
    .number()
    .typeError(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE)
    .min(1, "Please select facility regulatory status"),
  facility_owner_id: yup
    .number()
    .typeError(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE)
    .min(1, "Please select facility owner"),
  district_id: yup
    .number()
    .typeError(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE)
    .min(1, "Please select a district")
});

export const getResourcesSchema: any = (resources: any) => {
  let validationFields: any = {};

  for (let resource of resources) {
    validationFields[`resource_${resource.id}`] = yup
      .number()
      .typeError(INVALID_NUM_MESSAGE)
      .moreThan(-1, "Must be a number")
      .required(REQUIRED_MESSAGE);
  }
  return yup.object().shape(validationFields);
};
