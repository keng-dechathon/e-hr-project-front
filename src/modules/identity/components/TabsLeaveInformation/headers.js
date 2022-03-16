import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

function renderEmergency(params) {
  if (params.value) {
    return "Y";
  } else {
    return "N";
  }
}

export const headers = [
  {
    field: "Begin",
    headerName: "Begin",
    width: 190,
    headerClassName: "bg-light-green",

    renderCell: renderCellExpand,
  },
  {
    field: "End",
    headerName: "End",
    headerClassName: "bg-light-green",

    width: 190,
    renderCell: renderCellExpand,
  },
  {
    field: "Type_name",
    headerName: "Type",
    headerClassName: "bg-light-green",

    width: 110,
    renderCell: renderCellExpand,
  },
  {
    field: "Emergency",
    headerName: "Emergency",
    headerClassName: "bg-light-green",

    flex: 0.4,
    renderCell: renderEmergency,
  },
  {
    field: "Leave_status",
    headerClassName: "bg-light-green",

    headerName: "Status",
    width: 170,
    renderCell: renderCellExpand,
  },
  {
    field: "Amount",
    headerName: "Amount (Hrs)",
    headerClassName: "bg-light-green",

    width: 170,
    renderCell: renderCellExpand,
  },
  {
    field: "Detail",
    headerName: "Description",
    headerClassName: "bg-light-green",

    flex: 1,
    renderCell: renderCellExpand,
  },
  {
    field: "Comment",
    headerName: "Comment",
    headerClassName: "bg-light-green",

    flex: 1,
    renderCell: renderCellExpand,
  },
];
