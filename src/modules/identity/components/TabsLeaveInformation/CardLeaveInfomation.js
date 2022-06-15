import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../../common/Typography/Typography";
import styles from "./styles";
import { getLeaveInformation } from "../../../leaveRequest/actions";
import { useSelector, useDispatch } from "react-redux";
import DataGrid from "../../../common/DataGrid";
import { headers } from "./headers";
import { Button } from "@mui/material";
import moment from "moment";
import ModalUpdate from "../../../common/ModalUpdate";
import FormCancleRequest from "../../../leaveRequest/components/FormCancleRequest";

import { cancleLeaveRequest } from "../../../leaveRequest/actions";

const useStyles = makeStyles(styles);

const CardLeaveInfomation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leaveInformation } = useSelector((state) => state.leaveReducer);
  useEffect(() => {
    dispatch(getLeaveInformation());
  }, []);


  const [cancleID, setCancleID] = useState("");
  const [openCancle, setOpenCancle] = useState(false);
  const [columnData, setColumnData] = useState({});
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
          disabled={
            cellValues.row.Leave_status !== "Requested" &&
            cellValues.row.Leave_status.split(" ")[0] !== "Approved" &&
            cellValues.row.Leave_status !== "Approved cancellation"
              ? true
              : false
          }
        >
          Cancle
        </Button>
      );
    },
  };

  const handleClickCancle = async (event, cellValues) => {
    setCancleID(String(cellValues.id));
    setOpenCancle(true);
    setColumnData(cellValues);
    dispatch(getLeaveInformation());

    // dispatch(getLeaveRequestInformation());
  };
  const handleCloseCancle = () => {
    setOpenCancle(false);
  };
  const setLeaveInfoDataGrid = () => {
    if (Object.keys(leaveInformation).length !== 0) {
      leaveInformation.Leave_infomation.data.forEach((value, index) => {
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
        Leave Information ( Hour )
      </Typography>
      <ModalUpdate
        open={openCancle}
        handleClose={handleCloseCancle}
        title="Leave Request Cancellation"
      >
        <FormCancleRequest
          handleClose={handleCloseCancle}
          columnData={columnData}
        />
      </ModalUpdate>
      <DataGrid
        headers={leaveDataHeader ? leaveDataHeader : ""}
        rows={leaveDataFormat ? leaveDataFormat : ""}
        disablePagination={true}
        className={classes.datagrid}
        disableSelectionOnClick
      />
      <Typography variant="h6" fontWeight="bold" className={classes.topic2}>
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
