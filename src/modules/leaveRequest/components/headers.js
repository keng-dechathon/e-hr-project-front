import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

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
    width:190,
    renderCell: renderCellExpand,
  },
  {
    field: "End",
    headerName: "End",
    width:190,
    renderCell: renderCellExpand,
  },
  {
    field: "Type_name",
    headerName: "Type",
    width:110,
    renderCell: renderCellExpand,
  },
  {
    field: "Emergency",
    headerName: "Emergency",
    flex: 0.4,
    renderCell: renderEmergency,
  },
  {
    field: "Leave_status",
    headerName: "Status",
    width:170,
    renderCell: renderCellExpand,
  },
  {
    field: "Amount",
    headerName: "Amount",
    width:170,
    renderCell: renderCellExpand,
  },
  {
    field: "Detail",
    headerName: "Description",
    flex: 1,
    renderCell: renderCellExpand,
  },
  {
    field: "Comment",
    headerName: "Comment",
    flex: 1,
    renderCell: renderCellExpand,
  },
];
