import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
// import FormLeaveTypeUpdate from "./FormLeaveTypeUpdate";
import { Grid } from "@mui/material";

import DataGrid from "../../../common/DataGrid";
import { getAllDocumentRequest, getAllDocumentType } from "../../actions";
import ModalUpdate from "../../../common/ModalUpdate";
import FormDocumentManagement from "./FormDocumentManagement";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
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

const CardDocumentManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { allDocumentInformation } = useSelector(
    (state) => state.documentManagementReducer
  );
  const { documentType } = useSelector(
    (state) => state.documentManagementReducer
  );

  const { empInformation } = useSelector((state) => state.employeeReducer);
  const { submittingState } = useSelector(
    (state) => state.documentManagementReducer
  );

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(50);
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
            onClick={handleClickDecline(cellValues.id)}
            disabled={cellValues.row.status !== "Requested"}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#8bc34a" }}
            onClick={handleClickApprove(cellValues.id)}
            disabled={cellValues.row.status !== "Requested"}
          >
            Approve
          </Button>
        </div>
      );
    },
  };

  useEffect(() => {
    dispatch(getAllDocumentRequest());
    dispatch(getEmployeeInformtion());
    dispatch(getAllDocumentType());
  }, []);

  const handleClose = () => {
    setID("");
    setOption("");
    setOpen(false);
  };

  const handleClickDecline = React.useCallback(
    (id) => () => {
      setID(id);
      setOption("decline");
      setOpen(true);
    },
    []
  );
  const handleClickApprove = React.useCallback(
    (id) => () => {
      setID(id);
      setOption("approve");
      setOpen(true);
    },
    []
  );

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
    if (
      Object.keys(allDocumentInformation).length !== 0 &&
      Object.keys(empInformation).length !== 0&&
      Object.keys(documentType).length !== 0
    ) {
      allDocumentInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].Name = empInformation.data.filter(
          (emp) => String(emp.Emp_id) === String(item.Emp_id)
        )[0].Name;
        Info[index].id = String(item.Req_id);
        Info[index].complete_at = String(
          item.cancel_at
            ? item.cancel_at
            : item.complete_at
            ? item.complete_at
            : "-"
        );
        // Info[index].cancle_at = String(item.cancel_at ? item.cancel_at : "-");
        Info[index].remark = String(item.remark ? item.remark : "-");
        Info[index].Type = documentType.data.filter(
          (docType) => String(docType.Type_Id) === String(item.Type_ID)
        )[0].Type_name;
      });
      Info.reverse();
    }
  };
  setDataGrid();

  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={!submittingState.submitting ? handleClose : ""}
        title={
          option === "approve"
            ? "Document Approve"
            : option === "decline"
            ? "Document Decline"
            : ""
        }
      >
        <FormDocumentManagement
          handleClose={handleClose}
          option={option}
          id={ID}
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

export default CardDocumentManagement;
