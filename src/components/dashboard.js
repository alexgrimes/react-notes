import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Typography, Button } from '@material-ui/core';
import { currentUser } from '../reducers/auth'
import NotesContainer from "./NotesContainer";
import Nav from "./NewForm";
import NewForm from "./NewForm";
import EditForm from "./EditForm";
import { fetchNotes } from "../actions/fetchNotes";
import { deleteNote } from "../actions/deleteNote";
import { markCompleted } from "../actions/markCompleted";


class Dashboard extends React.Component {
  
  handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
        this.props.history.push("/login");
      })
      .catch((error) => console.log("Error", error));
  };

  
  componentDidMount() {
    const token = localStorage.getItem('token')

    if (!token) {
      this.props.history.push('/login')
    } else {

      const reqObj = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      
      fetch('http://localhost:3000/api/v1/current_user', reqObj)
        .then(response => response.json())
        .then(data => {
          this.props.fetchNotes(data.notes)
        })
    }
  }

  
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user.id) {
      const userId = this.props.user.id;
      const API = `http://localhost:3000/users/${userId}/notes`;

      fetch(API)
        .then((response) => response.json())
        .then((data) => this.props.fetchNotes(data.notes))
        .catch((error) => console.log(error));
    }
  }

  
  handleDelete = (noteId) => {
    const API = `http://localhost:3000/notes/${noteId}`;
    axios.delete(API).then((response) => console.log(response));
    this.props.deleteNote(noteId);
  };

  
  handleCompleted = (noteObj) => {
    const { id, title, description, completed } = noteObj;
    const API = `http://localhost:3000/notes/${id}`;

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
        <Nav
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
  return { auth: state.auth }
};

const mapDispatchToProps = {
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps, { 
  fetchNotes, 
  deleteNote, 
  markCompleted 
})
(Dashboard);
