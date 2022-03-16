import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormChargeCodeUpdate from "./FormChargeCodeUpdate";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { getChargeCode, deleteChargeCode } from "../../actions";
import { headers } from "./headers";
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

const CardChargeCode = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  console.log(chargeCodeInformation);
  const [nowID, setNowID] = useState("");
  const [open, setopen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [option, setOption] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  let Header = headers;
  let Info = [];
  Header[2] = {
    field: "actions",
    type: "actions",
    width: 90,
    headerName: "Action",
    headerClassName: "bg-light-green",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={onClickUpdate(params.id)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  };
  useEffect(() => {
    dispatch(getChargeCode());
  }, []);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteChargeCode(String(id));
        dispatch(getChargeCode());
      };
      onDelete(deleteID);
      setDeleteID("");
    }
  }, [deleteID]);

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
    },
    []
  );

  const onClickUpdate = React.useCallback(
    (id) => () => {
      setopen(true);
      setOption("update");
      setNowID(id);
    },
    []
  );
  const onClickAdd = () => {
    setopen(true);
    setOption("add");
  };

  const handleClose = () => {
    setopen(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          console.log(row[field].toString());
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setDataGrid = () => {
    if (Object.keys(chargeCodeInformation).length !== 0) {
      chargeCodeInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.ChargeCode_id;
      });
    }
  };
  setDataGrid();
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Charge Code Update"
      >
        <FormChargeCodeUpdate
          id={nowID}
          handleClose={handleClose}
          option={option}
        />
      </ModalUpdate>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          justifyItems: "center",
          alignItems: "center",
          pt: "10px",
          pb: "10px",
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
          <pre>+ ADD</pre>
        </Button>
      </Box>
      <DataGrid
        headers={Header ? Header : ""}
        rows={searchText ? searchInfo : Info ? Info : ""}
      />
    </>
  );
};

export default CardChargeCode;
