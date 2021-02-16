import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchCurrentFacility } from "../../../services/redux/actions/facilities";
import { setActiveFacilityPage } from "../../../services/redux/actions/ui";
import ViewFacility from "./ViewFacility";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHospital,
  faEnvelope,
  faBed,
  faWifi,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";
import { FacilityPages as pages } from "../../../services/utils";
import StatusBadge from "../../../components/atoms/StatusBadge";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import { IState } from "../../../services/types";
import { archiveFacility } from "../../../services/api";

const API = process.env.REACT_APP_API_URL;

library.add(faPlus, faHospital, faEnvelope, faBed, faWifi, faStethoscope);

const Facility = () => {
  const { id, page }: { id: string; page: string } = useParams();
  const { dependancies, status, facilities, ui } = useSelector(
    (state: IState) => state
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && dependancies.facilityTypes.list.length > 0) {
      dispatch(fetchCurrentFacility(id, dependancies));
    }
  }, [id, dependancies]);

  useEffect(() => {
    if (id) {
      dispatch(
        setActiveFacilityPage(page && page.length > 0 ? page : pages.summary)
      );
    }
  }, [id, page]);

  const badges = [
    {
      label: "Closed",
      color: "#B80F0A"
    },
    {
      label: "Closed (Temporary)",
      color: "#EF7215"
    },
    {
      label: "Functional",
      color: "#00A86B"
    },
    {
      label: "Pending Operation (Under construction)",
      color: "#FC6600"
    },
    {
      label: "Pending Operation (Construction Complete)",
      color: "#964000"
    }
  ];

  const facilitySubMenu = [
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

  const onDeleteError = () => {
    toast.info(
      <Notification
        error
        message={`Failed To Delete Facility, Please Try Again`}
      />
    );
    // @ts-ignore
    swal.close();
  };

  const onDeleteSuccess = () => {
    toast.info(<Notification message={`Facility Deleted!!!`} />);
    history.push(`/facilities`);
    // @ts-ignore
    swal.close();
  };

  const handleFacilityArchive = async () => {
    let token = (await sessionStorage.getItem("token")) || "";
    if (token == "") return;

    // @ts-ignore
    swal({
      icon: "warning",
      title: `Are you sure you want to archive ${facilities.current
        .facility_name || ""}?`,
      buttons: {
        cancel: { text: "Cancel", closeModal: true, visible: true },
        confirm: { text: "Delete" }
      },
      closeOnClickOutside: false
    }).then(async (res: any) => {
      if (res) {
        // @ts-ignore
        swal({
          icon: "info",
          title: `Archiving Facility. Please wait...`
        });
        archiveFacility({ id: id, archived_date: new Date() }, token)
          .then(() => {
            onDeleteSuccess();
          })
          .catch(() => {
            onDeleteError();
          });
      }
    });
  };

  const downloadFacility = () => {
    window.open(`${API}/facilities/download/${id}`);
  };

  const handlePageChange = (page: any) => {
    dispatch(setActiveFacilityPage(page));
    history.push(`/facilities/${id}/${page}`);
  };

  const getBadge = () => {
    if (!facilities.current.operationalStatus) {
      return <span />;
    }
    const badge = badges.filter(
      (badge: any) =>
        badge.label ==
        facilities.current.operationalStatus?.facility_operational_status
    );
    return badge.length == 0 ? (
      <span />
    ) : (
      <StatusBadge label={badge[0].label} color={badge[0].color} />
    );
  };

  return (
    <ViewFacility
      archiveFacility={handleFacilityArchive}
      activePage={ui.activeFacilityPage}
      basic={facilities.current}
      resources={facilities.current.resources}
      utilities={facilities.current.utilities}
      services={facilities.current.services}
      onChangePage={(page: any) => {
        handlePageChange(page);
      }}
      onEditDetails={() => {}}
      facilitySubMenu={facilitySubMenu}
      downloadFacility={downloadFacility}
      isLoading={status.fetchCurrentFacility}
      badge={getBadge()}
    />
  );
};

export default Facility;
