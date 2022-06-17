import React, { useState, useEffect } from "react";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

import moment from "moment";

const getDuration = (params) => {
  let Duration = moment.duration(
    moment(params.row.End, "h:mm:ss A").diff(
      moment(params.row.Start, "h:mm:ss A")
    )
  );
  return moment.utc(Duration.as("milliseconds")).format("HH:mm");
};


export const columns = [
  {
    field: "Date",
    headerName: "Date",
    type: "date",
    width: 150,
    headerClassName: "bg-black",
    sortable: false,
  },
  {
    field: "Start",
    type: "Time",
    headerName: "Start",
    width: 100,
    headerClassName: "bg-black",
  },
  {
    field: "End",
    type: "Time",
    headerName: "End",
    width: 100,
    headerClassName: "bg-black",
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 90,
    headerClassName: "bg-light-green",
    valueGetter: getDuration,
  },
  {
    field: "Location_Name",
    headerName: "Location",
    width: 150,
    headerClassName: "bg-light-green",
  },
  {
    field: "ChargeCode_Name",
    headerName: "Charge Code",
    width: 150,
    headerClassName: "bg-light-green",
    sortable: false,
  },
  {
    field: "Detail",
    headerName: "Task Detail",
    headerClassName: "bg-light-green",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "Remark",
    headerName: "Progress",
    headerClassName: "bg-light-green",
    flex: 1,
    minWidth: 100,
  },
];
