import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import styles from "./styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import { green } from "@mui/material/colors";
import ModalUpdate from "../../common/ModalUpdate";
import FormChangeEmail from "./FormChangeEmail";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "55px",
    // backgroundColor: '#F1F3FF !important',
    // boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important',
    borderRadius: "7px !important",
    marginTop: "15px",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      width: "50% ",
    },
  },
  cardheader: {
    [`& .css-1qvr50w-MuiTypography-root`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  input: {
    display: "none",
  },
  content: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    // backgroundColor:'black',
    padding: "0 !important",
  },
  maintext: {
    width: "200px",
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  margintop: {
    marginTop: "10px",
  },
  IconButton: {
    marginRight: "10px !important",
    flexDirection: "flex-end",
  },
  typography: {
    width: "100%",
    padding: "10px 0px 10px 20px",
  },
}));

const CardChangeEmail = (props) => {
  const classes = useStyles();
  const { id } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Update Email Address"
      >
        <FormChangeEmail handleClose={handleClose} id={id} />
      </ModalUpdate>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardheader}
          title={<EmailIcon sx={{ color: green[500], fontSize: "30px" }} />}
        ></CardHeader>
        <Divider orientation="vertical" flexItem />
        <CardContent className={classes.content}>
          <Typography
            variant="body1"
            fontWeight="bold"
            textAlign="left"
            className={classes.typography}
          >
            Email Address
          </Typography>
          <IconButton className={classes.IconButton} onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
};

export default CardChangeEmail;
