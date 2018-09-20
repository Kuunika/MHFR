import React from 'react';
import footerResizer from "../helpers/footerResize";
import { Row, Col, Button, Icon, Input, Modal, Card } from 'react-materialize';
import { UserList, ViewUser, UserForm } from './index';
import '../App.css';

export default class UsersHome extends React.Component {
  state = {
    user: null,
    delay: 3000
  }

  componentWillMount() {
    if (!sessionStorage.getItem('token')) {
      this.props.history.replace('/');
    }
  }

  componentDidMount() {
    footerResizer();
  }

  onUserSelected = user => {
    this.setState({
      user
    });
  }

  onUserArchived = () => {
    this.setState({
      user: null
    });
  }

  showToastMessage = message => {
    window.Materialize.toast(message, this.state.delay);
  }

  reloadPage = (delayIncrement=300) => {
    setTimeout(() => {
      window.location.reload();
    }, this.state.delay + delayIncrement);
  }
  onUserUpdateSuccess = () => {
    this.showToastMessage('User updated successfully, reloading');
    this.reloadPage()
  }

  onUserUpdateError = () => {
    this.showToastMessage('Failed to update user, try again');
  }

  onUserCreationSuccess = () => {
    this.showToastMessage('User created successfully, reloading');
    this.reloadPage();
  }

  onUserCreationError = () => {
    this.showToastMessage('Failed to create user, try again');
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col s={12}>
            <h4>
              <Icon>people</Icon> USER MANAGEMENT
              <UserForm
                onUserCreationSuccess={this.onUserCreationSuccess}
                onUserCreationError={this.onUserCreationError}
                title="Create new administrator user"
              />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col s={7}>
            <UserList onUserSelected={this.onUserSelected} />
          </Col>
          <Col s={5}>
            <ViewUser
              user={this.state.user}
              onUserArchived={this.onUserArchived}
              onUserUpdateSuccess={this.onUserUpdateSuccess}
              onUserUpdateError={this.onUserUpdateError}
              />
          </Col>
        </Row>
      </div>
    );
  }
}
