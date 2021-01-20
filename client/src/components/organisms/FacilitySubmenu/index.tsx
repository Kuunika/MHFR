import React, { useEffect } from "react";
import styled from "styled-components";
import MenuItem from "../../atoms/FacilitySubMenuItem";
import { FacilityPages as pages } from "../../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faEnvelope,
  faHospital,
  faStethoscope,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../services/types";
import { useHistory, useParams } from "react-router-dom";
import { setActiveFacilityPage } from "../../../services/redux/actions/ui";
export const facilitySubMenu = [
  {
    link: pages.summary,
    name: "Facility Summary",
    icon: <FontAwesomeIcon icon={faHospital} />
  },
  {
    link: pages.contact,
    name: "Facility Contacts",
    icon: <FontAwesomeIcon icon={faEnvelope} />
  },
  {
    link: pages.resources,
    name: "Facility Resources",
    icon: <FontAwesomeIcon icon={faBed} />
  },
  {
    link: pages.utilities,
    name: "Facility Utilities",
    icon: <FontAwesomeIcon icon={faWifi} />
  },
  {
    link: pages.services,
    name: "Facility Services",
    icon: <FontAwesomeIcon icon={faStethoscope} />
  }
];

const FacilitySubMenu = () => {
  const activeFacilityPage = useSelector(
    (state: IState) => state.ui.activeFacilityPage
  );
  const { page, id }: { page: string; id: string } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!page || page != activeFacilityPage) {
      dispatch(
        setActiveFacilityPage(page && page.length > 0 ? page : pages.summary)
      );
    }
  }, [page, activeFacilityPage]);

  const handlePageChange = (page: any) => {
    dispatch(setActiveFacilityPage(page));
    history.push(`/facilities/${id}/${page}`);
  };
  return (
    <Container>
      {facilitySubMenu.map(item => (
        <MenuItem
          key={item.name}
          active={item.link == activeFacilityPage}
          label={item.name}
          onClickValue={item.link}
          onClick={() => handlePageChange(item.link)}
          icon={item.icon}
        />
      ))}
    </Container>
  );
};

export default FacilitySubMenu;

const Container = styled.div`
  width: 100%;
  margin: 2% -2%;
  min-height: 70vh;
  white-space: nowrap;
  @media (max-width: 390px) {
    min-height: 0px;
  }
`;
