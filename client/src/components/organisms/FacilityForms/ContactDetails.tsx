import Paper from "@material-ui/core/Paper";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IFacility, IFacilityCurrent, IState } from "../../../services/types";
import { FormFooter, FormWrapper } from "./BasicDetails";
import { contactSchema } from "./schema";
import FormButtons from "../../atoms/FacilityFormButtons";
import { Grid } from "@material-ui/core";
import TextInput from "../../atoms/TextInput";
import LocationPickerModal from "../../molecules/LocationPickerModal";
import { postContactDetails, putContactDetails } from "../../../services/api";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import { getContactDetails } from "../../../scenes/Facility/CreateFacility/helpers";
import swal from "sweetalert";

function ContactDetails({
  facility,
  update,
  onCreateOrUpdate
}: {
  update?: boolean;
  facility: IFacilityCurrent | null;
  onCreateOrUpdate: Function;
}) {
  const auth = useSelector((state: IState) => state.users.currentUser);
  const [initialValues, setInitialValues] = useState({
    postal_address: "",
    physical_address: "",
    contact_person_fullname: "",
    contact_person_email: "",
    contact_person_phone: "",
    catchment_area: "",
    catchment_population: "" as number | string,
    longitude: "",
    latitude: ""
  });

  useEffect(() => {
    if (update && facility) {
      setInitialValues({
        postal_address: facility.addresses?.postal_address || "",
        physical_address: facility.addresses?.physical_address || "",
        contact_person_fullname:
          facility.contactPeople?.contact_person_fullname || "",
        contact_person_email:
          facility.contactPeople?.contact_person_email || "",
        contact_person_phone:
          facility.contactPeople?.contact_person_phone || "",
        catchment_area: facility.locations?.catchment_area || "",
        catchment_population: facility.locations?.catchment_population || "",
        longitude: facility.geolocations?.longitude || "",
        latitude: facility.geolocations?.latitude || ""
      });
    }
  }, [update, facility]);

  const createContactDetails = (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    let token = sessionStorage.getItem("token");
    if (token && facility && facility.id) {
      postContactDetails(getContactDetails(values, facility?.id), token)
        .then(res => {
          onCreateOrUpdate(res.data);
        })
        .catch(() => {
          toast.info(
            <Notification
              error
              message="Failed To Create Facility Contact Details, Try Again"
            />
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const updateContactDetails = (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    let token = sessionStorage.getItem("token");

    swal({
      icon: "warning",
      title: `Are you sure you want save these changes?`,
      buttons: {
        cancel: { text: "Cancel", closeModal: true, visible: true },
        confirm: { text: "Save" }
      },
      closeOnClickOutside: false
    }).then(res => {
      if (res && facility && facility.id && token) {
        putContactDetails(getContactDetails(values, facility?.id), token)
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
                message="Failed To Update Facility Contact Details, Try Again"
              />
            );
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
      setSubmitting(false);
    });
  };
  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
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
      updateContactDetails(values, { setSubmitting, resetForm });
      return;
    }
    createContactDetails(values, { setSubmitting, resetForm });
  };

  const onCancel = () => {};

  const setCoordinates = (
    position: { lat: any; lng: any },
    setFieldValue: Function
  ) => {
    setFieldValue("latitude", position.lat);
    setFieldValue("longitude", position.lng);
  };
  return (
    <Paper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={contactSchema}
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
                    value={values.postal_address}
                    name="postal_address"
                    label="Enter Facility Postal Address"
                    placeholder="Enter Facility Postal Address"
                    error={errors.postal_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.postal_address}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextInput
                    value={values.physical_address}
                    name="physical_address"
                    label="Facility Physical Address"
                    placeholder="Enter Facility Physical Address"
                    error={errors.physical_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.physical_address}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3}>
                  <TextInput
                    value={values.contact_person_fullname}
                    name="contact_person_fullname"
                    label="Contact Person Name"
                    placeholder="Contact Person Name"
                    error={errors.contact_person_fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.contact_person_fullname}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3}>
                  <TextInput
                    value={values.contact_person_phone}
                    name="contact_person_phone"
                    label="Contact Person Phone Number"
                    placeholder="Contact Person Phone Number"
                    error={errors.contact_person_phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.contact_person_phone}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextInput
                    value={values.contact_person_email}
                    name="contact_person_email"
                    label="Contact Person Email"
                    placeholder="Contact Person Email"
                    error={errors.contact_person_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.contact_person_email}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3}>
                  <TextInput
                    value={values.catchment_area}
                    name="catchment_area"
                    label="Catchment Area"
                    placeholder="Enter Catchment Area"
                    error={errors.catchment_area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.catchment_area}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} xl={3}>
                  <TextInput
                    value={values.catchment_population}
                    name="catchment_population"
                    label="Estimated Catchment Population"
                    placeholder="Estimated Catchment Population"
                    error={errors.catchment_population}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.catchment_population}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                      <TextInput
                        value={values.latitude}
                        name="latitude"
                        label="Facility Latitude"
                        placeholder="Facility Latitude"
                        error={errors.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.latitude}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                      <TextInput
                        value={values.longitude}
                        name="longitude"
                        label="Facility Longitude"
                        placeholder="Facility Longitude"
                        error={errors.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.longitude}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} xl={4}>
                      <LocationPickerModal
                        onSave={(pos: any) =>
                          setCoordinates(pos, setFieldValue)
                        }
                      />
                    </Grid>
                  </Grid>
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

export default ContactDetails;
