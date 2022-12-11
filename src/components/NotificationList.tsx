import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  title?: string;
  description?: string;
  notification?: string;
  selected?: boolean;
  onClick?: () => void;
};

export type NotificatonProps = {
  app: string;
  audioContentsURI: string;
  bigText: string;
  extraInfoText: string;
  groupedMessages: string;
  icon: string;
  iconLarge: string;
  image: string;
  imageBackgroundURI: string;
  subText: string;
  summaryText: string;
  text: string;
  time: string;
  title: string;
  titleBig: string;
};
export function NotificationList(props: Props) {
  const [notificationdata, setNotificationData] = useState<NotificatonProps>();
  useEffect(() => {
    console.log("Propss:   ", props);
    if (props?.notification) {
      setNotificationData(JSON.parse(props.notification));
      console.log(JSON.parse(props.notification));
    }
  }, []);
  return (
    <div>
      <Grid container direction="row" justifyContent={"space-between"}>
        <Paper
          variant="elevation"
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 1,
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: props.selected ? "#ECECEC": "",
            cursor:"pointer"
          }}
          onClick={props.onClick}
        >
          <img
            //   src="data:image/jpeg;base64,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"
            src={notificationdata?.iconLarge}
            style={{ width: 50, height: 50 , marginRight:15}}
          />
          <div  >
            <Typography variant="h6">{notificationdata?.title}</Typography>
            <Typography variant="subtitle1">
              {notificationdata?.text}
            </Typography>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}
