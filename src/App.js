import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./modules/authentication/PrivateRoute/PrivateRoute";
import { getCookie } from "./utils/cookie";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/common/Home";
import SignOut from "./pages/auth/SignOut";
import ResetPassword from "./pages/auth/ResetPassword";
export default function App() {

  return (

    <Router>
      <Fragment>
      
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          
          
          <Route exact path='/reset-password' element={<ResetPassword />} />
          
          <Route exact path='/home' element={<PrivateRoute />}>
            <Route exact path='/home' element={<Home />} />
          </Route>
          <Route path='/sign-out' element={<SignOut />} />

        </Routes>
      </Fragment>
    </Router >
  );
}