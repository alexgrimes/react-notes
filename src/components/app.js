import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { loginUser } from "../actions/auth";
import { logoutUser } from "../actions/auth";
import Login from './Login';
import Dashboard from './Dashboard'
import Home from './home'
import Nav from './nav'
import NotesContainer from './NotesContainer'
import EditForm from './EditForm'
import NewForm from './NewForm'


const App = () => {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Home />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/notes' component={NotesContainer} />
          <Route path='/notes/new' component={NewForm} />
          <Route path='/notes/:noteId/edit' component={EditForm} />
        </Switch>
      </div>
    </Router>
  )
}

// class App extends Component {
//   constructor() {
//     super();
    
//     this.state = {
//       showError: false,
//     };
//   }


//   componentDidMount() {
//     this.checkLoginStatus();
//   }

//   checkLoginStatus = () => {
//     axios 
//       .get('http://localhost:3000/api/v1/current_user', { withCredentials: true })
//       .then((resp) => {
//         console.log(resp)
//         if (
//           resp.data.logged_in && this.props.loggedInStatus === "NOT_LOGGED_IN"
//         ) {
//           console.log("sending action to store...........");
//           this.props.loginUser(resp.data.user);
//         } else if (
//           !resp.data.logged_in && this.props.loggedInStatus === "LOGGED_IN"
//         ) {
//           this.props.logoutUser();
//         }
//       })
//       .catch((error) => console.log("Error", error));
//   };

//   handleLogin = (data) => {
//     this.props.loginUser(data.user);
//   };

//   handleLogout = () => {
//     this.props.logoutUser();
//   }

//   showError = () => {
//     this.setState({ 
//       showError: true
//     })
//   }

//   render() {
//     console.log(this.props, user)
//     const { loggedInStatus, user } = this.props;
//     return (
//       <div className="app">
//         {this.state.showError ? "Invalid Login" : null }
//         <Router>
//           <Switch>
//             <Route 
//               exact path={"/login"}
//               render={(props) => (
//                 <Home
//                   {...props}
//                   handleLogin={this.handleLogin}
//                   loggedInStatus={loggedInStatus}
//                   showError={this.showError}
//                 />
//               )}
//             />
//             <Route 
//               path={"/notes"}
//               render={(routerProps) => (
//                 <Dashboard 
//                   {...routerProps}
//                   handleLogout={this.handleLogout}
//                   loggedInStatus={loggedInStatus}
//                   user={user}
//                 />
//               )}
//             />
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loggedInStatus: state.loggedInStatus,
//     user: state.user,
//     showError: state.showError
//   };
// };

// export default connect(mapStateToProps, { loginUser, logoutUser })(App);
export default App;