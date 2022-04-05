import React, { useEffect } from "react";
import svgimg from "../../../../assets/svgimg.svg";
import { getNewsInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link as LinkDom } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@mui/material/Card";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { navHeight } from "../../../layout/components/Attribute";
const useStyles = makeStyles((theme) => ({
  box: {
    padding: "40px 80px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 40px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
    height: "100%",
  },
  breadCrumb: {
    [theme.breakpoints.down("xs")]: {
      padding: "30px 0px 10px 15px",
    },
  },
  card: {
    marginTop: "15px !important",
    padding: "40px 80px",
    width: "100%",
    // backgroundColor: '#F1F3FF !important',
    boxShadow: "rgba(0, 0, 0, 0.10) 0px 5px 10px 0px !important",
    borderRadius: "5px !important",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
      height: `calc(100% - ${navHeight} - 20px)` ,
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 40px",
    },
  },
  img: {
    display: "flex  !important",
    width: "60% !important",
    minWidth: "400px",
    height: "400px  !important",
    backgroundRepeat: "no-repeat  !important",
    borderRadius: "0 !important  !important",
    backgroundPosition: "center  !important",
    backgroundSize: "cover  !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    flexDirection: "column  !important",
    color: "white !important ",
    [theme.breakpoints.down("xs")]: {
      width: "70% !important",
      height: "200px  !important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80% !important",
      height: "200px  !important",
    },
  },
  ImgBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    flexDirection: "column",
  },
  bodyText: {
    marginTop: "30px !important",
    padding: "0 50px  !important",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
    [theme.breakpoints.down("xs")]: {
      padding: "0 10px  !important",
    },
  },
  bodyText2: {
    marginTop: "30px !important",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
  },
  date: {
    display: "flex",
    marginTop: "10px !important",
    alignItems: "center",
  },
  icon: {
    width: "17px !important",
    height: "17px  !important",
    marginRight: "7px",
  },
}));

const NewsView = (props) => {
  const classes = useStyles();
  let { id } = useParams();
  const dispatch = useDispatch();
  const item = [];
  const { newsInformation } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    dispatch(getNewsInformation());
  }, []);

  const createNews = () => {
    if (Object.keys(newsInformation).length !== 0) {
      newsInformation.data.map((value, index) => {
        if (value.News_id === id) item.push(value);
      });
      console.log(item);
    }
  };

  createNews();

  return (
    <>
      <Box className={classes.box}>
        <Breadcrumbs
          aria-label="breadcrumb"
          className={classes.breadCrumb}
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <LinkDom to={"/news"}>
            <Link underline="hover" color="inherit">
              News
            </Link>
          </LinkDom>
          <Typography
            color="text.primary"
            style={{
              textOverflow: "ellipsis",
              wordBreak: "break-all",
              maxWidth: "1000px",
            }}
          >
            {item.length !== 0 ? (
              item[0].Topic
            ) : (
              <Skeleton width={"100%"} height={40} animation="wave" />
            )}
          </Typography>
        </Breadcrumbs>

        <Card className={classes.card} key={id}>
          <Typography variant="h5" color="text.primary">
            {item.length !== 0 ? (
              item[0].Topic
            ) : (
              <Skeleton width={"100%"} height={40} animation="wave" />
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className={classes.date}
          >
            <AccessTimeIcon className={classes.icon} />{" "}
            {item.length !== 0 ? (
              item[0].Start
            ) : (
              <Skeleton width={"100%"} height={40} animation="wave" />
            )}
          </Typography>
          <div
            className={
              item.length !== 0 && item[0].Img && item[0].Img !== "null"
                ? classes.ImgBox
                : ""
            }
          >
            <div
              className={
                item.length !== 0 && item[0].Img !== "null" && item[0].Img
                  ? classes.img
                  : ""
              }
              style={{
                backgroundImage: `url(${item.length !== 0 ? item[0].Img : ""})`,
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              className={
                item.length !== 0 && item[0].Img && item[0].Img !== "null"
                  ? classes.bodyText
                  : classes.bodyText2
              }
            >
              {item.length !== 0 ? (
                item[0].Detail === "" && item[0].Detail !== "null" ? (
                  "no description"
                ) : (
                  item[0].Detail
                )
              ) : (
                <Skeleton width={"100%"} height={40} animation="wave" />
              )}
            </Typography>
          </div>
        </Card>
      </Box>
    </>
  );
};

export default NewsView;
