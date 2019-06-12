import React from "react";
import { Switch } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Header, Footer } from "../components/organisms";
import Content from "../components/organisms/Content";
import Dashboard from "../scenes/Dashboard";
import Facilities from "../scenes/Facility";
import AddFacility from "../scenes/Facility/CreateFacility";
import ViewFacility from "../scenes/Facility/ViewFacility";
import UpdateFacility from "../scenes/Facility/UpdateFacility";
import UserLogin from "../scenes/Login";
import Users from "../scenes/Users";
import Feedback from "../scenes/Feedback";
import About from "../scenes/About";
import Help from "../scenes/Help";
import NotFound from "../scenes/Error/404";
import Preloader from "../components/atoms/Preloader";
import { connect } from "react-redux";
import {
  fetchUtilities,
  fetchUtilityTypes,
  fetchServiceTypes,
  fetchServices,
  fetchResources,
  fetchResourceTypes,
  fetchRegulatoryStatuses,
  fetchDistricts,
  fetchOperationalStatuses,
  dispatchDependancyError,
  fetchFacilityTypes
} from "../services/redux/actions/dependancies";
import { fetchFacilities } from "../services/redux/actions/facilities";
import { ToastContainer, cssTransition } from "react-toastify";
import { isAdmin } from "../services/helpers";

const Slide = cssTransition({
  enter: "slideIn",
  exit: "slideOut",
  duration: 750
});
const App: React.FC = (props: any) => {
  const {
    fetchUtilities,
    fetchUtilityTypes,
    fetchServiceTypes,
    fetchServices,
    fetchResources,
    fetchResourceTypes,
    fetchRegulatoryStatuses,
    fetchDistricts,
    fetchOperationalStatuses,
    dispatchDependancyError,
    fetchFacilities,
    fetchFacilityTypes
  } = props;

  fetchUtilities().catch(() => {
    dispatchDependancyError();
  });

  fetchUtilityTypes().catch(() => {
    dispatchDependancyError();
  });

  fetchServices().catch(() => {
    dispatchDependancyError();
  });

  fetchServiceTypes().catch(() => {
    dispatchDependancyError();
  });

  fetchResources().catch(() => {
    dispatchDependancyError();
  });

  fetchResourceTypes().catch(() => {
    dispatchDependancyError();
  });

  fetchRegulatoryStatuses().catch(() => {
    dispatchDependancyError();
  });

  fetchOperationalStatuses().catch(() => {
    dispatchDependancyError();
  });

  fetchDistricts().catch(() => {
    dispatchDependancyError();
  });

  fetchFacilities().catch(() => {});

  fetchFacilityTypes().catch(() => {});
  return false ? (
    <Preloader />
  ) : (
    <>
      <ToastContainer
        autoClose={6000}
        closeButton={false}
        style={{
          zIndex: "1800",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          padding: "0px"
        }}
        transition={Slide}
      />
      <Router>
        <Header />

        <Content>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Facilities" component={Facilities} />

            <Route exact path="/Facilities/:id" component={ViewFacility} />
            <Route
              exact
              path="/Facilities/:id/:page"
              component={ViewFacility}
            />
            <Route exact path="/login" component={UserLogin} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/about" component={About} />
            <Route exact path="/help" component={Help} />

            {props.isAuthenticated && (
              <>
                <Route
                  exact
                  path="/Facilities/:id/:page/edit"
                  component={UpdateFacility}
                />
                <Route exact path="/Facilities/add" component={AddFacility} />
                <Route exact path="/users" component={Users} />
              </>
            )}
            <Route path="*" component={NotFound} />
          </Switch>
        </Content>
        <Footer />
      </Router>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.users.currentUser.authenticated
});
export default connect(
  mapStateToProps,
  {
    fetchUtilities,
    fetchUtilityTypes,
    fetchServiceTypes,
    fetchServices,
    fetchResources,
    fetchResourceTypes,
    fetchRegulatoryStatuses,
    fetchDistricts,
    fetchOperationalStatuses,
    dispatchDependancyError,
    fetchFacilities,
    fetchFacilityTypes
  }
)(App);
