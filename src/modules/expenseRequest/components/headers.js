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
    field: "create_at",
    headerName: "Create at",
    minWidth: 150,
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "complete_at",
    headerName: "Update at",
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
