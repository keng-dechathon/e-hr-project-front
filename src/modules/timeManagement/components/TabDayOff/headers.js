import React, { useState, useEffect } from "react";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    headerClassName: "bg-light-green",

    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Hour",
    headerName: "Hours",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
];
