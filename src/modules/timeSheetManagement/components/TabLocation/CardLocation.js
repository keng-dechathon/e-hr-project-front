import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormLocationUpdate from "./FormLocationUpdate";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";

import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { getLocation, deleteLocation } from "../../actions";
import { headers } from "./headers";
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
}));

const CardLocation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { locationInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  const [nowID, setNowID] = useState("");
  const [open, setopen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [option, setOption] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  let Header = headers;
  let Info = [];
  Header[2] = {
    field: "actions",
    type: "actions",
    width: 90,
    headerClassName: "bg-light-green",
    headerName: "Action",
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
    setIsLoading(true);
    dispatch(getLocation());
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, [locationInformation]);
  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteLocation(String(id));
        dispatch(getLocation());
      };
      onDelete(deleteID);
      setDeleteID("");
    }
  }, [deleteID]);

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
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
    if (Object.keys(locationInformation).length !== 0) {
      locationInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.Location_id;
      });
      if (Info.length !== 0) Info.reverse();
    }
  };
  setDataGrid();
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Location Update"
      >
        <FormLocationUpdate
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
            rowsPerPageOptions={[10, 20, 50]}
            pagination
            loading={isLoading}
            className={classes.datagrid}
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardLocation;
