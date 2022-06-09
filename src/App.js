import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import TimesheetViewer from "./pages/common/TimeSheetViewer";
import TimeSheetRecord from "./pages/common/TimeSheetRecord";
import LeaveRequest from "./pages/common/LeaveRequest";
import NewsView from "./modules/news/components/view/NewsView";
import NewsManagement from "./pages/common/NewsManagement";
import TimeManagement from "./pages/common/TimeManagement";
import Team from "./pages/common/TeamManagement";
import EmployeeInformation from "./pages/common/EmployeeInformation";
import LeaveType from "./pages/common/LeaveType";
import MeetingRoom from "./pages/common/MeetingRoom";
import TimeSheetManagement from "./pages/common/TimeSheetManagement";
import CheckIn_CheckOut from "./pages/common/Checkin_CheckOut";
import LeaveManagement from "./pages/common/LeaveManagement";
// import LeaveEmployeeInformation from "./pages/common/LeaveEmployeeInformation";
import Checkin_CheckOut_View from "./pages/common/Checkin_CheckOut_View";
import ExpenseRequest from "./pages/common/ExpenseRequest";
import DocumentRequest from "./pages/common/DocumentRequest";
import ExpenseManagement from "./pages/common/ExpenseManagement";
import DocumentManagement from "./pages/common/DocumentManagement";
import Report from "./pages/common/Report";
export default function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="*" element={<Navigate to="/sign-in" />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<SignIn />} />
          </Route>
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/sign-out" element={<SignOut />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route
              exact
              path="/news"
              element={
                <MainLayout title="News">
                  <News />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/home" element={<PrivateRoute />}>
            <Route
              exact
              path="/home"
              element={
                <MainLayout title="home">
                  <Home />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/profile" element={<PrivateRoute />}>
            <Route
              exact
              path="/profile"
              element={
                <MainLayout title="Profile">
                  <Profile />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/news" element={<PrivateRoute />}>
            <Route
              exact
              path="/news"
              element={
                <MainLayout title="News">
                  <News />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/time-sheet-viewer" element={<PrivateRoute />}>
            <Route
              exact
              path="/time-sheet-viewer"
              element={
                <MainLayout title="Timesheet Viewer">
                  <TimesheetViewer />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/time-sheet-record" element={<PrivateRoute />}>
            <Route
              exact
              path="/time-sheet-record"
              element={
                <MainLayout title="Timesheet Record">
                  <TimeSheetRecord />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/leave-request" element={<PrivateRoute />}>
            <Route
              exact
              path="/leave-request"
              element={
                <MainLayout title="Leave Request">
                  <LeaveRequest />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/news/:id" element={<PrivateRoute />}>
            <Route
              exact
              path="/news/:id"
              element={
                <MainLayout title="News View">
                  <NewsView />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/news-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/news-management"
              element={
                <MainLayout title="News Management">
                  <NewsManagement />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/time-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/time-management"
              element={
                <MainLayout title="Time Management">
                  <TimeManagement />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/team-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/team-management"
              element={
                <MainLayout title="Teams Management">
                  <Team />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/employee-information" element={<PrivateRoute />}>
            <Route
              exact
              path="/employee-information"
              element={
                <MainLayout title="Employee Information">
                  <EmployeeInformation />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/employee-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/employee-management"
              element={
                <MainLayout title="Employee Management">
                  <EmployeeInformation />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/leave-type" element={<PrivateRoute />}>
            <Route
              exact
              path="/leave-type"
              element={
                <MainLayout title="Leave Type">
                  <LeaveType />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/meeting-room-booking" element={<PrivateRoute />}>
            <Route
              exact
              path="/meeting-room-booking"
              element={
                <MainLayout title="Meeting Room Booking">
                  <MeetingRoom />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/timesheet-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/timesheet-management"
              element={
                <MainLayout title="Timesheet Management">
                  <TimeSheetManagement />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/checkin-checkout" element={<PrivateRoute />}>
            <Route
              exact
              path="/checkin-checkout"
              element={
                <MainLayout title="Checkin-Checkout">
                  <CheckIn_CheckOut />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/leave-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/leave-management"
              element={
                <MainLayout title="Leave Management">
                  <LeaveManagement />
                </MainLayout>
              }
            />
          </Route>
          {/* <Route
            exact
            path="/leave-employee-information"
            element={<PrivateRoute />}
          >
            <Route
              exact
              path="/leave-employee-information"
              element={
                <MainLayout title="Leave Employee Information">
                  <LeaveEmployeeInformation />
                </MainLayout>
              }
            />
          </Route> */}
          <Route exact path="/checkin-checkout-view" element={<PrivateRoute />}>
            <Route
              exact
              path="/checkin-checkout-view"
              element={
                <MainLayout title="CheckIn-CheckOut (View)">
                  <Checkin_CheckOut_View />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/expense-request" element={<PrivateRoute />}>
            <Route
              exact
              path="/expense-request"
              element={
                <MainLayout title="Expense Request">
                  <ExpenseRequest />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/document-request" element={<PrivateRoute />}>
            <Route
              exact
              path="/document-request"
              element={
                <MainLayout title="Document Request">
                  <DocumentRequest />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/expense-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/expense-management"
              element={
                <MainLayout title="Expense Management">
                  <ExpenseManagement />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/document-management" element={<PrivateRoute />}>
            <Route
              exact
              path="/document-management"
              element={
                <MainLayout title="Document Management">
                  <DocumentManagement />
                </MainLayout>
              }
            />
          </Route>
          <Route exact path="/report" element={<PrivateRoute />}>
            <Route
              exact
              path="/report"
              element={
                <MainLayout title="Report">
                  <Report />
                </MainLayout>
              }
            />
          </Route>

          {/* <Route
              exact
              path="*"
              // render={
              //   <MainLayout title="Report">
              //     <News />
              //   </MainLayout>
              // }
             
            /> */}
        </Routes>
      </Fragment>
    </Router>
  );
}
