import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Typography, Button } from '@material-ui/core';

import NotesContainer from "./NotesContainer";
import NavBar from "./NavBar";
import NewForm from "./NewForm";
import EditForm from "./EditForm";
import { fetchNotes } from "../actions/fetchNotes";
import { deleteNote } from "../actions/deleteNote";
import { markCompleted } from "../actions/markCompleted";


class Dashboard extends Component {
  
  handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
        this.props.history.push("/login");
      })
      .catch((error) => console.log("Error", error));
  };

  
  componentDidMount() {
    if (this.props.user.id) {
      const userId = this.props.user.id;
      const API = `http://localhost:3001/users/${userId}/notes`;

      fetch(API)
        .then((response) => response.json())
        .then((data) => this.props.fetchNotes(data.notes))
        .catch((error) => console.log(error));
    }
  }

  
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user.id) {
      const userId = this.props.user.id;
      const API = `http://localhost:3001/users/${userId}/notes`;

      fetch(API)
        .then((response) => response.json())
        .then((data) => this.props.fetchNotes(data.notes))
        .catch((error) => console.log(error));
    }
  }

  
  handleDelete = (noteId) => {
    const API = `http://localhost:3001/notes/${noteId}`;
    axios.delete(API).then((response) => console.log(response));
    this.props.deleteNote(noteId);
  };

  
  handleCompleted = (noteObj) => {
    const { id, title, description, completed } = noteObj;
    const API = `http://localhost:3001/notes/${id}`;

    axios
      .patch(API, {
        title: title,
        description: description,
        completed: !completed,
      })
      .then((response) => console.log("RESPONSE ---", response));

    this.props.markCompleted(noteObj);
  };

  
  handleNewClick = () => {
    this.props.history.push("/notes/new");
  };

  
  render() {
    return (
      <div>
        <NavBar
          user={this.props.user}
          handleLogoutClick={this.handleLogoutClick}
          handleNewClick={this.handleNewClick}
        />

        <Route
          exact
          path={"/notes"}
          render={(routerProps) => (
            <NotesContainer
              {...routerProps}
              handleDelete={this.handleDelete}
              handleCompleted={this.handleCompleted}
            />
          )}
        />

        <Route
          exact
          path={"/notes/new"}
          render={(routerProps) => (
            <NewForm {...routerProps} userId={this.props.user.id} />
          )}
        />

        <Route
          exact
          path={"/notes/:noteId/edit"}
          render={(routerProps) => (
            <EditForm {...routerProps} userId={this.props.user.id} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { notes: state.notes };
};

export default connect(mapStateToProps, { fetchNotes, deleteNote, markAsCompleted })(
  Dashboard
);
