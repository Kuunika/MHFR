import { Grid, Paper } from "@material-ui/core";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IFacilityCurrent, IState } from "../../../services/types";
import FormButtons from "../../atoms/FacilityFormButtons";
import { FormFooter, FormWrapper } from "./BasicDetails";
import { getResourcesSchema } from "./schema";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import swal from "sweetalert";
import TextInput from "../../atoms/TextInput";
import { postResources } from "../../../services/api";
import { getResources } from "../../../scenes/Facility/CreateFacility/helpers";

function Resources({
  facility,
  update,
  onCreateOrUpdate,
  onCancel
}: {
  update?: boolean;
  facility: IFacilityCurrent | null;
  onCreateOrUpdate: Function;
  onCancel: Function;
}) {
  const [initialValues, setInitialValues] = useState({} as any);
  const auth = useSelector((state: IState) => state.users.currentUser);
  const dependancies = useSelector((state: IState) => state.dependancies);
  useEffect(() => {
    let initial = {} as any;
    for (const resource of dependancies.resources.list) {
      let value: number | string = "";
      if (update) {
        let resourceForFacility = facility?.resources.find(
          r => r.resource_id === resource.id
        );
        value = resourceForFacility ? resourceForFacility.quantity : "";
      }
      initial[`resource_${resource.id}`] = value;
    }
    setInitialValues(initial);
    return;
  }, [dependancies, update, facility]);

  const createResources = (values: any, { setSubmitting, resetForm }: any) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      if (facility && facility.id) {
        postResources(
          getResources(values, dependancies.resources.list, facility?.id),
          token
        )
          .then(() => {
            onCreateOrUpdate(facility);
          })
          .catch(() => {
            toast.info(
              <Notification
                error
                message="Failed To Create Resources, Try Again"
              />
            );
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    }
  };

  const updateResources = (values: any, { setSubmitting, resetForm }: any) => {
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
        if (res && facility && facility.id && token) {
          setSubmitting(true);
          postResources(
            getResources(values, dependancies.resources.list, facility?.id),
            token
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
      updateResources(values, { setSubmitting, resetForm });
      return;
    }
    createResources(values, { setSubmitting, resetForm });
  };

  return (
    <Paper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={getResourcesSchema(dependancies.resources.list)}
        onSubmit={onSubmit}
        render={({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          isSubmitting,
          handleSubmit
        }) => (
          <>
            <FormWrapper>
              <Grid container spacing={3}>
                {dependancies.resources.list.map(r => (
                  <Grid
                    key={r.resource_name}
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    xl={3}
                  >
                    <TextInput
                      value={values[`resource_${r.id}`] as any}
                      label={`${r.resource_name}`}
                      placeholder={`Enter ${r.resource_name}`}
                      error={errors[`resource_${r.id}`]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched[`resource_${r.id}`] as any}
                      name={`resource_${r.id}`}
                    />
                  </Grid>
                ))}
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

export default Resources;
