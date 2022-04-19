import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

export const renderCheck = (params) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "15px",
            backgroundColor:
              params.row.Detail === "Leaved"
                ? "#212121"
                : params.value === "In time"
                ? "#8bc34a"
                : params.value === "Late"
                ? "#f44336"
                : params.value === "-"
                ? "#ffeb3b"
                : params.value === "Over Time"
                ? "#b3e5fc"
                : params.value === "Check Out Early"
                ? "#aed581"
                : "",
            height: "15px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>{params.value}</div>
      </div>
    </div>
  );
};
export const headers = [
  {
    field: "Date",
    headerName: "Date",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_in",
    headerName: "Check-in",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_out",
    headerName: "Check-out",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Check_in_status",
    headerName: "Check-in Status",
    flex:1,
    minWidth: 150,
    headerClassName: "bg-light-green",
    renderCell: renderCheck,
  },
  {
    field: "Check_out_status",
    headerName: "Check-out Status",
    flex:1,
    minWidth: 150,
    headerClassName: "bg-light-green",
    renderCell: renderCheck,
    
  },
  {
    field: "Detail",
    headerName: "Note",
    flex:1,
    minWidth: 100,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
 
];
