import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"

const Nav = (props) => {
  return (
    <AppBar 
      title="Flatnote"
      style={{ height: "50px", padding: "7px", backgroundColor: "#18160A"}}
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
          Flatnote
        </Typography>
        <Button 
          onClick={props.handleNewClick}
          variant="contained"
          style={{
            fontSize: '15px',
            marginRight: '10px',
          }}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;