import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Typography } from "@material-ui/core"
import Login from './Login';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogForm: true
    }
  }

  handleSuccessAuth = (data) => {
    console.log(data)
    this.props.handleLogin(data);
    this.props.history.push("/notes");
  };

  renderLoginCard = () => {
    return (
      <Card
        style={{
          padding: "20px",
          textAlign: "center",
          width: "350px",
          marginTop: "50px",
        }}
      >
        <CardContent>
          <Typography
            style={{
              fontSize: "50px",
              marginRight: "10px",
            }}
          >
            Notify •••
          </Typography>

          {this.state.showLogForm ? (
            <Login
              handleSuccessAuth={this.handleSuccessAuth}
              displaySnackbar={this.props.displaySnackbar}
            />
          ) : null}
          {this.state.showRegForm ? (
            <Registration handleSuccessAuth={this.handleSuccessAuth} />
          ) : null}

          {this.state.showLogForm ? (
            <Button
              style={{
                marginTop: "15px",
                fontSize: "15px",
              }}
              onClick={this.toggleForm}
            >
              or create an account
            </Button>
          ) : null}
          {this.state.showRegForm ? (
            <Button
              style={{
                marginTop: "15px",
                fontSize: "15px",
              }}
              onClick={this.toggleForm}
            >
              or sign in
            </Button>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  render() {
    return <div>{this.renderLoginCard()}</div>;
  }
}

export default Home;