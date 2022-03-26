import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import DataGrid from "../../../common/DataGrid";

import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "../../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { headers } from "./headers";
import { Divider } from "@mui/material";
import { getDateFormat } from "../../../../utils/miscellaneous";
import { getAllYearCheckInformation } from "../../actions";
const useStyles = makeStyles(() => ({}));

const CardTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allCheckInformation } = useSelector((state) => state.reportReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(getAllYearCheckInformation());
  }, []);
  console.log(empInformation);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [pageSize, setPageSize] = useState(50);
  let Header = headers;
  let Info = [];

  const setDataGrid = () => {
    if (
      Object.keys(allCheckInformation).length !== 0 &&
      Object.keys(empInformation).length !== 0
    ) {
      allCheckInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.CheckId;
        Info[index].Name = empInformation.data.filter(
          (temp) => String(temp.Emp_id) === String(item.Emp_id)
        )[0].Name;
      });
      Info.reverse();
    }
  };
  setDataGrid();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          pagination
          className={classes.datagrid}
          disableSelectionOnClick
          headers={Header ? Header : ""}
          rows={Info ? Info : ""}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CardTable;
