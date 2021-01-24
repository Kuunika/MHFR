import React, { useEffect, useState } from "react";
import { acActions } from "../../../acl";
import Ac from "../../../components/atoms/Ac";
import Container from "../../../components/atoms/Container";
import RedirectOnMobile from "../../../components/atoms/RedirectOnMobile";
import { getUser } from "../../../services/helpers";
import Unauthorized from "../../Error/401";
import { FacilityPages as pages } from "../../../services/utils";
import { useHistory, useParams } from "react-router-dom";
import NotFound from "../../Error/404";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../services/types";
import { fetchCurrentFacility } from "../../../services/redux/actions/facilities";
import { Grid } from "@material-ui/core";
import Card from "../../../components/atoms/Card";
import FacilitySubMenu from "../../../components/organisms/FacilitySubmenu";
import Title from "../../../components/molecules/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import OptionsBar from "../../../components/molecules/FacilityViewOptionsBar";
import BasicDetails from "../../../components/organisms/FacilityForms/BasicDetails";
import ContactDetails from "../../../components/organisms/FacilityForms/ContactDetails";
import Resources from "../../../components/organisms/FacilityForms/Resources";
import Utilities from "../../../components/organisms/FacilityForms/Utilities";
import Services from "../../../components/organisms/FacilityForms/Services";

const API = process.env.REACT_APP_API_URL;

function UpdateFacility() {
  const facility = useSelector((state: IState) => state.facilities.current);
  const { dependancies, errors, ui } = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [facilityLoadState, setFacilityLoadState] = useState(
    "notloaded" as "notloaded" | "loaded" | "failed"
  );
  const { page, id }: { page: string; id: string } = useParams();
  const pageAvailable =
    page && page.length > 0 && Object.keys(pages).find(p => p === page);
  const acAction =
    page === pages.summary
      ? "basic_details"
      : page === pages.contact
      ? "contact_location_details"
      : page;

  useEffect(() => {
    if (
      (!facility.id || facility.id != Number(id)) &&
      dependancies.facilityTypes.list.length > 0
    ) {
      dispatch(fetchCurrentFacility(id, dependancies));
      return;
    }
    setFacilityLoadState("loaded");
  }, [facility, id, dependancies]);

  useEffect(() => {
    if (
      errors.fetchCurrentFacility?.length &&
      errors.fetchCurrentFacility?.length > 0
    ) {
      setFacilityLoadState("failed");
      return;
    }
    if (facility.id && facility.id == Number(id)) {
      setFacilityLoadState("loaded");
      return;
    }
  }, [facility, errors]);

  const downloadFacility = () => {
    window.open(`${API}/facilities/download/${id}`);
  };
  const onCancel = () => {
    // @ts-ignore
    swal({
      icon: "warning",
      title: "Are You Sure You Want To Cancel ?",
      text: "All unsaved data will be lost",
      // @ts-ignore
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then(async (response: any) => {
      if (response) {
        history.push(`/facilities/${id}/${ui.activeFacilityPage}`);
        localStorage.clear();
      }
    });
  };

  const onCreateOrUpdate = () => {
    dispatch(fetchCurrentFacility(facility.id, dependancies));
    history.push(`/facilities/${id}/${ui.activeFacilityPage}`);
  };

  return (
    <>
      <RedirectOnMobile />
      {pageAvailable && facilityLoadState != "failed" ? (
        <Container style={{ paddingTop: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3}>
              <Card heading="Facility menu">
                <FacilitySubMenu />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Grid item xs={12} sm={12} md={12}>
                <Title
                  sub={facility.common_name || ""}
                  title={facility.facility_name || ""}
                  icon={<FontAwesomeIcon icon={faHospital} />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Card>
                  <OptionsBar
                    facility={facility}
                    downloadFacility={downloadFacility}
                  />
                </Card>
              </Grid>
              <Ac
                role={getUser().role}
                action={`facility:${acAction}:update` as acActions}
                allowed={() => (
                  <>
                    {ui.activeFacilityPage == pages.summary && (
                      <BasicDetails
                        update
                        facility={facility}
                        onCreateOrUpdate={onCreateOrUpdate}
                        onCancel={onCancel}
                      />
                    )}
                    {ui.activeFacilityPage == pages.contact && (
                      <ContactDetails
                        update
                        facility={facility}
                        onCreateOrUpdate={onCreateOrUpdate}
                        onCancel={onCancel}
                      />
                    )}
                    {ui.activeFacilityPage == pages.resources && (
                      <Resources
                        update
                        facility={facility}
                        onCreateOrUpdate={onCreateOrUpdate}
                        onCancel={onCancel}
                      />
                    )}
                    {ui.activeFacilityPage == pages.utilities && (
                      <Utilities
                        update
                        facility={facility}
                        onCreateOrUpdate={onCreateOrUpdate}
                        onCancel={onCancel}
                      />
                    )}
                    {ui.activeFacilityPage == pages.services && (
                      <Services
                        update
                        facility={facility}
                        onCreateOrUpdate={onCreateOrUpdate}
                        onCancel={onCancel}
                      />
                    )}
                  </>
                )}
                denied={() => <Unauthorized />}
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <NotFound></NotFound>
      )}
    </>
  );
}

export default UpdateFacility;
