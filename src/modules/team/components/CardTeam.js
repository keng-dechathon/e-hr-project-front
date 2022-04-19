import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getTeamsInformation } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../common/DataGrid";
import FormUpdateTeam from "./FormUpdateTeam";
import ModalUpdate from "../../common/ModalUpdate";
import FormAddTeam from "./FormAddTeam";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTeam } from "../actions";
import { headers } from "./headers";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  ButtonAdd: {
    display: "flex",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },

}));

const CardTeam = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { teamsInformation } = useSelector((state) => state.teamReducer);

  const [nowID, setNowID] = useState("");
  const [open, setopen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [option, setOption] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  const headerArray = {
    Team_id: "ID",
    Teamname: "Team name",
    Team_host: "Host",
  };

  let Header = headers;
  let Info = [];
  Header[Header.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",

    headerClassName: "bg-light-green",

    width: 90,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={onClickUpdate(params.row)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  };
  useEffect(() => {
    dispatch(getTeamsInformation());
  }, []);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteTeam([id]);
        dispatch(getTeamsInformation());
      };
      onDelete(deleteID);
      setDeleteID("");
    }
  }, [deleteID]);

  const handleClose = () => {
    setopen(false);
  };
  const onClickUpdate = React.useCallback(
    (row) => () => {
      console.log(row);
      setopen(true);
      setOption("update");
      setNowID(row);
    },
    []
  );
  const onClickAdd = () => {
    setopen(true);
    setOption("add");
  };

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
    },
    []
  );
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
    if (Object.keys(teamsInformation).length !== 0) {
      teamsInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.Team_id;
      });
    }
  };
  console.log(option);
  setDataGrid();
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title={
          option === "add"
            ? "Add Team"
            : option === "update"
            ? "Update Team"
            : ""
        }
        fullscreen={
          option === "add" ? false: option === "update" ? true : false
        }
      >
        {option === "add" ? (
          <FormAddTeam handleClose={handleClose} />
        ) : (
          <FormUpdateTeam handleClose={handleClose} nowID={nowID} />
        )}
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
            sortModel={sortModel}
            onSortModelChange={(model) =>
              Info.length !== 0 ? setSortModel(model) : ""
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 50]}
            pagination
            headers={Header ? Header : ""}
            rows={searchText ? searchInfo : Info ? Info : ""}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardTeam;
