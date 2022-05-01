import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormWorkingTimeUpdate from "./FormWorkingTimeUpdate";
import { getWorkingTimeInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";

import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { headers } from "./headers";
import { deleteHoliday } from "../../actions";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import ModalUpdate from "../../../common/ModalUpdate";
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

  let workingTimeHeader = headers;
  let workTimeInfo = [];
  workingTimeHeader[headers.length] = {
    field: "actions",
    type: "actions",
    width: 90,
    headerClassName: "bg-light-green",
    headerName: "Action",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={onClickUpdate(params.row.Day_Name ? params.row.Day_Name : "")}
      />,
    ],
  };
  useEffect(() => {
    dispatch(getWorkingTimeInformation());
  }, []);

  // useEffect(() => {
  //   if (deleteID !== "") {
  //     const onDelete = async (id) => {
  //       await deleteHoliday([id]);
  //       dispatch(getWorkingTimeInformation());
  //     };
  //     onDelete(deleteID);
  //     setDeleteID("");
  //   }
  // }, [deleteID]);

  const onClickUpdate = React.useCallback(
    (id) => () => {
      setopen(true);
      setOption("update");
      setNowID(id);
    },
    []
  );

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
        if (item.Day_Name === "MONDAY") {
          workTimeInfo[0] = item;
          workTimeInfo[0].id = 0;
        }
        if (item.Day_Name === "TUESDAY") {
          workTimeInfo[1] = item;
          workTimeInfo[1].id = 1;
        }
        if (item.Day_Name === "WEDNESDAY") {
          workTimeInfo[2] = item;
          workTimeInfo[2].id = 2;
        }
        if (item.Day_Name === "THURSDAY") {
          workTimeInfo[3] = item;
          workTimeInfo[3].id = 3;
        }
        if (item.Day_Name === "FRIDAY") {
          workTimeInfo[4] = item;
          workTimeInfo[4].id = 4;
        }
        if (item.Day_Name === "SATURDAY") {
          workTimeInfo[5] = item;
          workTimeInfo[5].id = 5;
        }
        if (item.Day_Name === "SUNDAY") {
          workTimeInfo[6] = item;
          workTimeInfo[6].id = 6;
        }
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
      <Grid container spacing={2} style={{ marginTop: "1px" }}>
        <Grid item xs={12} sm={7}>
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Button variant="outlined" className={classes.ButtonAdd} onClick={onClickAdd}><pre>+ ADD</pre></Button> */}
          <DataGrid
            pageSize={50}
            headers={workingTimeHeader ? workingTimeHeader : ""}
            rows={searchText ? searchInfo : workTimeInfo ? workTimeInfo : ""}
            disablePagination={true}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardWorkingTime;
