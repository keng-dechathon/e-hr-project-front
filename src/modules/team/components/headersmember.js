import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "id",
    headerClassName: "bg-light-green",
    headerName: "ID",
    type: "number",
    width: "80",
    align: "left",
    headerAlign: "left",
  },
  {
    field: "Name",
    headerName: "Name",
    headerClassName: "bg-light-green",
    flex: 1,
  },
  {
    field: "Position",
    headerClassName: "bg-light-green",
    headerName: "Position",
    flex: 1,
  },
];
