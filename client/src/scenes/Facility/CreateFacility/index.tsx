import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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
import FinishWindow from "../../../components/molecules/FacilityAddFinish";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export type IForms =
  | "Basic Details"
  | "Contacts & Location"
  | "Resources"
  | "Utilities"
  | "Services"
  | "Finish";
function CreateFacility() {
  const [state, setState] = useState({
    activeForm: "Basic Details" as IForms,
    facility: null
  });
  const history = useHistory();
  const formSections = [
    "Basic Details",
    "Contacts & Location",
    "Resources",
    "Utilities",
    "Services",
    "Finish"
  ] as Array<IForms>;

  useEffect(() => {
    let unfinishedFacility = localStorage.getItem(
      "new_facility_details"
    ) as any;
    if (unfinishedFacility) {
      unfinishedFacility = JSON.parse(unfinishedFacility);
      swal({
        icon: "info",
        title: `You Did Not Finish Adding the Facility with name ${unfinishedFacility?.facility_name}`,
        text:
          "Press Continue to continue from where you stopped or cancel to restart",
        // @ts-ignore
        buttons: {
          cancel: "Cancel",
          confirm: "Continue"
        },
        closeOnClickOutside: false
      }).then(async (response: any) => {
        if (response) {
          setState({
            ...state,
            facility: unfinishedFacility,
            activeForm:
              (localStorage.getItem("ew_facility_active_form") as IForms) ||
              "Basic Details"
          });
          return;
        }
        localStorage.clear();
      });
    }
  }, []);

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

  const onCancel = () => {
    // @ts-ignore
    swal({
      icon: "warning",
      title: "Are You Sure You Want To Cancel Facility Add ?",
      text: "All unsaved data will be lost",
      // @ts-ignore
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then(async (response: any) => {
      if (response) {
        history.push("/facilities");
        localStorage.clear();
      }
    });
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
                  onCancel={onCancel}
                ></BasicDetails>
              )}
              {state.activeForm == formSections[1] && (
                <ContactDetails
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Resources")
                  }
                  onCancel={onCancel}
                ></ContactDetails>
              )}
              {state.activeForm == formSections[2] && (
                <Resources
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Utilities")
                  }
                  onCancel={onCancel}
                ></Resources>
              )}
              {state.activeForm == formSections[3] && (
                <Utilities
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Services")
                  }
                  onCancel={onCancel}
                ></Utilities>
              )}
              {state.activeForm == formSections[4] && (
                <Services
                  facility={state.facility}
                  onCreateOrUpdate={(facility: any) =>
                    onSubmitDetails(facility, "Finish")
                  }
                  onCancel={onCancel}
                ></Services>
              )}
              {state.activeForm == formSections[5] && (
                <FinishWindow facility={state.facility} errors={[]} />
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
