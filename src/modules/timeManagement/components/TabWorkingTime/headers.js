import React, { useState, useEffect } from "react";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "Day_Name",
    headerName: "Day name",
    flex: 1,
    headerClassName: "bg-light-green",

    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "start_work",
    headerName: "Start Work",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
    type: "time",
    editable: true,
  },
  {
    field: "off_work",
    headerName: "Off work",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,  
    type: "time",
    editable: true,
  },
];
