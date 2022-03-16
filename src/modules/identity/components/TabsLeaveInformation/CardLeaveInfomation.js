import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../../common/Typography/Typography";
import styles from "./styles";
import { getLeaveInformation } from "../../../leaveRequest/actions";
import { useSelector, useDispatch } from "react-redux";
import DataGrid from "../../../common/DataGrid";
import { headers } from "./headers";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import moment from "moment";
import { getDayOffAmount } from "../../../../utils/miscellaneous";
import { getLeaveAmount } from "../../../../utils/miscellaneous";
import { cancleLeaveRequest } from "../../../leaveRequest/actions";

const useStyles = makeStyles(styles);

const CardLeaveInfomation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leaveInformation } = useSelector((state) => state.leaveReducer);
  useEffect(() => {
    dispatch(getLeaveInformation());
  }, []);

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  let leaveDataFormat = [{ id: "0" }];
  let leaveDataHeader = [];

  let Header = headers;
  let Info = [];
  Header[headers.length] = {
    field: "actions",
    type: "actions",
    headerClassName: "bg-light-green",
    headerName: "Action",
    width: 100,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="outlined"
          style={{ border: "none" }}
          onClick={(event) => {
            handleClickCancle(event, cellValues);
          }}
        >
          Cancle
        </Button>
      );
    },
  };

  const handleClickCancle = async (event, cellValues) => {
    console.log(cellValues.id);
    cancleLeaveRequest(String(cellValues.id));
    dispatch(getLeaveInformation());
  };

  const setLeaveInfoDataGrid = () => {
    if (Object.keys(leaveInformation).length !== 0) {
      leaveInformation.Leave_infomation.data.forEach((value, index) => {
        let name = value.Type_name;
        leaveDataHeader.push({
          field: name,
          headerName: name,
          flex: 1,
          headerClassName: "bg-light-green",
        });
        leaveDataFormat[0][name] = value.Leaved;
      });
    }
  };

  console.log(leaveInformation);
  const setDataGrid = () => {
    if (Object.keys(leaveInformation).length !== 0) {
      leaveInformation.Leave_request.data.map((item, index) => {
        let timeDiff = moment.duration(moment(item.End).diff(item.Begin));
        let hours = Math.floor(timeDiff.asSeconds() / 3600);
        let min = Math.floor((timeDiff.asSeconds() - hours * 3600) / 60);
        Info.push(item);
        if (item.Detail === "null") {
          Info[index].Detail = "-";
        }
        Info[index].id = item.id;
        // Info[index].Amount = getLeaveAmount(hours, min);
      });
      Info.reverse();
    }
  };
  setDataGrid();
  setLeaveInfoDataGrid();
  return (
    <>
      <Typography variant="h6" fontWeight="bold" className={classes.topic}>
        Leave Information (Day,Hour)
      </Typography>
      <DataGrid
        headers={leaveDataHeader ? leaveDataHeader : ""}
        rows={leaveDataFormat ? leaveDataFormat : ""}
        disablePagination={true}
        disableSelectionOnClick
      />
      <Typography variant="h6" fontWeight="bold" className={classes.topic}>
        My Leave
      </Typography>
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
        disableSelectionOnClick
        className={classes.datagrid}
        headers={Header ? Header : ""}
        rows={searchText ? searchInfo : Info ? Info : ""}
      />
    </>
  );
};

export default CardLeaveInfomation;
