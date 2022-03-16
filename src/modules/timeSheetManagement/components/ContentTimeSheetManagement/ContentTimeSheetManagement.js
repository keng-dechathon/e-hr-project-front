import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../../common/Typography/Typography";
import Box from "@mui/material/Box";
import styles from "./styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardChargeCode from "../TabChargeCode/CardChargeCode";
import CardLocation from "../TabLocation/CardLocation";

const useStyles = makeStyles(styles);

const ContentTimeSheetManagement = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className={classes.box}>
      <Typography variant="h3" color="pink" fontWeight="medium">
        Time Sheet Management
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} className={classes.tablist}>
              <Tab label="Charge Code" value="1" className={classes.tabitem} />
              <Tab label="Location" value="2" className={classes.tabitem} />
            </TabList>
          </Box>
          <TabPanel value="1" className={classes.tabpanel}>
            <CardChargeCode />
          </TabPanel>
          <TabPanel value="2" className={classes.tabpanel}>
            <CardLocation />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ContentTimeSheetManagement;
