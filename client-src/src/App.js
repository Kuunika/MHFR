import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import FacilitiesHome from "./Facility/FacilitiesHome";
import { Route, Switch } from "react-router-dom";
import FacilityDetails from "./Facility/FacilityDetails";
import Dashboard from "./Dashboard/DashboardHome";
import MflAbout from "./common/MflAbout";
import Footer from "./common/Footer";
import MflLogin from "./common/MflLogin";
import MfLFeedback from "./common/MfLFeedback";
import { UsersHome } from './users';
import { AddFacilityHome } from "./Facility/AddFacility";
import SearchModal from "./Facility/SearchModal";

class App extends Component {

  state = {
    widthFlag: false
  }

  checkWindowWidith = () => (window.innerWidth <= 480) ? this.setState({widthFlag: true}) : this.setState({widthFlag: false})

  isRouteVisible = () => {
    const route = <Route
      exact path = '/facilities/add'
      component = { AddFacilityHome}
    />

    if (!this.state.widthFlag && sessionStorage.getItem('token')) {
      return route
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.checkWindowWidith)
    this.checkWindowWidith()
  }

  render() {

    return (
      <div className="mfl-page-wrap">
        <Navbar />
        <div className="content">
        <Switch>
          <Route
            exact
            path="/facilities"
            component={FacilitiesHome}
          />
          {this.isRouteVisible()}
          <Route
            exact
            path='/facilities/search'
            component={SearchModal}
          />
          <Route path="/facilities/:id/:sections" component={FacilityDetails} />
          <Route
            exact
            path="/"
            component={Dashboard}
          />
          <Route
            exact
            path="/about"
            component={MflAbout}
          />
          <Route
            exact
            path="/feedback"
            component={MfLFeedback}
          />
          <Route
            exact
            path="/login"
            component={MflLogin}
          />
          <Route
            exact
            path="/users"
            component={UsersHome}
          />
        </Switch>
        </div>
        <Footer />
      </div >
    );
  }
}

export default App;
