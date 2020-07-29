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
    this.props.handleLogin(data);
    this.props.history.push("/notes");
  };

  
}

export default Home;