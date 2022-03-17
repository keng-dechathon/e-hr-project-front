import React from "react";
import AbcIcon from "@mui/icons-material/Abc";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventIcon from "@mui/icons-material/Event";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
export const SidebarData = [
  {
    title: "Main",
    subNav: [
      {
        title: "News",
        path: "/news",
        icon: <FiberNewIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin", "Approver"],
      },
      {
        title: "Timesheet Viewer",
        path: "/time-sheet-viewer",
        icon: <EventIcon />,
        role: ["Management", "Manager", "Hr", "Admin", "Approver"],
      },
      {
        title: "Timesheet Record",
        path: "/time-sheet-record",
        icon: <EventNoteIcon />,
        role: ["Manager", "Staff", "Hr", "Admin"],
      },
      {
        title: "Leave Request",
        path: "/leave-request",
        // icon: <DirectionsRunIcon />,
        icon: <DescriptionRoundedIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin"],
      },
      {
        title: "Checkin-Checkout",
        path: "/checkin-checkout",
        icon: <CheckCircleIcon />,
        role: ["Manager", "Staff", "Hr", "Admin"],
      },
      {
        title: "Report",
        path: "/report",
        icon: <AssessmentIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
    ],
  },
  {
    title: "Management",
    subNav: [
      {
        title: "Leave Management",
        path: "/leave-management",
        icon: <AssignmentIcon />,
        role: ["Management", "Manager", "Approver", "Admin"],
      },
      // {
      //   title: "Leave Employee Information",
      //   path: "/leave-employee-information",
      //   icon: <EventRepeatIcon />,
      //   role: ["Hr", "Approver", "Admin"],
      // },
      {
        title: "Check-in/Check-out (view)",
        path: "/checkin-checkout-view",
        icon: <DateRangeIcon />,
        role: ["Management", "Manager", "Approver", "Admin", "Hr"],
      },
      {
        title: "Timesheet Management",
        path: "/timesheet-management",
        icon: <EventAvailableIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
      {
        title: "News Management",
        path: "/news-management",
        icon: <NewspaperIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
      {
        title: "Leave Type",
        path: "/leave-type",
        icon: <HouseboatIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
      {
        title: "Document Management.",
        path: "/document-management",
        icon: <FileOpenIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
      {
        title: "Expense Management",
        path: "/expense-management",
        icon: <RequestPageIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
      {
        title: "Employee Management",
        path: "/employee-management",
        icon: <GroupAddIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
      {
        role: ["Hr", "Admin", "Approver"],
        title: "Team Management",
        path: "/team-management",
        icon: <GroupsIcon />,
      },
      {
        title: "Time Management",
        path: "/time-management",
        icon: <WbSunnyIcon />,
        role: ["Hr", "Admin", "Approver"],
      },
    ],
  },
  {
    title: "Other",
    subNav: [
      {
        title: "Employee Information",
        path: "/employee-information",
        icon: <ContactPhoneIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin", "Approver"],
      },
      {
        title: "Meeting Room Booking",
        path: "/meeting-room-booking",
        icon: <BookmarkIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin", "Approver"],
      },
      {
        title: "Expense Request",
        path: "/expense-request",
        icon: <MonetizationOnIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin", "Approver"],
      },
      {
        title: "Document Request",
        path: "/document-request",
        icon: <DriveFileMoveIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin", "Approver"],
      },
      {
        title: "Profile",
        path: "/profile",
        icon: <AccountCircleIcon />,
        role: ["Management", "Manager", "Staff", "Hr", "Admin", "Approver"],
      },
    ],
  },
];
