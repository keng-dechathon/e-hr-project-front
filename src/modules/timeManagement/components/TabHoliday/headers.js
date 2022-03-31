import React, { useState, useEffect } from "react";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "Holiday_Name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Start",
    headerName: "Begin",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "End",
    headerName: "End",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
];
