import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";

import renderFiles from "./renderFiles"
export const headers = [
  {
    field: "File",
    headerName: "File",
    width: 150,
    headerClassName: "bg-light-green",
    renderCell: renderFiles,
    sortable: false,
  },
  {
    field: "Detail",
    headerName: "Request Detail",
    minWidth: 150,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "cancle_at",
    headerName: "Cancle at",
    minWidth: 150,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "complete_at",
    headerName: "Approve at",
    minWidth: 150,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "remark",
    headerName: "Remark",
    minWidth: 100,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
];
