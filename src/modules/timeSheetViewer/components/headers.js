import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

import { getDateFormat, getDateFormat2 } from "../../../utils/miscellaneous";
import { renderTime } from "../../timeSheetRecord/components/TimeEditInputCell";
import moment from "moment";
import { RenderSelectLocation,RenderSelectChargeCode } from "../../timeSheetRecord/components/RenderSelect";

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
    valueFormatter: (params) => {
      const valueFormatted = getDateFormat2(getDateFormat(params.value));
      return valueFormatted;
    },
  },
  {
    field: "Start",
    type: "Time",
    headerName: "Start",
    width: 100,
    headerClassName: "bg-black",
    renderCell: renderTime,
    sortable: false,
  },
  {
    field: "End",
    type: "Time",
    headerName: "End",
    width: 100,
    headerClassName: "bg-black",
    renderCell: renderTime,
    sortable: false,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 90,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    valueGetter: getDuration,
    sortable: false,
  },
  {
    field: "Location",
    headerName: "Location",
    width: 150,
    headerClassName: "bg-light-green",
    sortable: false,
  },
  {
    field: "Charge_code",
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
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "Remark",
    headerName: "Remark",
    headerClassName: "bg-light-green",
    width: 150,
    renderCell: renderCellExpand,
    sortable: false,
  },
];
