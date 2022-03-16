import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormWorkingTimeUpdate from "./FormWorkingTimeUpdate";
import { getWorkingTimeInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { deleteHoliday } from "../../actions";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";

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

const CardWorkingTime = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { workingTimeInformation } = useSelector((state) => state.timeReducer);

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
    Day_Name: "Day Name",
    start_work: "Start Work",
    off_work: "Off Work",
  };

  let workingTimeHeader = React.useMemo(() => []);
  let workTimeInfo = [];

  useEffect(() => {
    dispatch(getWorkingTimeInformation());
  }, []);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteHoliday([id]);
        dispatch(getWorkingTimeInformation());
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
    if (workTimeInfo.length !== 0) {
      const filteredRows = workTimeInfo.filter((row) => {
        return Object.keys(row).some((field) => {
          console.log(row[field].toString());
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setHolidaysDataGrid = () => {
    if (Object.keys(workingTimeInformation).length !== 0) {
      workingTimeInformation.data.map((item, index) => {
        if (index === 0) {
          Object.keys(item).map((name, value) => {
            if (headerArray[name] && name === "Day_Name") {
              workingTimeHeader[0] = {
                field: name,
                headerClassName: "bg-light-green",

                headerName: headerArray[name],
                flex: 1,
                sortable: false,
              };
            } else if (headerArray[name] && name === "start_work") {
              workingTimeHeader[1] = {
                field: name,
                headerName: headerArray[name],
                flex: 1,
                headerClassName: "bg-light-green",

                sortable: false,
                type: "time",
                editable: true,
              };
            } else if (headerArray[name] && name === "off_work") {
              workingTimeHeader[2] = {
                field: name,
                headerName: headerArray[name],
                flex: 1,
                headerClassName: "bg-light-green",

                sortable: false,
                type: "time",
                editable: true,
              };
            }
          });
        }
        workTimeInfo.push(item);
        workTimeInfo[index].id = index;
      });
      workingTimeHeader.push({
        field: "actions",
        type: "actions",
        width: 90,
        headerClassName: "bg-light-green",
        headerName: "Action",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={onClickUpdate(
              params.row.Day_Name ? params.row.Day_Name : ""
            )}
          />,
        ],
      });
    }
  };
  setHolidaysDataGrid();
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Working Time Update"
      >
        <FormWorkingTimeUpdate
          id={nowID}
          handleClose={handleClose}
          option={option}
        />
      </ModalUpdate>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          justifyItems: "center",
          alignItems: "center",
          pt: "10px",
          pb: "10px",
        }}
      >
        <QuickSearchToolbar
          value={searchText}
          onChange={(event) => requestSearch(event.target.value)}
          clearSearch={() => requestSearch("")}
        />
        {/* <Button variant="outlined" className={classes.ButtonAdd} onClick={onClickAdd}><pre>+ ADD</pre></Button> */}
      </Box>
      <DataGrid
        headers={workingTimeHeader ? workingTimeHeader : ""}
        rows={searchText ? searchInfo : workTimeInfo ? workTimeInfo : ""}
        disablePagination={true}
      />
    </>
  );
};

export default CardWorkingTime;
