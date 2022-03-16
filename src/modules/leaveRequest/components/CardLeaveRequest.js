import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../common/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalUpdate from "../../common/ModalUpdate";
import { cancleLeaveRequest } from "../actions";
import FormCancleRequest from "./FormCancleRequest";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { getLeaveRequestInformation } from "../actions";
import { headers } from "./headers";
import { getLeaveAmount } from "../../../utils/miscellaneous";
import moment from "moment";
import FormLeaveRequestUpdate from "./FormLeaveRequestUpdate";
import { Divider } from "@mui/material";

const useStyles = makeStyles(() => ({
  ButtonAdd: {
    display: "flex",
  },
  box: {
    marginTop: "20px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
}));

const CardLeaveRequest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leaveRequestInformation } = useSelector(
    (state) => state.leaveReducer
  );
  useEffect(() => {
    dispatch(getLeaveRequestInformation());
  }, []);
  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [openCancle, setOpenCancle] = useState(false);
  const [ID, setID] = useState("");
  const [cancleID, setCancleID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [columnData, setColumnData] = useState({});
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  let Header = headers;
  let Info = [];
  Header[headers.length] = {
    field: "actions",
    type: "actions",
    width: 100,
    headerName: "Action",
    headerClassName: "bg-light-green",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="outlined"
          style={{ border: "none" }}
          onClick={(event) => {
            handleClickCancle(event, cellValues);
          }}
          disabled={
            cellValues.row.Leave_status !== "Requested"
              ? true
              : false
          }
        >
          Cancle
        </Button>
      );
    },
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCancle = () => {
    setOpenCancle(false);
  };
  //   const onClickUpdate = React.useCallback(
  //     (id) => () => {
  //       setOpen(true);
  //       setOption("update");
  //       setID(id);
  //     },
  //     []
  //   );

  const handleClickCancle = async (event, cellValues) => {
    console.log(event);
    setCancleID(String(cellValues.id));
    setOpenCancle(true);
    setColumnData(cellValues);
    // dispatch(getLeaveRequestInformation());
  };

  const onClickAdd = () => {
    setOpen(true);
    setOption("add");
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setDataGrid = () => {
    if (Object.keys(leaveRequestInformation).length !== 0) {
      leaveRequestInformation.data.map((item, index) => {
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
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Leave Request Create"
      >
        <FormLeaveRequestUpdate
          handleClose={handleClose}
          option={option}
          id={ID}
        />
      </ModalUpdate>
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
      <Box className={classes.box}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            justifyItems: "center",
            alignItems: "center",
            marginBottom:'15px',
          }}
        >
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
          <Button
            variant="outlined"
            className={classes.ButtonAdd}
            onClick={onClickAdd}
          >
            <pre>+ CREATE</pre>
          </Button>
        </Box>
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
      </Box>
    </>
  );
};

export default CardLeaveRequest;
