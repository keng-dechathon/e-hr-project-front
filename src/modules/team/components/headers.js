import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "Teamname",
    headerClassName: "bg-light-green",
    headerName: "Team name",
    flex: 1,
    renderCell: renderCellExpand,

  },
  {
    field: "Team_host",
    headerClassName: "bg-light-green",
    headerName: "Host",
    flex: 1,
    renderCell: renderCellExpand,

  },
];
