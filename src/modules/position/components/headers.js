import React from "react";

import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";
import Link from '@mui/material/Link';



export const headers = [
  {
    field: "Position_Name",
    headerName: "Position Name",
    flex: 1,
    renderCell: renderCellExpand,
    headerClassName: "bg-light-green",
  }, 
];
