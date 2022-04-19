import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
// import FormLeaveTypeUpdate from "./FormLeaveTypeUpdate";
import { Grid } from "@mui/material";

import DataGrid from "../../common/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getMyDocumentRequest } from "../actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalUpdate from "../../common/ModalUpdate";
import { cancleDocumentRequest } from "../actions";
import FormDocumentRequest from "./FormDocumentRequest";
import { getAllDocumentType } from "../../documentManagement/actions";
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

const CardDocumentRequest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { myDocumentInformation } = useSelector(
    (state) => state.documentRequestReducer
  );
  const { documentType } = useSelector(
    (state) => state.documentManagementReducer
  );
  const { submittingState } = useSelector(
    (state) => state.documentRequestReducer
  );

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(50);
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
    headerClassName: "bg-light-green",
    headerName: "Action",
    width: "180",
    renderCell: (cellValues) => {
      return (
        <div>
          <Button
            variant="outlined"
            color="success"
            size="small"
            style={{ marginRight: "10px" }}
            onClick={onClickCancle(cellValues.id)}
            disabled={cellValues.row.status !== "Requested" ? true : false}
          >
            Cancle
          </Button>
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={onClickUpdate(cellValues.id)}
            disabled={cellValues.row.status !== "Requested"}
          >
            Edit
          </Button>
        </div>
      );
    },
  };

  useEffect(() => {
    dispatch(getMyDocumentRequest());
    dispatch(getAllDocumentType());
  }, []);
  useEffect(() => {
    if (cancleID !== "") {
      const onCancle = async (id) => {
        await cancleDocumentRequest(String(id));
        dispatch(getMyDocumentRequest());
      };
      onCancle(cancleID);
      setCancleID("");
    }
  }, [cancleID]);
  const handleClose = () => {
    setOpen(false);
  };

  const onClickUpdate = React.useCallback(
    (id) => () => {
      setOpen(true);
      setOption("update");
      setID(id);
    },
    []
  );

  const onClickCancle = React.useCallback(
    (id) => () => {
      console.log(id);
      setCancleID(id);
    },
    []
  );

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
    if (
      Object.keys(myDocumentInformation).length !== 0 &&
      Object.keys(documentType).length !== 0
    ) {
      myDocumentInformation.data.map((item, index) => {
        Info.push(item);
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
        title="Document Request"
      >
        <FormDocumentRequest
          handleClose={handleClose}
          option={option}
          id={ID}
        />
      </ModalUpdate>
      <Grid container spacing={2} style={{ marginTop: "1px" }}>
        <Grid item xs={10} sm={7}>
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sm={5}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            className={classes.ButtonAdd}
            onClick={onClickAdd}
          >
            <pre>+ ADD</pre>
          </Button>
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

export default CardDocumentRequest;
