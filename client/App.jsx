import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import User from './User/User';
import Search from './Search/Search';
import SignUp from './SignUp/SignUp';
import LogIn from './LogIn/LogIn';

const App = () => (
  <div className="usersPage">
  <Router>
    <Switch>
      <Route path="/" exact component={LogIn}/>
      <Route path="/logIn" component={LogIn}/>
      <Route path="/signUp" component={SignUp}/>
      <Route path="/users" exact component={Search}/>
      <Route path="/search" exact component={Search}/>
      <Route path="/users/:id" component={User}/> 
      {/* NOTE: looks like this is already set up for us here? */}
    </Switch>
  </Router>
  </div>
);

export default App;
