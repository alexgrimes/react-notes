import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { loginUser } from "../actions/loginUser";
import { logoutUser } from "../actions/logoutUser";

class App extends Component {
  constructor() {
    super();
   
    this.state = {
      showError: false,
    };
  }


  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    axios 
      .get('http://localhost:3000/logged_in', { withCredentials: true })
      .then((resp) => {
        if (
          resp.data.logged_in && this.props.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          console.log("sending action to store...........");
          this.props.loginUser(resp.data.user);
        } else if (
          !resp.data.logged_in && this.props.loggedInStatus === "LOGGED_IN"
        ) {
          this.props.logoutUser();
        }
      })
      .catch((error) => console.log("Error", error));
  };

  handleLogin = (data) => {
    this.props.loginUser(data.user);
  };

  handleLogout = () => {
    this.props.logoutUser();
  }

  showError = () => {
    this.setState({ 
      showError: true
    })
  }

  render() {
    console.log(this.props)
    const { loggedInStatus, user } = this.props;
    return (
      <div className="app">
        {this.state.showError ? "Invalid Login" : null }
        <Router>
          <Switch>
            <Route 
              exact path={"/login"}
              render={(props) => (
                <Home 
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={loggedInStatus}
                  showError={this.showError}
                />
              )}
            />
            <Route 
              path={"/notes"}
              render={(routerProps) => (
                <Dashboard 
                  {...routerProps}
                  handleLogout={this.handleLogout}
                  loggedInStatus={loggedInStatus}
                  user={user}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInStatus: state.loggedInStatus,
    user: state.user,
    showError: state.showError
  };
};

export default connect(mapStateToProps, { loginUser, logoutUser })(App);
