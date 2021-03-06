import React from "react";
import { Grid } from "@material-ui/core";
import Title from "../../molecules/PageTitle";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Container from "../../atoms/Container";
import OptionsBar from "../../molecules/FacilityViewOptionsBar";
import Card from "../../atoms/Card";
import FacilityGoogleMap from "../../molecules/FacilityGoogleMap";
import BasicDetailsPage from "../../molecules/FacilityBasicDetails";
import ContactsPage from "../../molecules/FacilityContacts";
import ResourcesPage from "../../molecules/FacilityResources";
import UtilitiesPage from "../../molecules/FacilityUtilities";
import ServicesPage from "../../molecules/FacilityServices";
import styled from "styled-components";
import { FacilityPages } from "../../../services/utils";
import Button from "../../atoms/Button";
import { Link } from "react-router-dom";
import { isLoggedIn, getUser } from "../../../services/helpers";
import EmptyState from "../../atoms/FacilityDetailsEmptyState";
import Ac from "../../atoms/Ac";
import { acActions } from "../../../acl";
import { IFacilityCurrent } from "../../../services/types";

library.add(faHospital, faEdit);

function index(props: Props) {
  const {
    basic,
    resources,
    utilities,
    services,
    pageHeader,
    activePage,
    downloadFacility,
    badge
  } = props;
  const position =
    basic.geolocations && basic.geolocations.latitude != ""
      ? {
          lat: parseFloat(basic.geolocations.latitude),
          lng: parseFloat(basic.geolocations.longitude)
        }
      : { lat: -13.9626121, lng: 33.7741195 };
  const acAction =
    activePage == FacilityPages.summary
      ? "basic_details"
      : activePage == FacilityPages.contact
      ? "contact_location_details"
      : activePage;
  return (
    <Container style={{ padding: "16px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Title
            title={basic.facility_name || ""}
            sub={basic.common_name ? basic.common_name : ""}
            approved={
              basic.registration_number != null &&
              basic.registration_number.length > 0
            }
            icon={<FontAwesomeIcon icon={faHospital} />}
            options={
              <Ac
                role={getUser().role}
                action="facility:basic_details:create"
                allowed={() => (
                  <>
                    {/* <Link to="/facilities/add">
                      <Button icon={<FontAwesomeIcon icon={faPlusCircle} />}>
                        Add Facility
                      </Button>
                    </Link> */}
                    <Button
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      theme="danger"
                      onClick={props.archiveFacility}
                    >
                      Archive Facility
                    </Button>
                  </>
                )}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <OptionsBar
              facility={basic}
              downloadFacility={downloadFacility}
              badge={badge}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div style={{ height: "57vh" }}>
            <FacilityGoogleMap position={position} isMarkerShown />
            <DetailsContainer>
              <Grid container>
                <Grid item md={4} className="hide-on-small-only" />
                <Grid item xs={12} sm={12} md={8}>
                  <Card
                    heading={
                      <CardTitle>
                        <div>{pageHeader}</div>
                        {isLoggedIn() && (
                          <>
                            <Ac
                              role={getUser().role}
                              action={
                                `facility:${acAction}:update` as acActions
                              }
                              allowed={() => (
                                <Link
                                  to={`/facilities/${basic.id}/${activePage}/edit`}
                                >
                                  <Button
                                    theme="secondary"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        data-test="facilityUpdateButton"
                                      />
                                    }
                                  >
                                    Update Facility
                                  </Button>
                                </Link>
                              )}
                            />
                          </>
                        )}
                      </CardTitle>
                    }
                    style={{ zIndex: "1", position: "relative" }}
                    bodyStyle={{ padding: "20px" }}
                  >
                    <FacilityPage>
                      {activePage == FacilityPages.summary && (
                        <BasicDetailsPage facility={basic} />
                      )}
                      {activePage == FacilityPages.contact && (
                        <ContactsPage facility={basic} />
                      )}
                      {activePage == FacilityPages.resources &&
                        (resources.length == 0 ? (
                          <EmptyState resource="resources" />
                        ) : (
                          <ResourcesPage resources={resources} />
                        ))}
                      {activePage == FacilityPages.utilities &&
                        (utilities.length == 0 ? (
                          <EmptyState resource="utilities" />
                        ) : (
                          <UtilitiesPage utilities={utilities} />
                        ))}
                      {activePage == FacilityPages.services &&
                        (services.length == 0 ? (
                          <EmptyState resource="services" />
                        ) : (
                          <ServicesPage services={services} />
                        ))}
                    </FacilityPage>
                  </Card>
                </Grid>
              </Grid>
            </DetailsContainer>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

type Props = {
  archiveFacility: Function;
  activePage: string;
  pageHeader: string;
  basic: IFacilityCurrent;
  resources: Array<any>;
  services: Array<any>;
  utilities: Array<any>;
  onEditDetails: Function;
  downloadFacility: Function;
  badge: any;
};
export default index;

const DetailsContainer = styled.div`
  margin-top: 10px;
  @media (min-width: 390px) {
    margin-top: -50vh;
  }
`;

const FacilityPage = styled.div`
  min-height: 25vh;
  max-height: 35vh;
  overflow: scroll;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
