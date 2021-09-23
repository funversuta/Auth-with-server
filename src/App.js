import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, NavLink } from 'react-router-dom';
import axios from 'axios';
 
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

 
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
 
function App() {
  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
 
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
           
            {/* <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/Profile">Профиль</NavLink><small>(Access with token only)</small> */}
            <h3> ONLY.</h3>
          </div>
          <div className="content">
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/Profile" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;