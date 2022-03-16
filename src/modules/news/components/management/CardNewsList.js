import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import noimg from "../../../../assets/noimg.png";
import { getAllNewsInformation } from "../../actions";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormNewsUpdate from "./FormNewsUpdate";
import { deleteNews } from "../../actions";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";

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
}));

const CardNewsList = ({ items }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNewsInformation());
  }, []);

  const headerArray = {
    News_id: "ID",
    Img: "Image",
    Topic: "Name",
    Detail: "Description",
    Date: "Create at",
    Start: "Begin at",
    End: "Expire at",
  };

  let newsHeader = React.useMemo(() => []);
  let newsInfo = [];

  const [searchInfo, setSearchInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [nowID, setNowID] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "News_id",
      sort: "desc",
    },
  ]);

  const handleClose = () => {
    setIsEdit(false);
  };

  const deletesNews = React.useCallback(
    (id) => () => {
      setIsDelete(true);
      setDeleteID(id);
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
        if (index === 0) {
          Object.keys(item).map((name, value) => {
            if (name === "Img" && headerArray[name])
              newsHeader.push({
                field: name,
                headerName: headerArray[name],
                width: "80",
                align: "center",
                headerClassName: "bg-light-green",

                flex: 1,
                sortable: false,
                renderCell: (params) => (
                  <img
                    src={
                      params.value && params.value != "null"
                        ? params.value
                        : noimg
                    }
                    className={classes.Img}
                  />
                ),
              });
            if (
              name === "Start" ||
              name === "End" ||
              (name === "Date" && headerArray[name])
            )
              newsHeader.push({
                field: name,
                headerName: headerArray[name],
                type: "dateTime",
                headerClassName: "bg-light-green",
                width: "180",
                sortable: false,
              });
            if (name === "Topic" || (name === "Detail" && headerArray[name]))
              newsHeader.push({
                field: name,
                headerName: headerArray[name],
                flex: 1,
                headerClassName: "bg-light-green",
                sortable: false,
              });
          });
        }
        newsInfo.push(item);
        newsInfo[index].id = item.News_id;
      });
      newsHeader.push({
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
            icon={<DeleteForeverIcon />}
            label="Delete"
            onClick={deletesNews(params.id)}
          />,
        ],
      });
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
  console.log(sortModel);
  return (
    <>
      <ModalUpdate open={isEdit} handleClose={handleClose} title="News Update">
        <FormNewsUpdate id={nowID} handleClose={handleClose} option={option} />
      </ModalUpdate>

      <Box className={classes.box}>
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
            onClick={addNews}
          >
            <pre>+ ADD</pre>
          </Button>
        </Box>
        <DataGrid
          sortingOrder={["desc", "asc"]}
          sortModel={sortModel}
          onSortModelChange={(model) =>
            newsInfo.length !== 0 ? setSortModel(model) : ""
          }
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          headers={newsHeader ? newsHeader : ""}
          rows={searchText ? searchInfo : newsInfo ? newsInfo : ""}
          rowHeight={90}
        />
      </Box>
    </>
  );
};

export default CardNewsList;
