import React, { useState, useEffect } from "react";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";
import noimg from "../../../../assets/noimg.png";

function renderImg(params) {
  return (
    <img
      src={params.value && params.value != "null" ? params.value : noimg}
      style={{ height: "90px" }}
    />
  );
}

export const headers = [
  {
    field: "Img",
    headerName: "image",
    width: 165,    
    align: "center",
    headerClassName: "bg-light-green",
    renderCell: renderImg,
    sortable: false,
  },
  {
    field: "Start",
    type: "dateTime",
    headerName: "Start",
    width: 200,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "End",
    type: "dateTime",
    headerName: "End",
    width: 200,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Topic",
    headerName: "Topic",
    minWidth: 200,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Detail",
    headerName: "Detail",
    minWidth: 200,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
];
