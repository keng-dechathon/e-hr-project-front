import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormRoomManagement from "./FormRoomManagement";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import ConfirmDialog from "../../../common/ConfirmDialog";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import {  deleteMeetingRoom } from "../../actions";
import { headers } from "./headers";
import { getMeetingRoomInformation } from "../../actions";

const useStyles = makeStyles((theme) => ({
  ButtonAdd: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  searchBox: {
    height: "59px",
  },
}));

const CardRoomManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    meetingRoomInformation
  } = useSelector((state) => state.meetReducer);
console.log(meetingRoomInformation);
  const [nowID, setNowID] = useState("");
  const [open, setopen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [option, setOption] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  let Header = headers;
  let Info = [];

  Header[2] = {
    field: "actions",
    type: "actions",
    width: 90,
    headerName: "Action",
    headerClassName: "bg-light-green",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={onClickUpdate(params.id)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  };


  useEffect(() => {
    if (deleteID !== "" && confirmDelete) {
      const onDelete = async (id) => {
        await deleteMeetingRoom([String(id)]);
        dispatch(getMeetingRoomInformation());
        setDeleteID("");
        setConfirmDelete(false);
      };
      onDelete(deleteID);
    }
  }, [deleteID, confirmDelete]);

  const ConfirmDelete = () => {
    setConfirmDelete(true);
    handleCloseDialog();
  };

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
      setOpenDialog(true);
    },
    []
  );
  const onClickUpdate = React.useCallback(
    (id) => () => {
      setopen(true);
      setOption("update");
      setNowID(id);
    },
    []
  );
  const onClickAdd = () => {
    setopen(true);
    setOption("add");
  };

  const handleClose = () => {
    setopen(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          console.log(row[field].toString());
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setDataGrid = () => {
    if (Object.keys(meetingRoomInformation).length !== 0) {
      meetingRoomInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.Room_Id;
      });
      if (Info.length !== 0) Info.reverse();
    }
  };
  setDataGrid();
  return (
    <>
      <ConfirmDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        onClick={ConfirmDelete}
        message={"Do you insist on deleting Charge Code ?"}
      />
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Charge Code Update"
      >
        <FormRoomManagement
          id={nowID}
          handleClose={handleClose}
          option={option}
        />
      </ModalUpdate>
      <Grid container spacing={2} style={{ marginTop: "1px" }}>
        <Grid item xs={10} sm={7}>
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sm={5}
          style={{ display: "flex", justifyContent: "flex-end" }}
          className={classes.searchBox}
        >
          <Button
            variant="outlined"
            className={classes.ButtonAdd}
            onClick={onClickAdd}
          >
            <pre>+ ADD</pre>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sortingOrder={["desc", "asc"]}
            headers={Header ? Header : ""}
            rows={searchText ? searchInfo : Info ? Info : ""}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            pagination
            loading={isLoading}
            className={classes.datagrid}
            disableSelectionOnClick
          />{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default CardRoomManagement;
