import React from 'react';
import AbcIcon from '@mui/icons-material/Abc';

export const SidebarData = [
  {
    title: 'Main',  
    subNav: [
      {
        title: 'News',
        path: '/news',   
        icon: <AbcIcon />,  
        role:['a','b','c','Admin'] ,  
      },
      {
        title: 'Timesheet Viewer',
        path: '/time-sheet-viewer',   
        icon: <AbcIcon />,  
        role:['a','b','c','Admin'] ,  
      },
      {
        title: 'Timesheet Record',
        path: '/time-sheet-record',   
        icon: <AbcIcon />,  
        role:['a','b','Admin'] ,  
      },
      {
        title: 'Leave Request',
        path: '/leave request',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Checkin-Checkout',
        path: '/checkin-checkout',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Report',
        path: '/report',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
    ]
  },
  {
    title: 'Management',  
    subNav: [
      {
        title: 'Leave Management',
        path: '/leave-management',   
        icon: <AbcIcon />,  
        role:['a','b','c','d'] ,  
      },
      {
        title: 'Timesheet Management',
        path: '/timesheet-management',   
        icon: <AbcIcon />,  
        role:['a','b','c','d'] ,  
      },
      {
        title: 'News Management',
        path: '/news-management',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Leave Type',
        path: '/leave-type',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Document Management.',
        path: '/document-management',   
        icon: <AbcIcon />,  
        role:['a','b','Admin'] ,  
      },
      {
        title: 'Expense Management',
        path: '/expense-management',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Employee Management',
        path: '/employee-management',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Team Management',
        path: '/team-management',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Working Time / holiday / Day-off',
        path: '/time-management',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
    ]
  },
  {
    title: 'Other',      
    subNav: [
      {
        title: 'Employee Information',
        path: '/employee-information',   
        icon: <AbcIcon />,  
        role:['a','b','c','d'] ,  
      },
      {
        title: 'Meeting Room Booking',
        path: '/meeting-room-booking',   
        icon: <AbcIcon />,  
        role:['a','b','Admin'] ,  
      },
      {
        title: 'Expense Request',
        path: '/expense-request',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Document Request',
        path: '/document-request',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
      {
        title: 'Profile',
        path: '/profile',   
        icon: <AbcIcon />,  
        role:['a','b','c'] ,  
      },
     
    ]
  },
];