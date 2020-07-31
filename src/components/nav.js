import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth'

class Nav extends React.Component {
  handleLogout = () => {
    this.props.logoutUser()
    localStorage.removeItem('token')
  }

  render() {
  return (
    <div>
    <AppBar 
      title="Notes"
      style={{ 
        height: "50px", 
        padding: "7px", 
        backgroundColor: "#18160A"}}
    >
      <Toolbar variant="dense">
        <Typography
          style={{
            fontSize: '25px',
            color: '#FFF',
            marginRight: '10px',
            flexGrow: 1,
          }}
        >
          Notes
        </Typography>
      {
        this.props.auth ?
        <Link to='/login' className="ui button"
          onClick={this.props.handleLogout}
          variant="contained"
          style={{
            fontSize: '15px',
            marginRight: '10px',
          }}
        >
          Log out
        </Link>
        :
        <Link to='/login' 
        className="ui button"
        style={{
            fontSize: '15px',
            marginRight: '10px',
            color: '#FFF'
          }}
          >
          Login 
        </Link>
      }
      </Toolbar>
    </AppBar>
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps) (Nav);