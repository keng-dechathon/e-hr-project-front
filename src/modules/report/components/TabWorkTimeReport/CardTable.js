import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DataGrid from "../../../common/DataGrid";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { headers } from "./headers";
import { getLeaveTypeInformation } from "../../../leaveType/actions";
import { getAllYearCheckInformation } from "../../actions";
import moment from "moment";
const useStyles = makeStyles(() => ({}));

const CardTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allCheckInformation } = useSelector((state) => state.reportReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(getAllYearCheckInformation());
    dispatch(getLeaveTypeInformation());
  }, []);
  useEffect(() => {
    setDataGrid();
  }, [allCheckInformation, empInformation]);

  const [pageSize, setPageSize] = useState(50);
  let Header = headers;
  const [isSetInfo, setIsSetInfo] = useState(false);
  const [Info, setInfo] = useState([]);

  const setDataGrid = () => {
    if (
      Object.keys(allCheckInformation).length !== 0 &&
      Object.keys(empInformation).length !== 0
    ) {
      try {
        setInfo([]);
        setIsSetInfo(false);
        allCheckInformation.data.map((item) => {
          item = JSON.parse(JSON.stringify(item));

          item.id = item.CheckId;
          item.Name = empInformation.data.filter(
            (temp) => String(temp.Emp_id) === String(item.Emp_id)
          )[0].Name;
          item.Check_in = moment(item.Check_in).format("DD/MM/YYYY, HH:mm:ss");
          item.Check_out = moment(item.Check_out).format(
            "DD/MM/YYYY, HH:mm:ss"
          );
          setInfo((Info) => [...Info, item]);
        });
        setIsSetInfo(true);
        setInfo((Info) => Info.reverse());
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <DataGrid
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, , 10, 50, 100]}
          pagination
          loading={isSetInfo ? false : true}
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
