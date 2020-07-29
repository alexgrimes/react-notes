import React, { Component } from "react";
import axios from "axios";
import { Button, Input, FormGroup } from "@material-ui/core";

class Login extends Component {
  constructor() {
    super()

    this.state = {
      name: "",
      password: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, password } = this.state;
    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: {
            name: name,
            password: password
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.logged_in) {
          this.props.handleSuccessAuth(resp.data);
        } else {
          this.props.displaySnackbar();
        }
      })
      .catch((err) => console.log(err))
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <FormGroup 
          onSubmit={this.handleSubmit} 
          style={{ textAlign: "left",
          marginTop: "15px"}}
        >
          <Input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            style={{ marginBottom: "15px", fontSize: "12px"}}
          />
          <br />
          <br />

          <Input 
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            style={{ marginBottom: "25px", fontSize: "20px" }}
          />
          <br />
          <br />

          <Button 
            size="medium"
            variant="contained"
            color="primary"
            type="submit"
            style={{
              marginBottom: "7px",
              backgroundColor: "#18160A",
              color: "#FFF",
              fontSize: "18px",
            }}
            onclick={this.handleSubmit}
          >
            Sign In!
          </Button>
          </FormGroup>
      </div>
    );
  }
}

export default Login