import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "File",
    headerName: "File",
    minWidth: 200,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Detail",
    headerName: "Request Detail",
    minWidth: 200,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "complete_at",
    headerName: "Complete at",
    minWidth: 100,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Remark",
    headerName: "Remark",
    minWidth: 100,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
];
