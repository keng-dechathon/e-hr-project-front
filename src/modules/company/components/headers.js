import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";
import Link from '@mui/material/Link';



export const headers = [
  {
    field: "Company_Name",
    headerName: "Company Name",
    flex: 1,
    renderCell: renderCellExpand,
    headerClassName: "bg-light-green",
  }, 
];
