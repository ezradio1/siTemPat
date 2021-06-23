import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Login from '../page/Login/Login.jsx';

const ContentCustom = () => {
  const [user] = useContext(UserContext);

  const AuthRoute = ({ ...props }) => {
    if (user && user.role === 'Dosen') {
      return <Redirect to='/home' />;
    } else if (user && user.role !== 'Dosen') {
      return <Redirect to='/' />;
    } else {
      return <Route {...props} />;
    }
  };

  const PrivateRoute = ({ ...props }) => {
    if (!user) {
      return <Redirect to='/login' />;
    } else {
      return <Route {...props} />;
    }
  };

  const AdminRoute = ({ ...props }) => {
    if (!user) {
      return <Redirect to='/login' />;
    } else if (user.role === 'Admin' || user.role === 'Super Admin') {
      return <Route {...props} />;
    } else {
      return <Redirect to='/home' />;
    }
  };

  const DosenRoute = ({ ...props }) => {
    if (!user) {
      return <Redirect to='/login' />;
    } else if (user.role === 'Dosen') {
      return <Route {...props} />;
    } else {
      return <Redirect to='/' />;
    }
  };

  return (
    <div>
      <Switch>
        <AuthRoute exact path='/login' component={Login} />

        {/* <PrivateRoute component={NotFound}></PrivateRoute> */}
      </Switch>
    </div>
  );
};

export default ContentCustom;
