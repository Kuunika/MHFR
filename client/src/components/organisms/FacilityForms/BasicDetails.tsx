import { FormControl, Grid, InputLabel, Select } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { acActions } from "../../../acl";
import { getUser, renderOptions } from "../../../services/helpers";
import { IFacilityCurrent, IState } from "../../../services/types";
import Ac, { check } from "../../atoms/Ac";
import InputError from "../../atoms/InputError";
import TextInput from "../../atoms/TextInput";
import { basicSchema } from "./schema";
import FacilityCodesForm from "./FacilityCodes";
import FormButtons from "../../atoms/FacilityFormButtons";
import {
  postBasicDetails,
  publishFacility,
  putBasicDetails
} from "../../../services/api";
import { getAuthorizedBasicDetails } from "../../../scenes/Facility/CreateFacility/helpers";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import moment from "moment";
import swal from "sweetalert";

function BasicDetails({
  onCreateOrUpdate,
  update,
  facility
}: {
  onCreateOrUpdate: Function;
  update?: boolean;
  facility?: IFacilityCurrent;
}) {
  const dependancies = useSelector((state: IState) => state.dependancies);
  const auth = useSelector((state: IState) => state.users.currentUser);
  const [initialValues, setInitialValues] = useState({
    facility_name: "",
    common_name: "",
    facility_operational_status_id: "" as string | number,
    district_id: "" as string | number,
    facility_type_id: "" as string | number,
    facility_regulatory_status_id: "" as string | number,
    facility_owner_id: "" as string | number,
    facility_date_opened: "1975-01-01",
    registration_number: "",
    published_date: "",
    facility_code_mapping: [] as Array<{
      url: string;
      code: string;
      system: string;
    }>
  });

  useEffect(() => {
    if (update && facility) {
      setInitialValues({
        facility_name: facility.facility_name || "",
        common_name: facility.common_name || "",
        facility_operational_status_id:
          facility.facility_operational_status_id || "",
        district_id: facility.district_id || "",
        facility_type_id: facility.facility_type_id || "",
        facility_regulatory_status_id:
          facility.facility_regulatory_status_id || "",
        facility_owner_id: facility.facility_owner_id || "",
        facility_date_opened: facility.facility_date_opened
          ? moment(new Date(facility.facility_date_opened)).format("YYYY-MM-DD")
          : "1975-01-01",
        registration_number: facility.registration_number || "",
        published_date: facility.published_date || "",
        facility_code_mapping: facility.facility_code_mapping || []
      });
    }
  }, [update, facility]);

  const isDisabled = (action: acActions): boolean => {
    const role = getUser().role;
    return !check(undefined, role, action);
  };

  const createFacility = (values: any, { setSubmitting, resetForm }: any) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      postBasicDetails(getAuthorizedBasicDetails(values, getUser().role), token)
        .then(res => {
          let createdFacility = res.data;
          publishFacility(
            {
              id: createdFacility.id,
              district_id: createdFacility.district_id
            },
            token || ""
          ).then(() => {
            onCreateOrUpdate(createdFacility);
          });
        })
        .catch(() => {
          toast.info(
            <Notification
              error
              message="Failed To Create Facility, Try Again"
            />
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const updateFacility = (values: any, { setSubmitting, resetForm }: any) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      swal({
        icon: "warning",
        title: `Are you sure you want save these changes?`,
        buttons: {
          cancel: { text: "Cancel", closeModal: true, visible: true },
          confirm: { text: "Save" }
        },
        closeOnClickOutside: false
      }).then((res: any) => {
        if (res && facility && facility.id) {
          setSubmitting(true);
          putBasicDetails(
            getAuthorizedBasicDetails(values, getUser().role),
            facility.id,
            token as any
          )
            .then(() => {
              toast.info(
                <Notification message="Facility Updated Successfully" />
              );
              onCreateOrUpdate();
            })
            .catch(() => {
              toast.info(
                <Notification
                  error
                  message="Failed To Update Facility, Try Again"
                />
              );
            })
            .finally(() => {
              setSubmitting(false);
            });
        }
      });
    }
  };

  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (!auth.authenticated) {
      toast.info(
        <Notification
          error
          message="You are not Authorised to create/update a facility, Please Login"
        />
      );
      setSubmitting(false);
      return;
    }
    if (update) {
      updateFacility(values, { setSubmitting, resetForm });
      return;
    }
    createFacility(values, { setSubmitting, resetForm });
  };

  const onCancel = () => {};
  return (
    <Paper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={basicSchema}
        onSubmit={onSubmit}
        render={({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          setFieldValue,
          isSubmitting,
          handleSubmit
        }) => (
          <>
            <FormWrapper>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextInput
                    value={values.facility_name}
                    label="Facility Name"
                    placeholder="Enter Facility Name"
                    error={errors.facility_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.facility_name}
                    name="facility_name"
                    disabled={isDisabled("facility:basic_details:create")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextInput
                    value={values.common_name}
                    name="common_name"
                    label="Common Name"
                    placeholder="Enter Common Name"
                    error={errors.common_name}
                    touched={touched.common_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isDisabled("facility:basic_details:create")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <InputLabel htmlFor="facilityType">Facility Type</InputLabel>
                  <FormControl className="mfl-max-width">
                    <Select
                      disabled={isDisabled(
                        "facility:basic_details:facility_type"
                      )}
                      name="facility_type_id"
                      data-test="facilityType"
                      value={values.facility_type_id}
                      onBlur={handleBlur}
                      error={
                        (errors.facility_type_id && touched.facility_type_id) ||
                        false
                      }
                      onChange={handleChange}
                    >
                      {renderOptions(
                        dependancies.facilityTypes.list,
                        "facility_type"
                      )}
                    </Select>
                    {errors.facility_type_id && touched.facility_type_id && (
                      <InputError
                        error={errors.facility_type_id}
                        for="facility_type"
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <InputLabel>Operational Status</InputLabel>
                  <FormControl className="mfl-max-width">
                    <Select
                      disabled={isDisabled("facility:basic_details:create")}
                      data-test="operationalStatus"
                      name="facility_operational_status_id"
                      onBlur={handleBlur}
                      error={
                        (errors.facility_operational_status_id &&
                          touched.facility_operational_status_id) ||
                        false
                      }
                      onChange={handleChange}
                      value={values.facility_operational_status_id}
                    >
                      {renderOptions(
                        dependancies.operationalStatuses.list,
                        "facility_operational_status"
                      )}
                    </Select>
                    {errors.facility_operational_status_id &&
                      touched.facility_operational_status_id && (
                        <InputError
                          error={errors.facility_operational_status_id}
                          for="operationalStatus"
                        />
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <InputLabel>Regulatory Status</InputLabel>
                  <FormControl className="mfl-max-width">
                    <Select
                      disabled={isDisabled(
                        "facility:basic_details:licensing_status"
                      )}
                      name="facility_regulatory_status_id"
                      data-test="regulatoryStatus"
                      onBlur={handleBlur}
                      error={
                        (errors.facility_regulatory_status_id &&
                          touched.facility_regulatory_status_id) ||
                        false
                      }
                      onChange={handleChange}
                      value={values.facility_regulatory_status_id}
                    >
                      {renderOptions(
                        dependancies.regulatoryStatuses.list,
                        "facility_regulatory_status"
                      )}
                    </Select>

                    {errors.facility_regulatory_status_id &&
                      touched.facility_regulatory_status_id && (
                        <InputError
                          error={errors.facility_regulatory_status_id}
                          for="regulatoryStatus"
                        />
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <InputLabel>Facility Owner</InputLabel>
                  <FormControl className="mfl-max-width">
                    <Select
                      disabled={isDisabled("facility:basic_details:create")}
                      data-test="facilityOwner"
                      name="facility_owner_id"
                      onBlur={handleBlur}
                      error={
                        (errors.facility_owner_id &&
                          touched.facility_owner_id) ||
                        false
                      }
                      onChange={handleChange}
                      value={values.facility_owner_id}
                    >
                      {renderOptions(
                        dependancies.owners.list,
                        "facility_owner"
                      )}
                    </Select>
                    {errors.facility_owner_id && touched.facility_owner_id && (
                      <InputError
                        error={errors.facility_owner_id}
                        for="facility_owner"
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <InputLabel>District</InputLabel>
                  <FormControl className="mfl-max-width">
                    <Select
                      disabled={isDisabled("facility:basic_details:create")}
                      data-test="district"
                      onBlur={handleBlur}
                      name="district_id"
                      error={
                        (errors.district_id && touched.district_id) || false
                      }
                      onChange={handleChange}
                      value={values.district_id}
                    >
                      {renderOptions(
                        dependancies.districts.list,
                        "district_name"
                      )}
                    </Select>
                    {errors.district_id && touched.district_id && (
                      <InputError error={errors.district_id} for="district" />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3}>
                  <TextInput
                    disabled={isDisabled(
                      "facility:basic_details:registration_number"
                    )}
                    value={values.registration_number}
                    name="registration_number"
                    label="Registration Number"
                    placeholder="Enter Registration Number"
                    error={errors.registration_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.registration_number}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3}>
                  <FormControl className="mfl-max-width">
                    <TextInput
                      disabled={isDisabled("facility:basic_details:create")}
                      name="date_opened"
                      label="Date Opened"
                      value={values.facility_date_opened}
                      error={
                        errors.facility_date_opened &&
                        touched.facility_date_opened
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched.facility_date_opened}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  {
                    <Ac
                      role={getUser().role}
                      action="facility:contact_location_details:create"
                      allowed={() => (
                        <FacilityCodesForm
                          systems={values.facility_code_mapping}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    />
                  }
                </Grid>
              </Grid>
            </FormWrapper>
            <FormFooter>
              <FormButtons
                handleSubmit={handleSubmit}
                handleCancel={onCancel}
                saveBtnText={update ? "Save" : "Next"}
                isSubmitting={isSubmitting}
              />
            </FormFooter>
          </>
        )}
      />
    </Paper>
  );
}

export default BasicDetails;

export const FormWrapper = styled.div`
  padding: 3rem;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: end;
`;
