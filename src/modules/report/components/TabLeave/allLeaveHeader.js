
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

function renderEmergency(params) {
  if (params.value) {
    return "Y";
  } else {
    return "N";
  }
}

export const allLeaveHeader = [
  {
    field: "Name",
    headerName: "Name",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Begin",
    headerName: "Begin",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "End",
    headerName: "End",
    width: 190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Type_name",
    headerName: "Type",
    width: 110,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Emergency",
    headerName: "Emergency",
    width: 100,    
    headerClassName: "bg-light-green",
    renderCell: renderEmergency,
  },
  {
    field: "Leave_status",
    headerName: "Status",
    headerClassName: "bg-light-green",
    width: 170,
    renderCell: renderCellExpand,
  },
  {
    field: "Amount",
    headerName: "Amount (Hrs)",
    width: 120,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Detail",
    headerName: "Description",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Comment",
    headerName: "Comment",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
];
