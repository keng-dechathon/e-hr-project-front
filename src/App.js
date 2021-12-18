import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./modules/authentication/PrivateRoute";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/common/Home";
import SignOut from "./pages/auth/SignOut";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/common/Profile";
import News from "./pages/common/News";
import MainLayout from "./modules/layout/components/MainLayout";
import TimesheetViewer from "./pages/common/TimesheetViewer";
import TimeSheetRecord from "./pages/common/TimeSheetRecord";
import LeaveRequest from "./pages/common/LeaveRequest";
import NewsView from "./modules/news/components/view/NewsView";
import NewsManagement from "./pages/common/NewsManagement";
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
            <Route exact path='/home' element={<MainLayout title='home'><Home /></MainLayout>} />
          </Route>
          <Route exact path='/profile' element={<PrivateRoute />}>
            <Route exact path='/profile' element={<MainLayout title='Profile'><Profile /></MainLayout>} />
          </Route>
          <Route exact path='/news' element={<PrivateRoute />}>
            <Route exact path='/news' element={<MainLayout title='News'><News /></MainLayout>} />
          </Route>
          <Route exact path='/time-sheet-viewer' element={<PrivateRoute />}>
            <Route exact path='/time-sheet-viewer' element={<MainLayout title='Time Sheet Viewer'><TimesheetViewer /></MainLayout>} />
          </Route>
          <Route exact path='/time-sheet-record' element={<PrivateRoute />}>
            <Route exact path='/time-sheet-record' element={<MainLayout title='Time Sheet Record'><TimeSheetRecord /></MainLayout>} />
          </Route>
          <Route exact path='/leave-request' element={<PrivateRoute />}>
            <Route exact path='/leave-request' element={<MainLayout title='Leave Request'><LeaveRequest /></MainLayout>} />
          </Route>
          <Route exact path='/news/:id' element={<PrivateRoute />}>
            <Route exact path='/news/:id' element={<MainLayout title='News View'><NewsView /></MainLayout>} />
          </Route>
          <Route exact path='/news-management' element={<PrivateRoute />}>
            <Route exact path='/news-management' element={<MainLayout title='News Management'><NewsManagement /></MainLayout>} />
          </Route>
        </Routes>
      </Fragment>
    </Router >


  );
}