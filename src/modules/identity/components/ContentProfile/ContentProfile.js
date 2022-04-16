import React from "react";
import TypographyCustom from "../../../common/Typography/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../../common/Typography/Typography";
import styles from "./styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardPersonalInfo from "../TabsProfile/CardPersonalInfo";
import CardWorkInfo from "../TabsProfile/CardWorkInfo";
import CardContactInfo from "../TabsProfile/CardContactInfo";
import CardChangePassword from "../TabsAuthentication/CardChangePassword";
import CardLeaveInfomation from "../TabsLeaveInformation/CardLeaveInfomation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(styles);

const ContentProfile = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const breakPoint = useMediaQuery(theme.breakpoints.down(700));

  return (
    <div className={classes.box}>
      <div className={classes.margintop} />
      <TypographyCustom
        variant="h3"
        color="pink"
        fontWeight="medium"
        className={classes.headerTitle}
      >
        Account Profile
      </TypographyCustom>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              className={classes.tablist}
              variant="scrollable"
              scrollButtons={breakPoint}
              allowScrollButtonsMobile={breakPoint}
            >
              <Tab label="Profile" value="1" className={classes.tabitem} />
              <Tab
                label="Leave Information"
                value="2"
                className={classes.tabitem}
              />
              <Tab
                label="Authentication"
                value="3"
                className={classes.tabitem}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className={classes.tabpanel}>
            <CardPersonalInfo />
            <CardWorkInfo />
            <CardContactInfo />
          </TabPanel>
          <TabPanel value="2" className={classes.tabpanel2}>
            <CardLeaveInfomation />
          </TabPanel>
          <TabPanel value="3" className={classes.tabpanel}>
            <Typography
              variant="h6"
              fontWeight="bold"
              className={classes.maintext}
            >
              Sign In Method
            </Typography>
            {/* <CardChangeEmail /> */}
            <CardChangePassword />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ContentProfile;
