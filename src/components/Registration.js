import React, { Component } from "react";
import axios from "axios";
import { Button, Input, FormGroup, FormHelperText } from "@material-ui/core";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, password_confirmation } = this.state;
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessAuth(response.data);
        } else {
          this.setState({
            registrationErrors: response.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <FormGroup
          onSubmit={this.handleSubmit}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          <Input
            disableUnderline
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            style={{
              color: "#8d949b",
              marginBottom: "10px",
              fontSize: "20px",
              backgroundColor: "#2e3a48",
              border: "1px solid #444f5b",
              borderRadius: "10px",
              padding: "4px",
            }}
          />
          <br />

          <Input
            disableUnderline
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            style={{
              color: "#8d949b",
              marginBottom: "10px",
              fontSize: "20px",
              backgroundColor: "#2e3a48",
              border: "1px solid #444f5b",
              borderRadius: "10px",
              padding: "4px",
            }}
          />
          <br />

          <Input
            disableUnderline
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
            style={{
              color: "#8d949b",
              marginBottom: "10px",
              fontSize: "20px",
              backgroundColor: "#2e3a48",
              border: "1px solid #444f5b",
              borderRadius: "10px",
              padding: "4px",
            }}
          />
          <br />

          <Button
            style={{
              marginBottom: "10px",
              backgroundColor: "#17252A",
              backgroundColor: "#7b78ff",
              fontSize: "20px",
              borderRadius: "10px",
            }}
            variant="contained"
            onClick={this.handleSubmit}
          >
            Register
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default Registration;