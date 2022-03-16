import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "Date",
    headerName: "Date",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_in",
    headerName: "Check-in",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_out",
    headerName: "Check-out",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_in_status",
    headerName: "Check-in Status",
    flex:1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_out_status",
    headerName: "Check-out Status",
    flex:1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Note",
    headerName: "Note",
    flex:1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
 
];
