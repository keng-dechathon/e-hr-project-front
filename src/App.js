import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./modules/authentication/PrivateRoute/PrivateRoute";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/common/Home";
import SignOut from "./pages/auth/SignOut";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/common/Profile";

export default function App() {

  return (

    <Router>
      <Fragment>

        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/sign-out' element={<SignOut />} />
          <Route exact path='/home' element={<PrivateRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
          <Route exact path='/profile' element={<PrivateRoute />}>
            <Route exact path='/profile' element={<Profile />} />
          </Route>
         

        </Routes>
      </Fragment>
    </Router >
  );
}