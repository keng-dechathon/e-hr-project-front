import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";



export const headers = [
  {
    field: "ChargeCode_Name",
    headerName: "Name",
    flex: 0.5,
    renderCell: renderCellExpand,

  },
  {
    field: "Description",
    headerName: "Description",
    flex: 1,
    renderCell: renderCellExpand,

  }, 
];
