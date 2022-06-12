import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../../common/Typography/Typography";
import styles from "./styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { getAccountInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@mui/material/Skeleton";
import ModalUpdate from "../../../common/ModalUpdate";
import FormUpdateContactInfo from "./FormUpdateContactInfo";
const useStyles = makeStyles(styles);

const CardContactInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const personalData = [],
    initial = {};
  const { accountInformation } = useSelector((state) => state.accountReducer);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notSet = (
    <Typography
      variant="body1"
      fontWeight="light"
      color="mute"
      className={classes.maintext}
    >
      Not Set
    </Typography>
  );

  useEffect(() => {
    dispatch(getAccountInformation());
  }, []);

  const setDataInfo = () => {
    if (Object.keys(accountInformation).length !== 0) {
      let hostString = "";
      accountInformation.Team_Info.map((temp) => {
        hostString += temp.HostName;
        hostString += ",";
        hostString += " ";
      });
      hostString = String(hostString).substring(0, hostString.length - 2);

      personalData.push({
        title: "Email Address",
        value:
          accountInformation.Email && accountInformation.Email !== "null"
            ? accountInformation.Email
            : notSet,
      });
      personalData.push({
        title: "Phone",
        value:
          accountInformation.Phone && accountInformation.Phone !== "null"
            ? accountInformation.Phone
            : notSet,
      });
      personalData.push({
        title: "Address",
        value:
          accountInformation.Address && accountInformation.Address !== "null"
            ? accountInformation.Address
            : notSet,
      });
      personalData.push({
        title: "Supervisor",
        value: hostString ? hostString : notSet,
      });
    }
  };
  console.log(accountInformation);
  setDataInfo();
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Contact Information"
      >
        <FormUpdateContactInfo handleClose={handleClose} />
      </ModalUpdate>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton onClick={handleOpen}>
              <EditIcon />
            </IconButton>
          }
          title={<div className={classes.headerText}>Contact Information</div>}
          className={classes.cardheader}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {personalData.map((items, indexs) => {
                return (
                  <div
                    className={
                      Object.keys(accountInformation).length !== 0
                        ? classes.textbox
                        : classes.textboxSkeleton
                    }
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      className={classes.maintext}
                    >
                      {items.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="light"
                      className={classes.subtext}
                    >
                      {Object.keys(accountInformation).length !== 0 ? (
                        items.value
                      ) : (
                        <Skeleton width={"100%"} height={40} animation="wave" />
                      )}
                    </Typography>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CardContactInfo;
