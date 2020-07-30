import React from "react";
import { Button, Input, FormGroup } from "@material-ui/core";
import { loginSuccess } from '../actions/auth';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      password: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, password } = this.state;
    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }
    
    fetch('http://localhost:3001/api/v1/auth', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      if (data.error) {
        alert(data.error)
      } else {
        console.log(data)
        localStorage.setItem('token', data.token)
        this.props.loginSuccess(data)
        this.props.history.push('/dashboard')
      }
    })
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
          style={{ textAlign: "center",
          marginTop: "15px"}}
        >
          <Input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            style={{ marginTop: "50px", fontSize: "15px"}}
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
            style={{ marginBottom: "25px", fontSize: "15px" }}
          />
          <br />
          <br />

          <Button 
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            style={{
              marginBottom: "7px",
              backgroundColor: "black",
              color: "#FFF",
              fontSize: "18px",
            }}
            onClick={this.handleSubmit}
          >
            Sign In!
          </Button>

        
          </FormGroup>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps) (Login);