import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getEmployeeInformtion } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../common/DataGrid";
import Avatar from "@mui/material/Avatar";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
    "& .MuiDataGrid-cell": {
      borderRight: "0px !important",
    },
    "& .MuiDataGrid-columnHeader": {
      borderRight: "0px !important",
    },
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
  const [pageSize, setPageSize] = useState(5);

  const headerArray = {
    Img: "Name",
    Position: "Position",
    Company: "Company",
    Team_Info: "Owner",
    Active_Status: "Status",
  };
  const avatarColor = [
    pink[500],
    lightGreen[500],
    red[500],
    purple[500],
    blue[500],
    lightBlue[500],
    lime[500],
  ];

  let Header = React.useMemo(() => []);
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
        if (index === 0) {
          Object.keys(item).map((name, value) => {
            console.log(name);
            if (name === "Img" && headerArray[name]) {
              Header[0] = {
                field: name,
                headerName: headerArray[name],
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
                    <Typography
                      variant="subtitle2"
                      style={{ marginLeft: "10px" }}
                    >
                      {params.row.Name}
                    </Typography>
                  </div>
                ),
                minWidth: "280",
                sortable: false,
              };
            }
            if (name === "Position" && headerArray[name]) {
              Header[1] = {
                field: name,
                headerName: headerArray[name],
                flex: 1,
              };
            }
            if (name === "Company" && headerArray[name]) {
              Header[2] = {
                field: name,
                headerName: headerArray[name],
                flex: 1,
              };
            }
            if (name === "Team_Info" && headerArray[name]) {
              Header[3] = {
                field: name,
                headerName: headerArray[name],
                renderCell: (params) => (
                  <div>
                    {params.value &&
                      params.value.map((item, index) =>
                        index === 0 ? (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                            key={index}
                          >
                            <Avatar
                              alt={params.value[0].HostName}
                              src={params.value[0].HostImg}
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: avatarColor[6],
                              }}
                            />
                            <Typography
                              variant="subtitle2"
                              style={{ marginLeft: "10px" }}
                            >
                              {item.HostName}
                            </Typography>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                  </div>
                ),
                minWidth: "230",
                sortable: false,
              };
            }
            if (name === "Active_Status" && headerArray[name]) {
              Header[4] = {
                field: name,
                headerName: headerArray[name],
                flex: 1,
                renderCell: (params) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {
                      <Chip
                        label={
                          params.row.Active_Status === true
                            ? "active"
                            : "inactive"
                        }
                        icon={
                          params.row.Active_Status === true ? (
                            <DoneIcon />
                          ) : (
                            <CloseIcon />
                          )
                        }
                        size="small"
                        color={
                          params.row.Active_Status === true
                            ? "primary"
                            : "success"
                        }
                        style={{ minWidth: "80px", justifyContent: "left" }}
                      />
                    }
                  </div>
                ),

                sortable: false,
              };
            }
          });
        }
        console.log(item);
        Info[index] = {};
        Info[index].Img = item.Img;
        Info[index].Name = item.Name;
        Info[index].Position = item.Position;
        Info[index].Company = item.Company;
        Info[index].Team_Info = item.Team_Info;
        Info[index].Active_Status = item.Active_Status;
        Info[index].id = item.Emp_id;
      });
      if (isPath(empInfoPath)) {
        Header.push({
          field: "actions",
          type: "actions",
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
          getActions: (params) => [
            <GridActionsCellItem
              icon={<SearchIcon />}
              label="Edit"
              onClick={onClickShowEmpInfo(params.id)}
            />,
            <GridActionsCellItem
              icon={
                params.row.Active_Status === true ? (
                  <DeleteForeverIcon />
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
      <Box className={classes.box}>
        <Card>
          <CardContent className={classes.cardcontant}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <QuickSearchToolbar
                value={searchText}
                onChange={(event) => requestSearch(event.target.value)}
                clearSearch={() => requestSearch("")}
              />
              {isPath(empMgnt) && (
                <Button
                  variant="outlined"
                  className={classes.ButtonAdd}
                  onClick={() => setOpenModal(true)}
                >
                  <pre>+ ADD</pre>
                </Button>
              )}
            </Box>
            <DataGrid
              sortingOrder={["desc", "asc"]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50]}
              pagination
              disableSelectionOnClick
              className={classes.datagrid}
              headers={Header ? Header : ""}
              rows={searchText ? searchInfo : Info ? Info : ""}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CardEmpInformation;
