import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Chip, Collapse, Grid, Paper } from "@material-ui/core";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  IFacilityCurrent,
  IServiceCurrent,
  IServiceHierachy,
  IState
} from "../../../services/types";
import FormButtons from "../../atoms/FacilityFormButtons";
import { FormFooter, FormWrapper } from "./BasicDetails";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import swal from "sweetalert";
import { postServices } from "../../../services/api";
import { getServices } from "../../../scenes/Facility/CreateFacility/helpers";

function Services({
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
  const [initialValues, setInitialValues] = useState({ services: [] } as any);
  const { services } = useSelector((state: IState) => state.dependancies);
  const auth = useSelector((state: IState) => state.users.currentUser);
  const [activeServiceType, setactiveServiceType] = useState(0);

  const getServicesLeaves = (services: Array<IServiceCurrent>) => {
    let leaves = [] as Array<number>;
    for (const service of services) {
      leaves = [...leaves, ...getServiceLeaves(service)];
    }
    return leaves;
  };
  const getServiceLeaves = (
    currentService: IServiceCurrent,
    servicesMemory = [] as Array<number>
  ) => {
    if (currentService.children.length === 0) {
      return [...servicesMemory, currentService.service.id];
    }
    for (const child of currentService.children) {
      servicesMemory = [...getServiceLeaves(child, servicesMemory)];
    }
    return servicesMemory;
  };

  useEffect(() => {
    if (update && facility) {
      setInitialValues({
        services: getServicesLeaves(facility.services)
      });
    }
  }, [facility, update]);

  const onClickServiceType = (type: number) => {
    if (type === activeServiceType) return setactiveServiceType(0);
    setactiveServiceType(type);
  };

  const onServiceClick = (utilityId: number | string) => {
    if (initialValues.services.includes(utilityId)) {
      setInitialValues((val: any) => ({
        services: val.services.filter((u: any) => u != utilityId)
      }));
      return;
    }
    setInitialValues((val: any) => ({
      services: [...val.services, utilityId]
    }));
  };
  const createServices = (values: any, { setSubmitting, resetForm }: any) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      if (facility && facility.id) {
        postServices(
          getServices(values.services, facility?.id, services.list),
          token
        )
          .then(() => {
            onCreateOrUpdate(facility);
          })
          .catch(() => {
            toast.info(
              <Notification
                error
                message="Failed To Create Services, Try Again"
              />
            );
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    }
  };

  const updateServices = (values: any, { setSubmitting, resetForm }: any) => {
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
          postServices(
            getServices(values.services, facility?.id, services.list),
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
      updateServices(values, { setSubmitting, resetForm });
      return;
    }
    createServices(values, { setSubmitting, resetForm });
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
                  {services.types.map((type: any) => (
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                      <h3
                        id={`menu-${type.service_type.replace(/ /g, "")}`}
                        onClick={() => onClickServiceType(type.id)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "bold",
                          borderBottom: "1px solid #ededed",
                          padding: "10px 5px",
                          cursor: "pointer"
                        }}
                      >
                        <div>{type.service_type}</div>
                        <div>
                          {activeServiceType == type.id ? (
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
                      <Collapse in={activeServiceType == type.id}>
                        {services.hierachy
                          .filter(ser => ser.service_type_id === type.id)
                          .map((service: any) => (
                            <SelectionNode
                              key={`services${service.id}`}
                              option={service}
                              onChange={onServiceClick}
                              value={values.services}
                            />
                          ))}
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
                    <div>Selected Services</div>
                  </h2>
                  {services.types.map((type: any) => (
                    <div>
                      <h3
                        onClick={() => onClickServiceType(type.id)}
                        style={{
                          fontWeight: "bold",
                          padding: "5px 5px",
                          marginBottom: "10px"
                        }}
                      >
                        <div>{type.service_type}</div>
                      </h3>
                      <div
                        style={{
                          padding: "5px 10px",
                          marginBottom: "10px"
                        }}
                      >
                        <Grid container spacing={3}>
                          {services.list
                            .filter(
                              (ser: any) =>
                                ser.service_type_id === type.id &&
                                values.services.includes(ser.id)
                            )
                            .map((service: any) => (
                              <div style={{ margin: "0.2rem" }}>
                                <Chip
                                  key={service.service_name}
                                  label={service.service_name}
                                />
                              </div>
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

export default Services;

const SelectionNode = ({
  option,
  onChange,
  value
}: {
  option: IServiceHierachy;
  onChange: Function;
  value: Array<number>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {option.children.length === 0 ? (
        <LastChildNode
          onClick={onChange}
          checked={value.includes(option.id)}
          service={option}
        />
      ) : (
        <div style={{ marginLeft: "1rem" }}>
          <ParentNode
            onClick={() => setOpen(!open)}
            service={option}
            open={open}
          />
          {open && (
            <div style={{ marginLeft: "1rem" }}>
              {option.children.map(o => (
                <SelectionNode
                  key={o.id}
                  option={o}
                  onChange={onChange}
                  value={value}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const LastChildNode = ({
  service,
  onClick,
  checked
}: {
  service: IServiceHierachy;
  onClick: Function;
  checked: boolean;
}) => {
  return (
    <div style={{ marginLeft: "1rem", display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "0.5rem", marginLeft: "-9px" }}>
        <Checkbox
          data-test={`check${service.service_type_id + "".replace(/ /g, "")}`}
          value={`${service.id}`}
          checked={checked}
          onChange={() => onClick(service.id)}
          color="primary"
        />
      </div>
      {service.service_name}
    </div>
  );
};
const ParentNode = ({
  service,
  onClick,
  open
}: {
  service: IServiceHierachy;
  onClick: Function;
  open: boolean;
}) => {
  return (
    <div
      onClick={onClick as any}
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ededed",
        padding: "5px 5px",
        cursor: "pointer",
        fontSize: "1rem"
      }}
    >
      <div>{service.service_name}</div>
      <div>
        {open ? (
          <FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
        )}
      </div>
    </div>
  );
};
