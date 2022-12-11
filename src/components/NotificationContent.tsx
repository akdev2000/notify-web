import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { OriginalNotificationType } from "../pages/Notifications";

export default function NotificationContent(props: {
  notification: OriginalNotificationType;
}) {
  return (
    <Grid>
      <Paper elevation={3} sx={{ padding: 3, margin: 3 }}>
        <h2>{props.notification?.source}</h2>
        <h3>{props.notification?.title}</h3>
        <Typography variant="h5" >{moment(props.notification?.createdAt,true).format("DD, MMM YYYY")}</Typography>
        <Typography variant="h6" >{moment(props.notification?.createdAt,true).format("hh:mm:ss")}</Typography>
      </Paper>
    </Grid>
  );
}