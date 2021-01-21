import { Checkbox, Chip, Collapse, Grid, Paper } from "@material-ui/core";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IFacilityCurrent, IState, IUtility } from "../../../services/types";
import FormButtons from "../../atoms/FacilityFormButtons";
import { FormFooter, FormWrapper } from "./BasicDetails";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import swal from "sweetalert";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUtilities } from "../../../scenes/Facility/CreateFacility/helpers";
import { postUtilities } from "../../../services/api";

function Utilities({
  facility,
  update,
  onCreateOrUpdate
}: {
  update?: boolean;
  facility: IFacilityCurrent | null;
  onCreateOrUpdate: Function;
}) {
  const [initialValues, setInitialValues] = useState({ utilities: [] } as any);
  const { utilities } = useSelector((state: IState) => state.dependancies);
  const auth = useSelector((state: IState) => state.users.currentUser);
  const [activeUtilityType, setactiveUtilityType] = useState(0);

  useEffect(() => {
    if (update && facility) {
      setInitialValues({
        utilities: facility.utilities.map(u => u.utility.id)
      });
    }
  }, [facility, update]);

  const onClickUtilityType = (type: number) => {
    if (type === activeUtilityType) return setactiveUtilityType(0);
    setactiveUtilityType(type);
  };

  const createUtilities = (values: any, { setSubmitting, resetForm }: any) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      if (facility && facility.id) {
        postUtilities(getUtilities(values.utilities, facility?.id), token)
          .then(() => {
            onCreateOrUpdate(facility);
          })
          .catch(() => {
            toast.info(
              <Notification
                error
                message="Failed To Create Utilities, Try Again"
              />
            );
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    }
  };

  const updateUtilities = (values: any, { setSubmitting, resetForm }: any) => {
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
          postUtilities(getUtilities(values.utilities, facility?.id), token)
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
      updateUtilities(values, { setSubmitting, resetForm });
      return;
    }
    createUtilities(values, { setSubmitting, resetForm });
  };
  const onCancel = () => {};

  const onUtilityClick = (utility: IUtility) => {
    if (initialValues.utilities.includes(utility.id)) {
      setInitialValues((val: any) => ({
        utilities: val.utilities.filter((u: any) => u != utility.id)
      }));
      return;
    }
    setInitialValues((val: any) => ({
      utilities: [...val.utilities, utility.id]
    }));
  };
  return (
    <Paper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
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
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  {utilities.types.map((type: any) => (
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                      <h3
                        onClick={() => onClickUtilityType(type.id)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "bold",
                          borderBottom: "1px solid #ededed",
                          padding: "10px 5px",
                          cursor: "pointer"
                        }}
                      >
                        <div>{type.utility_type}</div>
                        <div>
                          {activeUtilityType == type.id ? (
                            <FontAwesomeIcon
                              icon={faMinusCircle}
                            ></FontAwesomeIcon>
                          ) : (
                            <FontAwesomeIcon
                              icon={faPlusCircle}
                            ></FontAwesomeIcon>
                          )}
                        </div>
                      </h3>
                      <Collapse in={activeUtilityType == type.id}>
                        <Grid container spacing={3}>
                          {utilities.list
                            .filter(
                              (util: any) => util.utility_type_id === type.id
                            )
                            .map((utility: any) => (
                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                xl={6}
                                key={`utilities${utility.id}`}
                              >
                                <div style={{ margin: "0.5re" }}>
                                  <Checkbox
                                    value={`${utility.id}`}
                                    checked={values.utilities.includes(
                                      utility.id
                                    )}
                                    onChange={() => onUtilityClick(utility)}
                                    color="primary"
                                  />
                                </div>
                                {utility.utility_name}
                              </Grid>
                            ))}
                        </Grid>
                      </Collapse>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <h2
                    style={{
                      fontWeight: "bold",
                      borderBottom: "1px solid #ededed",
                      padding: "10px 5px"
                    }}
                  >
                    <div>Selected Utilities</div>
                  </h2>
                  {utilities.types.map((type: any) => (
                    <div>
                      <h3
                        onClick={() => onClickUtilityType(type.id)}
                        style={{
                          fontWeight: "bold",
                          padding: "5px 5px",
                          marginBottom: "10px"
                        }}
                      >
                        <div>{type.utility_type}</div>
                      </h3>
                      <div
                        style={{
                          padding: "5px 10px",
                          marginBottom: "10px"
                        }}
                      >
                        <Grid container spacing={3}>
                          {utilities.list
                            .filter(
                              (util: any) =>
                                util.utility_type_id === type.id &&
                                values.utilities.includes(util.id)
                            )
                            .map((utility: any) => (
                              <Chip
                                key={utility.utility_name}
                                label={utility.utility_name}
                              />
                            ))}
                        </Grid>
                      </div>
                    </div>
                  ))}
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

export default Utilities;
