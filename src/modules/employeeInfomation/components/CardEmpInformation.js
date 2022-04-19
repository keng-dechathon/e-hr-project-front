import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getEmployeeInformtion } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import renderCellExpand from "../../common/DataGridTimeSheet/renderCellExpand";
import DataGrid from "../../common/DataGrid";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";

import DrawerEmpInformation from "./DrawerEmpInformation";
import Typography from "../../common/Typography/Typography";
import { GridActionsCellItem } from "@mui/x-data-grid";
import {
  purple,
  red,
  lightGreen,
  pink,
  blue,
  lightBlue,
  lime,
} from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { isPath } from "../../../utils/miscellaneous";
import { empInfoPath, empMgnt } from "./path";
import { deleteEmployeeById, activeEmployee } from "../actions";
import ModalUpdate from "../../common/ModalUpdate";
import FormAddEmployee from "./FormAddEmployee";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const useStyles = makeStyles(() => ({
  ButtonAdd: {
    display: "flex",
  },

  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  datagrid: {
    // "& .MuiDataGrid-cell": {
    //   borderRight: "0px !important",
    // },
    // "& .MuiDataGrid-columnHeader": {
    //   borderRight: "0px !important",
    // },
  },
}));

const CardEmpInformation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { empInformation } = useSelector((state) => state.employeeReducer);

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ID, setID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [activeID, setActiveID] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [pageSize, setPageSize] = useState(50);

  const avatarColor = [
    pink[500],
    lightGreen[500],
    red[500],
    purple[500],
    blue[500],
    lightBlue[500],
    lime[500],
  ];

  let Header = [
    {
      field: "Img",
      headerClassName: "bg-light-green",

      headerName: "Name",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={params.row.Name}
            src={params.value !== "" ? params.value : "null"}
            sx={{ width: 28, height: 28, bgcolor: avatarColor[6] }}
          />
          <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>
            {params.row.Name}
          </Typography>
        </div>
      ),
      flex: 1,
      minWidth: 230,
      sortable: false,
    },
    {
      field: "Position",
      headerClassName: "bg-light-green",
      headerName: "Position",
      flex: 1,
      minWidth: 130,
      renderCell: renderCellExpand,
    },
    {
      field: "Company",
      headerClassName: "bg-light-green",
      flex: 1,
      headerName: "Company",
      minWidth: 130,
      renderCell: renderCellExpand,
    },
    {
      field: "Team_Info",
      headerClassName: "bg-light-green",
      headerName: "Supervisor",
      minWidth: 230,
      renderCell: renderCellExpand,
      flex: 1,
      sortable: false,
    },
    {
      field: "Active_Status",
      headerClassName: "bg-light-green",
      headerName: "Status",
      minWidth: "150",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {
            <Chip
              label={params.row.Active_Status === true ? "active" : "inactive"}
              icon={
                params.row.Active_Status === true ? <DoneIcon /> : <CloseIcon />
              }
              size="small"
              color={params.row.Active_Status === true ? "primary" : "success"}
              style={{ minWidth: "80px", justifyContent: "left" }}
            />
          }
        </div>
      ),

      sortable: false,
    },
  ];
  let Info = [];

  useEffect(() => {
    dispatch(getEmployeeInformtion());
  }, []);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteEmployeeById([id]);
        dispatch(getEmployeeInformtion());
      };
      onDelete(deleteID);
      setDeleteID("");
    }
    if (activeID !== "") {
      const onActive = async (id) => {
        await activeEmployee([id]);
        dispatch(getEmployeeInformtion());
      };
      onActive(activeID);
      setActiveID("");
    }
  }, [deleteID, activeID]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const onClickShowEmpInfo = React.useCallback(
    (id) => () => {
      console.log(id);
      setOpen(true);
      setID(id);
    },
    []
  );

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
    },
    []
  );

  const onClickActive = React.useCallback(
    (id) => () => {
      console.log(id);
      setActiveID(id);
    },
    []
  );

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          if (field !== "Team_Info" && field !== "Img") {
            return searchRegex.test(row[field].toString());
          }
        });
      });
      setSearchInfo(filteredRows);
    }
  };
  const setDataGrid = () => {
    if (Object.keys(empInformation).length !== 0) {
      empInformation.data.map((item, index) => {
        let hostString = "";

        item.Team_Info.map((temp) => {
          hostString += temp.HostName;
          hostString += ",";
          hostString += " ";
        });

        hostString = String(hostString).substring(0, hostString.length - 2);

        if (hostString.length === 0 || hostString === "") hostString = "-";

        Info[index] = {};
        Info[index].Img = item.Img;
        Info[index].Name = item.Name;
        Info[index].Position = item.Position;
        Info[index].Company = item.Company;
        Info[index].Team_Info = hostString;
        Info[index].Active_Status = item.Active_Status;
        Info[index].id = item.Emp_id;
      });
      if (isPath(empInfoPath)) {
        Header.push({
          field: "actions",
          type: "actions",
          headerClassName: "bg-light-green",
          headerName: "Action",
          width: 90,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<SearchIcon />}
              label="search"
              onClick={onClickShowEmpInfo(params.id)}
            />,
          ],
        });
      } else if (isPath(empMgnt)) {
        Header.push({
          field: "actions",
          type: "actions",
          width: 90,
          headerClassName: "bg-light-green",
          headerName: "Action",
          getActions: (params) => [
            <GridActionsCellItem
              icon={<SearchIcon />}
              label="Edit"
              onClick={onClickShowEmpInfo(params.id)}
            />,
            <GridActionsCellItem
              icon={
                params.row.Active_Status === true ? (
                  <DeleteIcon />
                ) : (
                  <RestartAltIcon />
                )
              }
              label="Delete"
              onClick={
                params.row.Active_Status === true
                  ? onClickDelete(params.id)
                  : onClickActive(params.id)
              }
            />,
          ],
        });
      }
      Info.reverse();
    }
  };
  console.log(Info);
  setDataGrid();
  return (
    <>
      <DrawerEmpInformation open={open} setOpen={setOpen} ID={ID} />
      <ModalUpdate
        open={openModal}
        handleClose={handleClose}
        title="Add Employee"
      >
        <FormAddEmployee handleClose={handleClose} />
      </ModalUpdate>
      <Grid container spacing={2} style={{ marginTop: "1px" }}>
        <Grid item xs={isPath(empInfoPath) ? 12 : 10} sm={6}>
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sm={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {isPath(empMgnt) && (
            <Button
              variant="outlined"
              className={classes.ButtonAdd}
              onClick={() => setOpenModal(true)}
            >
              <pre>+ ADD</pre>
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sortingOrder={["desc", "asc"]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5,10,50, 100]}
            pagination
            disableSelectionOnClick
            className={classes.datagrid}
            headers={Header ? Header : ""}
            rows={searchText ? searchInfo : Info ? Info : ""}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardEmpInformation;
