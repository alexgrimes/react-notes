import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import { Typography } from '@material-ui/core';


const NotesContainer = (props) => {
  return (
    <div>
      <Typography 
      variant="h1"
      style={{
          marginTop: "100px",
          marginBottom: "20px",
          textAlign: "center",
          color: "#FFF",
          fontSize: "70px",
          border: "solid 5px",
          borderRadius: "10px",
        }}
      >
        Dashboard
      </Typography>
      {renderNotes(props)}
    </div>
  );
};

const renderNotes = (props) => {
  let filteredNotes = props.notes.filter((note) => 
    note.title.includes(props.query)
  )

  return filteredNotes.map((note, index) => {
    return (
      <Note 
        key={index}
        note={note}
        handleDelete={props.handleDelete}
        handleDone={props.handleDone}
        history={props.history}
      />
    )
  })
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    query: state.query
  };
};

export default connect(mapStateToProps, null)(NotesContainer);