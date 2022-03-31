import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { getAllNewsInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import Typography from "../../../common/Typography/Typography";
import Box from "@mui/material/Box";
import { Divider } from "@material-ui/core";
import CardNewsList from "./CardNewsList";

const useStyles = makeStyles((theme) => ({
  emptyNews: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Topic: {
    marginBottom: "10px",
  },
  box: {
    padding: "40px 40px 0 40px ",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 20px  0 20px ",
    },
  },
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
  tabpanel: {
    padding: " 16px 0 !important",
  },
  headerTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px ",
    },
  },
}));

const ContantNewsManagement = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  let items = [];
  const { allNewsInformation } = useSelector((state) => state.newsReducer);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllNewsInformation());
  }, []);

  const createNewsItem = () => {
    if (
      Object.keys(allNewsInformation).length !== 0 &&
      allNewsInformation.status !== 404
    ) {
      allNewsInformation.data.map((value, index) => {
        items.push(value);
      });
    }
  };
  createNewsItem();

  return (
    <>
      <Box className={classes.box}>
        <Typography
          variant="h3"
          color="pink"
          fontWeight="medium"
          className={classes.headerTitle}
        >
          News Management
        </Typography>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            marginTop: "15px",
          }}
        >
          <Divider />
          <CardNewsList items={items} />
        </Box>
      </Box>
    </>
  );
};

export default ContantNewsManagement;
