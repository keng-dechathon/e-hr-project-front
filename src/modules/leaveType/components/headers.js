import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const headers = [
  {
    field: "Type_name",
    headerName: "Name",
    minWidth: 200, 
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Num_per_year",
    headerName: "Number of Hours can leave",
    minWidth: 200,
    flex:1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Num_can_add",
    headerName: "Number of Hours can add",
    minWidth: 200,
    flex:1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "total",
    headerName: "Total",
    minWidth: 200,
    flex:1,
    headerClassName: "bg-light-green",
    sortable: false,    
    renderCell: (params) => (
        <div>
          {parseInt(params.row.Num_can_add) +
            parseInt(params.row.Num_per_year)}
        </div>
      ),
  },
];
