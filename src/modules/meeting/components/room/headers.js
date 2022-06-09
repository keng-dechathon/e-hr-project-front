import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";



export const headers = [
  {
    field: "Room_Name",
    headerName: "Name",
    flex: 0.5,
    renderCell: renderCellExpand,
    headerClassName: "bg-light-green",

  },
  {
    field: "Description",
    headerName: "URL",
    flex: 1,
    renderCell: renderCellExpand,
    headerClassName: "bg-light-green",

  }, 
];
