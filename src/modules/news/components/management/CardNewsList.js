import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import noimg from "../../../../assets/noimg.png";
import { getAllNewsInformation } from "../../actions";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FormNewsUpdate from "./FormNewsUpdate";
import { deleteNews } from "../../actions";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { headers } from "./headers";
import { Grid } from "@mui/material";
import ConfirmDialog from "../../../common/ConfirmDialog";
import moment from "moment";
const useStyles = makeStyles(() => ({
  tabitem: {
    marginRight: "30px !important",
    padding: "0 !important",
    minWidth: "150px !important",
    textTransform: "none !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
    "&:hover": {
      color: "#C91F92 !important",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#C91F92 !important",
    },
  },
  tablist: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#C91F92 !important",
    },
  },
  box: {
    marginTop: "15px",
  },
  Img: {
    height: "90px",
  },
  ButtonAdd: {
    display: "flex",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  searchBox: {
    height: "59px",
  },
}));

const CardNewsList = ({ items, isLoading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNewsInformation());
  }, []);

  let newsHeader = headers;
  let newsInfo = [];

  const [searchInfo, setSearchInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [nowID, setNowID] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([
    {
      field: "News_id",
      sort: "desc",
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  newsHeader[headers.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    width: 90,
    headerClassName: "bg-light-green",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={updateNews(params.id)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={deletesNews(params.id)}
      />,
    ],
  };
  const handleClose = () => {
    setIsEdit(false);
  };

  const deletesNews = React.useCallback(
    (id) => () => {
      setDeleteID(id);
      setOpenDialog(true);
    },
    []
  );

  const updateNews = React.useCallback(
    (id) => () => {
      setOption("update");
      setIsEdit(true);
      setNowID(id);
    },
    []
  );

  const addNews = () => {
    setOption("add");
    setIsEdit(true);
  };

  const ConfirmDelete = () => {
    setIsDelete(true);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (deleteID !== "" && isDelete) {
      const onDelete = async (id) => {
        await deleteNews([id]);
        dispatch(getAllNewsInformation());
      };

      onDelete(deleteID);
      setIsDelete(false);
      setDeleteID("");
    }
  }, [deleteID, isDelete]);

  const setNewsDataGrid = () => {
    if (Object.keys(items).length !== 0) {
      items.map((item, index) => {
        item = JSON.parse(JSON.stringify(item));

        newsInfo.push(item);
        newsInfo[index].id = item.News_id;
        newsInfo[index].Start = moment(item.Start).format(
          "DD/MM/YYYY, HH:mm:ss"
        );
        newsInfo[index].End = moment(item.End).format("DD/MM/YYYY, HH:mm:ss");
      });
      if (newsInfo.length !== 0) newsInfo.reverse();
    }
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (newsInfo.length !== 0) {
      const filteredRows = newsInfo.filter((row) => {
        return Object.keys(row).some((field) => {
          if (field !== "Img" && field !== "Creator")
            return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  setNewsDataGrid();
  return (
    <>
      <ConfirmDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        onClick={ConfirmDelete}
        message={"Do you insist on deleting news ?"}
      />
      <ModalUpdate open={isEdit} handleClose={handleClose} title="News Update">
        <FormNewsUpdate id={nowID} handleClose={handleClose} option={option} />
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
          className={classes.searchBox}
        >
          <Button
            variant="outlined"
            className={classes.ButtonAdd}
            onClick={addNews}
          >
            <pre>+ ADD</pre>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sortingOrder={["desc", "asc"]}
            sortModel={sortModel}
            onSortModelChange={(model) =>
              newsInfo.length !== 0 ? setSortModel(model) : ""
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50]}
            headers={newsHeader ? newsHeader : ""}
            loading={isLoading}
            rows={searchText ? searchInfo : newsInfo ? newsInfo : ""}
            rowHeight={90}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardNewsList;
