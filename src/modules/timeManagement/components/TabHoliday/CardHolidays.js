import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormHolidaysUpdate from "./FormHolidaysUpdate";
import { getHolidaysInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { headers } from "./headers";
import { deleteHoliday } from "../../actions";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import moment from "moment";
import { Grid } from "@mui/material";

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

const CardHoliday = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { holidaysInformation } = useSelector((state) => state.timeReducer);

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
  const headerArray = { Start: "Begin", Holiday_Name: "Name", End: "End" };

  let holidayHeader = headers;
  let holidayInfo = [];
  holidayHeader[headers.length] = {
    field: "actions",
    type: "actions",
    headerClassName: "bg-light-green",
    headerName: "Action",
    width: 90,
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
    dispatch(getHolidaysInformation());
  }, []);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteHoliday([id]);
        dispatch(getHolidaysInformation());
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
    if (holidayInfo.length !== 0) {
      const filteredRows = holidayInfo.filter((row) => {
        return Object.keys(row).some((field) => {
          console.log(row[field].toString());
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setHolidaysDataGrid = () => {
    if (Object.keys(holidaysInformation).length !== 0) {
      holidaysInformation.data.map((item, index) => {
        console.log(item);
        holidayInfo.push(item);
        holidayInfo[index].Start = moment(item.Start).format("D  MMMM");
        holidayInfo[index].End = moment(item.End).format("D  MMMM");
        holidayInfo[index].id = item.ID;
      });
    }
  };
  setHolidaysDataGrid();
  return (
    <>
      <ModalUpdate open={open} handleClose={handleClose} title="Holiday Update">
        <FormHolidaysUpdate
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
            sortModel={sortModel}
            onSortModelChange={(model) =>
              holidayInfo.length !== 0 ? setSortModel(model) : ""
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 50]}
            pagination
            headers={holidayHeader ? holidayHeader : ""}
            rows={searchText ? searchInfo : holidayInfo ? holidayInfo : ""}
          />
        </Grid>
      </Grid>{" "}
    </>
  );
};

export default CardHoliday;
