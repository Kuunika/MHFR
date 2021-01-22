import React, { useState } from "react";
import { Collapse, Grid } from "@material-ui/core";
import SectionTitle from "../atoms/FacilityViewSectionTitle";
import FacilityDetail from "../atoms/FacilityDetail";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFilter,
  faMobile,
  faTrash,
  faCogs,
  faMinusCircle,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { uniq, uniqWith, isEqual } from "lodash";
import { IServiceCurrent, IServiceType } from "../../services/types";

library.add(faBolt, faFilter, faMobile, faTrash, faCogs);

function FacilityDetails(props: Props) {
  const { services } = props;
  const [activeServiceType, setactiveServiceType] = useState(
    [] as Array<number>
  );

  const levelStyles = [
    {
      fontSize: "16px",
      padding: "5px 0"
    },
    {
      borderTop: "1px #f1f1f1 solid",
      marginLeft: "11px",
      padding: "5px 0",
      marginTop: "5px"
    },
    { color: "#7d7d7d", marginLeft: "12px", fontSize: "12px" }
  ];

  const getServiceTypeIcon = (serviceType: string) => {
    switch (serviceType.toUpperCase()) {
      case "Clinical Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Therapeutical Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Prosthetics and Medical Devices Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Nutrition".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Community Health Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Reproductive and child health Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Vaccination".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      case "Diagnostics Services".toUpperCase():
        return <FontAwesomeIcon icon={faBolt} />;
      default:
        return <FontAwesomeIcon icon={faBolt} />;
    }
  };

  const serviceTypes: Array<IServiceType> =
    services && services.length > 0
      ? uniqWith(
          services.map(ser => ser.serviceType),
          isEqual
        )
      : [];
  const onClickServiceType = (type: number) => {
    if (activeServiceType.includes(type))
      return setactiveServiceType(activeServiceType.filter(n => n != type));
    setactiveServiceType([...activeServiceType, type]);
  };
  return (
    <Grid container data-test="servicesContainer" spacing={3}>
      {serviceTypes.map(type => {
        return (
          <Grid item key={type.id} xs={12} sm={6} md={6} xl={6}>
            <h3
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
                {activeServiceType.includes(type.id) ? (
                  <FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                )}
              </div>
            </h3>
            <Collapse in={activeServiceType.includes(type.id)}>
              {services
                .filter(ser => ser.service.service_type_id === type.id)
                .map((service: any) => (
                  <ServiceNode key={`services${service.id}`} option={service} />
                ))}
            </Collapse>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default FacilityDetails;

type Props = {
  services: Array<IServiceCurrent>;
};
const ServiceNode = ({ option }: { option: IServiceCurrent }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {option.children.length === 0 ? (
        <LastChildNode service={option} />
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
                <ServiceNode key={o.service.id} option={o} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const LastChildNode = ({ service }: { service: IServiceCurrent }) => {
  return (
    <div style={{ marginLeft: "1rem", display: "flex", alignItems: "center" }}>
      {service.service.service_name}
    </div>
  );
};

const ParentNode = ({
  service,
  onClick,
  open
}: {
  service: IServiceCurrent;
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
      <div>{service.service.service_name}</div>
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
