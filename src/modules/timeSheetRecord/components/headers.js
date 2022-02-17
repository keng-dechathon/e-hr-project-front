import React, { useState, useEffect } from "react";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

import { getDateFormat, getDateFormat2 } from "../../../utils/miscellaneous";
import { renderTime, renderTimeEditInputCell } from "./TimeEditInputCell";
import moment from "moment";
import { updateTimeSheet } from "../actions";

import { RenderSelectChargeCode,RenderSelectLocation } from "./RenderSelect";

const getDuration = (params) => {
  let Duration = moment.duration(
    moment(params.row.End, "h:mm:ss A").diff(
      moment(params.row.Start, "h:mm:ss A")
    )
  );
  return moment.utc(Duration.as("milliseconds")).format("HH:mm");
};
const handleUpdateDetail = async (params) => {
  console.log(params.props.value);
  const values = { Detail: params.props.value, Sheet_id: String(params.id) };
  await updateTimeSheet(values);
};
const handleUpdateRemark = async (params) => {
  console.log(params.props.value);
  const values = { Remark: params.props.value, Sheet_id: String(params.id) };
  await updateTimeSheet(values);
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
    renderEditCell: renderTimeEditInputCell,
    sortable: false,
    editable: true,
  },
  {
    field: "End",
    type: "Time",
    headerName: "End",
    width: 100,
    headerClassName: "bg-black",
    renderCell: renderTime,
    renderEditCell: renderTimeEditInputCell,
    sortable: false,
    editable: true,
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
    field: "Location_id",
    headerName: "Location",
    width: 150,
    headerClassName: "bg-light-green",
    renderCell: RenderSelectLocation,
    sortable: false,
  },
  {
    field: "Charge_code_id",
    headerName: "Charge Code",
    width: 150,
    headerClassName: "bg-light-green",
    renderCell: RenderSelectChargeCode,
    sortable: false,
  },
  {
    field: "Detail",
    headerName: "Task Detail",
    headerClassName: "bg-light-green",
    flex: 1,
    renderCell: renderCellExpand,
    sortable: false,
    editable: true,
    preProcessEditCellProps: (params) => {
      console.log(params.props.value);
      handleUpdateDetail(params);
      return { ...params.props };
    },
    editable: true,
  },
  {
    field: "Remark",
    headerName: "Remark",
    headerClassName: "bg-light-green",
    width: 150,
    renderCell: renderCellExpand,
    sortable: false,
    preProcessEditCellProps: (params) => {
      console.log(params.props.value);
      handleUpdateRemark(params);
      return { ...params.props };
    },
    editable: true,
    // preProcessEditCellProps: (params) => {
    //     const isValid = validateEmail(params.props.value);
    //     return { ...params.props, error: !isValid };
    //   },
  },
  // {
  //   field: "actions",
  //   type: "actions",
  //   headerName: "Action",
  //   headerClassName: "bg-light-green",
  //   width: 70,

  //   getActions: (params) => [
  //     <GridActionsCellItem
  //       icon={<DeleteIcon />}
  //       label="Delete"
  //       onClick={async () => {
  //         deleteTimeSheet(String(params.id));
  //         OnClickDelete();
  //       }}
  //     />,
  //   ],
  // },
];
