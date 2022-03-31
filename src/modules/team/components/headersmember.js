import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "id",
    headerClassName: "bg-light-green",
    headerName: "ID",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "Name",
    headerName: "Name",
    headerClassName: "bg-light-green",
    minWidth: 180,
    flex: 1,
  },
  {
    field: "Position",
    headerClassName: "bg-light-green",
    headerName: "Position",
    minWidth: 80,
    flex: 1,
  },
];
