import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import styles from "./styles";
import { getLeaveInformationByID } from "../../leaveRequest/actions";
import { useSelector, useDispatch } from "react-redux";
import DataGrid from "../../common/DataGrid";
import moment from "moment";
import { getDayOffAmount } from "../../../utils/miscellaneous";
import { getLeaveAmount } from "../../../utils/miscellaneous";
import { cancleLeaveRequest } from "../../leaveRequest/actions";
import { headers } from "./headers";
const useStyles = makeStyles(styles);

const CardLeaveInfomation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = props;

  const { leaveInformationByID } = useSelector((state) => state.leaveReducer);

  let leaveDataFormat = [{ id: "0" }];
  let leaveDataHeader = [];

  let Header = headers;
  let Info = [];

  useEffect(() => {
    dispatch(getLeaveInformationByID("", "", id));
  }, []);

  const setLeaveInfoDataGrid = () => {
    if (Object.keys(leaveInformationByID).length !== 0) {
      leaveInformationByID.Leave_infomation.data.forEach((value, index) => {
        let name = value.Type_name;
        leaveDataHeader.push({
          field: name,
          headerName: name,
          flex: 1,
          minWidth:80,
          headerClassName: "bg-light-green",
        });
        leaveDataFormat[0][name] = value.Leaved;
      });
    }
  };
  const setDataGrid = () => {
    if (Object.keys(leaveInformationByID).length !== 0) {
      leaveInformationByID.Leave_request.data.map((item, index) => {
        let timeDiff = moment.duration(moment(item.End).diff(item.Begin));
        let hours = Math.floor(timeDiff.asSeconds() / 3600);
        let min = Math.floor((timeDiff.asSeconds() - hours * 3600) / 60);
        Info.push(item);
        Info[index].id = item.id;
        // Info[index].Amount = getLeaveAmount(hours, min);
      });
      Info.reverse();
    }
  };
  setDataGrid();
  // setLeaveInfoTableData()
  setLeaveInfoDataGrid();

  return (
    <>
      <div style={{ marginTop: "15px" }} />
      <Typography variant="h6" fontWeight="bold" className={classes.topic}>
        Leave Information (Hour)
      </Typography>
      <DataGrid
        headers={leaveDataHeader ? leaveDataHeader : ""}
        rows={leaveDataFormat ? leaveDataFormat : ""}
        disablePagination={true}
      />
      <Typography variant="h6" fontWeight="bold" className={classes.topic}>
        Leave
      </Typography>
      <DataGrid headers={Header ? Header : ""} rows={Info ? Info : ""} />
    </>
  );
};

export default CardLeaveInfomation;
