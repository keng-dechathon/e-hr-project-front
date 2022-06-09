import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";
import Link from '@mui/material/Link';

function renderUrl(params) {
  return (
    <Link href={params.value} variant="body2" target="_blank" rel="noreferrer noopener">
      {params.value}
    </Link>
  );
}

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
    renderCell: renderUrl,
    headerClassName: "bg-light-green",
  },
];
