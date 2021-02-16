import React, { useState } from "react";
import styled from "styled-components";
import SelectField from "../atoms/FilterSelect";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { IFilterValues } from "../../services/types";

function FacilityBasicFilterTab(props: Props) {
  const dateFormat = "MMM YYYY";
  const rangeDFormat = "YYYY-MM";

  const lastUpdatedRanges = [
    {
      id: 0,
      type: "lastUpdatedRange",
      label: `${moment()
        .subtract(4, "months")
        .format(dateFormat)} - ${moment().format(dateFormat)}`,
      values: [
        moment()
          .subtract(4, "months")
          .format(rangeDFormat),
        moment()
          .add(1, "months")
          .format(rangeDFormat)
      ],
      range: true
    },
    {
      id: 1,
      type: "lastUpdatedRange",
      label: `${moment()
        .subtract(8, "months")
        .format(dateFormat)} - ${moment()
        .subtract(5, "months")
        .format(dateFormat)}`,
      values: [
        moment()
          .subtract(8, "months")
          .format(rangeDFormat),
        moment()
          .subtract(4, "months")
          .format(rangeDFormat)
      ],
      range: true
    },
    {
      id: 2,
      type: "lastUpdatedRange",
      label: `${moment()
        .subtract(12, "months")
        .format(dateFormat)} - ${moment()
        .subtract(9, "months")
        .format(dateFormat)}`,
      values: [
        moment()
          .subtract(12, "months")
          .format(rangeDFormat),
        moment()
          .subtract(8, "months")
          .format(rangeDFormat)
      ],
      range: true
    },
    {
      id: 4,
      type: "lastUpdatedRange",
      label: `< ${moment()
        .subtract(13, "months")
        .format(dateFormat)}`,
      values: [
        moment("1970-01"),
        moment()
          .subtract(12, "months")
          .format(rangeDFormat)
      ],
      range: true
    }
  ] as Array<IFilterValues>;

  const [values, setValues] = useState({
    districts: -1,
    facilityTypes: -1,
    regulatoryStatuses: -1,
    operationalStatuses: -1,
    facilityOwners: -1,
    lastUpdatedRange: -1
  });

  const { dependancies } = props;
  const districts = dependancies.districts.list.map((district: any) => {
    return {
      type: "districts",
      id: district.id,
      label: district.district_name
    };
  });

  const facilityTypes = dependancies.facilityTypes.list.map((type: any) => {
    return {
      type: "facilityTypes",
      id: type.id,
      label: type.facility_type
    };
  });

  const regulatoryStatuses = dependancies.regulatoryStatuses.list.map(
    (status: any) => {
      return {
        type: "regulatoryStatuses",
        id: status.id,
        label: status.facility_regulatory_status
      };
    }
  );

  const operationalStatuses = dependancies.operationalStatuses.list.map(
    (status: any) => {
      return {
        type: "operationalStatuses",
        id: status.id,
        label: status.facility_operational_status
      };
    }
  );

  const facilityOwners = dependancies.owners.list.map((owner: any) => {
    return {
      type: "facilityOwners",
      id: owner.id,
      label: owner.facility_owner
    };
  });

  const getValue: any = (model: any, type: any, value: any) =>
    value == -1 ? { type, id: -1 } : model[value];

  const onChange = (e: any, model: Array<any>, modelName: string) => {
    let value = getValue(model, modelName, e.target.value);
    props.onAddFilter(value);
    setValues({ ...values, [modelName]: e.target.value });
  };
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By District"
            values={values}
            model={districts}
            modelName="districts"
            onChange={onChange}
            data-test="districts"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Type"
            values={values}
            model={facilityTypes}
            modelName="facilityTypes"
            onChange={onChange}
            data-test="facilityTypes"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Regulatory Status"
            values={values}
            model={regulatoryStatuses}
            modelName="regulatoryStatuses"
            onChange={onChange}
            data-test="regulatoryStatuses"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Operational Status"
            values={values}
            model={operationalStatuses}
            modelName="operationalStatuses"
            onChange={onChange}
            data-test="operationalStatuses"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Ownership"
            values={values}
            model={facilityOwners}
            modelName="facilityOwners"
            onChange={onChange}
            data-test="facilityOwners"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SelectField
            label="Filter By Last Updated"
            values={values}
            model={lastUpdatedRanges}
            modelName="lastUpdatedRange"
            onChange={onChange}
            data-test="lastUpdatedRange"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default FacilityBasicFilterTab;

type Props = {
  dependancies: any;
  filterOptions: any;
  onAddFilter: any;
};

const Container = styled.div`
  padding: 15px 30px;
`;
