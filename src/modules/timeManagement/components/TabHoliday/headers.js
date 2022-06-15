import React, { useState, useEffect } from "react";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";
import moment from "moment";
import renderCellExpandDate from "./renderCellExpandDate";
export const headers = [
  {
    field: "Holiday_Name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: true,
  },
  {
    field: "Start",
    headerName: "Begin",
    flex: 1,
    headerClassName: "bg-light-green",
    valueFormatter: (params) => {
      return moment(params.value, "MM/DD/YYYY").format("DD/MM/YYYY");
    },
    renderCell: renderCellExpandDate,
    sortable: true,
  },
  {
    field: "End",
    headerName: "End",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpandDate,
    valueFormatter: (params) => {
      return moment(params.value, "MM/DD/YYYY").format("DD/MM/YYYY");
    },
    sortable: true,
  },
];
