import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormGroup,
  Typography,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import { addNote } from "../actions/addNote";

class NewForm extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { userId } = this.props;
    axios
      .post(
        "http://localhost:3000/notes/new",
        {
          title: title,
          description: description,
          user_id: userId,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.addNote(response.data.note);
          this.props.history.push("/notes");
        } else {
          console.log(response);
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
        <Typography
          variant="h1"
          style={{ 
            marginTop: "50px",
            marginBottom: "20px",
            fontSize: "100px", 
            color: "#FFF" }}
        >
          new note
        </Typography>
        <FormGroup 
          onSubmit={this.handleSubmit} 
          style={{ textAlign: "center" }}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            required
            style={{ 
              marginBottom: "10px", 
              color: '#FFF',
              fontSize: "20px" }}
          />
          <br />

          <Input
            style={{
              backgroundColor: "rgb(250,250,250)",
              opacity: 0.9,
              fontSize: "15px",
            }}
            multiline
            rows={20}
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />

          <br />

          <Button
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#17252A",
              color: "#FFF",
              fontSize: "20px",
            }}
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default connect(null, { addNote})(NewForm);