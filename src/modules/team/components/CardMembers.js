import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getTeamsInformation } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import FormAddMember from "./FormAddMember";
import { deleteMember } from "../actions";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../common/DataGrid";
import FormUpdateTeam from "./FormUpdateTeam";
import ModalUpdate from "../../common/ModalUpdate";
import FormAddTeam from "./FormAddTeam";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getMemberInformation } from "../actions";

import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { headers } from "./headersmember";
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

const CardTeamMembers = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { memberInformation } = useSelector((state) => state.teamReducer);
  const { teamID, host } = props;

  const [open, setopen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  const headerArray = { id: "ID", Name: "Name", Position: "Position" };

  let Header = headers;
  let Info = [];
  Header[Header.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    headerClassName: "bg-light-green",
    width: 90,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteForeverIcon />}
        label="Delete"
        disabled={params.row.Name === host ? true : false}
        onClick={onClickDelete(params.id)}
      />,
    ],
  };
  useEffect(() => {
    dispatch(getTeamsInformation());
    dispatch(getMemberInformation("", "", teamID));
  }, []);

  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteMember(teamID, [id]);
        dispatch(getMemberInformation("", "", teamID));
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

  const onClickAdd = () => {
    setopen(true);
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
    if (Object.keys(memberInformation).length !== 0) {
      memberInformation.data.map((item, index) => {
        Info.push(item);
      });
    }
  };
  setDataGrid();
  return (
    <>
      <ModalUpdate open={open} handleClose={handleClose} title="Add Member">
        <FormAddMember
          handleClose={handleClose}
          Info={Info}
          teamID={teamID}
          host={host}
        />
      </ModalUpdate>
      <Box className={classes.box}>
        <Card>
          <CardContent className={classes.cardcontant}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                justifyItems: "center",
                alignItems: "center",
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
              sortingOrder={["desc", "asc"]}
              sortModel={sortModel}
              onSortModelChange={(model) =>
                Info.length !== 0 ? setSortModel(model) : ""
              }
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50]}
              pagination
              headers={Header ? Header : ""}
              rows={searchText ? searchInfo : Info ? Info : ""}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CardTeamMembers;
