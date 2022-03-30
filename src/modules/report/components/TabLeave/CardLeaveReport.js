import React from "react";

import CardAllLeaveTable from "./CardAllLeaveTable";
import { Grid } from "@mui/material";


const CardLeaveReport = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardAllLeaveTable />
      </Grid>   
    </Grid>
  );
};

export default CardLeaveReport;
