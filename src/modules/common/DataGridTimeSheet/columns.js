import renderCellExpand from "./renderCellExpand";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridActionsCellItem } from '@mui/x-data-grid';

export const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    renderCell: renderCellExpand,
    headerClassName: "bg-black",
    sortable: false,
  },
  {
    field: "start",
    headerName: "Start",
    width: 80,
    headerClassName: "bg-black",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "end",
    headerName: "End",
    width: 80,
    headerClassName: "bg-black",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 80,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "charge_code",
    headerName: "Charge Code",
    width: 150,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: "task",
    headerName: "Task Detail",
    headerClassName: "bg-light-green",
    flex: 1,
    renderCell: renderCellExpand,
    sortable: false,
  },
  {
    field: 'actions',
    type: 'actions', 
    headerClassName: "bg-light-green",
    width: 90,
  
    getActions: (params) => [      
        <GridActionsCellItem
            icon={<DeleteForeverIcon />}
            label="Delete"
            onClick={()=>{}}
        />,
    ],
}
];
