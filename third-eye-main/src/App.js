import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Sketch from "./pages/Sketch/Sketch";
import Login from "./pages/Login/Login";
import SignUp from './pages/SignUp/SignUp';
import './App.css';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          {/* <PrivateRoute path="/blogs" component={Blogs} /> */}
          <PrivateRoute path="/sketch" component={Sketch} />
          <Route path="/Login" component={Login} />
          <Route path="/Third-Eye-SignUp" component={SignUp} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
