import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Ac from "../../../components/atoms/Ac";
import Container from "../../../components/atoms/Container";
import RedirectOnMobile from "../../../components/atoms/RedirectOnMobile";
import PageTitle from "../../../components/molecules/PageTitle";
import { getUser } from "../../../services/helpers";
import { IState } from "../../../services/types";
import Unauthorized from "../../Error/401";
import Stepper from "../../../components/molecules/AddFacilityStepper";
import BasicDetails from "../../../components/organisms/FacilityForms/BasicDetails";

export type IForms =
  | "Basic Details"
  | "Contacts & Location"
  | "Resources"
  | "Utilities"
  | "Services"
  | "Finish";
function CreateFacility() {
  const currentUser = useSelector((state: IState) => state.users.currentUser);
  const [state, setState] = useState({
    activeForm: "Basic Details" as IForms,
    facility: null
  });
  const formSections = [
    "Basic Details",
    "Contacts & Location",
    "Resources",
    "Utilities",
    "Services",
    "Finish"
  ] as Array<IForms>;

  const setActiveForm = (formName: IForms) => {
    setState({ ...state, activeForm: formName });
    localStorage.setItem("new_facility_active_form", formName);
  };

  const onSubmitBasicDetails = (facility: any) => {
    setState({ ...state, facility });
    localStorage.setItem("new_facility_details", JSON.stringify(facility));
    setActiveForm("Contacts & Location");
  };
  return (
    <>
      <RedirectOnMobile />

      <Ac
        role={getUser().role}
        action="facility:basic_details:create"
        allowed={() => (
          <div>
            <Container style={{ paddingTop: "40px", marginBottom: "20px" }}>
              <PageTitle
                icon={<FontAwesomeIcon icon={faHospital} />}
                title="New Facility"
              />
            </Container>
            <Stepper
              active={state.activeForm}
              sections={formSections}
            ></Stepper>
            <Container>
              {state.activeForm == formSections[0] && (
                <BasicDetails
                  onCreateOrUpdate={onSubmitBasicDetails}
                ></BasicDetails>
              )}
            </Container>
          </div>
        )}
        denied={() => <Unauthorized />}
      />
    </>
  );
}

export default CreateFacility;
