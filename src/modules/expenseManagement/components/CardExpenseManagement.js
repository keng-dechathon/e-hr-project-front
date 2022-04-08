import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
// import FormLeaveTypeUpdate from "./FormLeaveTypeUpdate";
import { Grid } from "@mui/material";

import DataGrid from "../../common/DataGrid";
import { getMyExpenseRequest } from "../actions";
import ModalUpdate from "../../common/ModalUpdate";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { headers } from "./headers";
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

const CardExpenseManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { myExpenseInformation } = useSelector(
    (state) => state.expenseRequestReducer
  );
  console.log(myExpenseInformation);
  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [cancleID, setCancleID] = useState("");

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
    headerName: "Action",
    width: "185",
    headerClassName: "bg-light-green",
    renderCell: (cellValues) => {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="success"
            style={{ border: "none", marginRight: "10px" }}
            size="small"
       
          >
            Decline
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#8bc34a" }}

            // }
          >
            Approve
          </Button>
        </div>
      );
    },
  };

  useEffect(() => {
    dispatch(getMyExpenseRequest());
  }, []);
  useEffect(() => {
    if (cancleID !== "") {
      const onCancle = async (id) => {
        // await cancleExpenseRequest(String(id));
        dispatch(getMyExpenseRequest());
      };
      onCancle(cancleID);
      setCancleID("");
    }
  }, [cancleID]);
  const handleClose = () => {
    setOpen(false);
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
    if (Object.keys(myExpenseInformation).length !== 0) {
      myExpenseInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = String(item.Req_id);
        Info[index].complete_at = String(
          item.complete_at ? item.complete_at : "-"
        );
        Info[index].cancle_at = String(item.cancel_at ? item.cancel_at : "-");
        Info[index].remark = String(item.remark ? item.remark : "-");
      });
    }
  };
  setDataGrid();

  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Expense Request"
      >
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
          <DataGrid
            sortingOrder={["desc", "asc"]}
            sortModel={sortModel}
            onSortModelChange={(model) =>
              Info.length !== 0 ? setSortModel(model) : ""
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50]}
            pagination
            disableSelectionOnClick
            headers={Header ? Header : ""}
            rows={searchText ? searchInfo : Info ? Info : ""}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardExpenseManagement;
