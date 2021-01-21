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
import ContactDetails from "../../../components/organisms/FacilityForms/ContactDetails";
import Resources from "../../../components/organisms/FacilityForms/Resources";
import Utilities from "../../../components/organisms/FacilityForms/Utilities";
import Services from "../../../components/organisms/FacilityForms/Services";

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
    activeForm: "Services" as IForms,
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

  const onSubmitDetails = (facility: any, nextForm: IForms) => {
    if (nextForm == "Contacts & Location") {
      setState({ ...state, facility });
      localStorage.setItem("new_facility_details", JSON.stringify(facility));
    }
    setActiveForm(nextForm);
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
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Contacts & Location")
                  }
                ></BasicDetails>
              )}
              {state.activeForm == formSections[1] && (
                <ContactDetails
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Resources")
                  }
                ></ContactDetails>
              )}
              {state.activeForm == formSections[2] && (
                <Resources
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Utilities")
                  }
                ></Resources>
              )}
              {state.activeForm == formSections[3] && (
                <Utilities
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Services")
                  }
                ></Utilities>
              )}
              {state.activeForm == formSections[4] && (
                <Services
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Services")
                  }
                ></Services>
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
