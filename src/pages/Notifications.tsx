import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationContent from "../components/NotificationContent";
import { NotificationList } from "../components/NotificationList";

const GET_NOTIFICATOINS = gql`
  query getNotificationByID($input: NotificationInputType!) {
    getNotificationByID(input: $input) {
      id
      user_id
      source
      title
      mainTitle
      notificationData
      notificationReceivedTime
      createdAt
    }
  }
`;

type NotificationOutputType = {
  getNotificationByID: OriginalNotificationType[];
};

export type OriginalNotificationType = {
  id: number;
  user_id: number;
  source?: string;
  title?: string;
  mainTitle?: string;
  notificationData?: string;
  notificationReceivedTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
type NotificationInputType = {
  input: {
    device_id: String;
    session_id: String;
  };
};

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] = useState<any>();
  const getAllNotifications = useQuery<
    NotificationOutputType,
    NotificationInputType
  >(GET_NOTIFICATOINS, {
    variables: {
      input: {
        session_id: "St6Sj74PnmsC^hXS2UPR",
        device_id: "malta_64",
      },
    },
  });

  const test = useQuery(gql`{
    test {
      id
    }
  }`)
  useEffect(() => {
    if (getAllNotifications.data) {
      if (getAllNotifications.data?.getNotificationByID?.length > 0) {
        setSelectedNotification(
          getAllNotifications?.data?.getNotificationByID[0]
        );
      }
      console.log("getAllNotifications.data : ", getAllNotifications.data);
    }
  }, [getAllNotifications.data]);

  useEffect(() => {
    console.log("test : " , test.data)
  },[test.data])

  // function clickNotification() {
  //     setSelectedNotification()
  // }
  return (
    <Grid
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   flexDirection
      //   // justifyContent: "space-between",
      // }}
      container
      direction={"row"}
      flexDirection="row"
    >
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: window.innerHeight,
          overflow: "scroll",
        }}
        item
        xs={3}
      >
        {getAllNotifications?.data?.getNotificationByID?.map((notification) => {
          return (
            <NotificationList
              title={notification?.title}
              description={notification?.mainTitle}
              notification={notification?.notificationData}
              selected={notification.id == selectedNotification?.id}
              onClick={() => {
                console.log("Notificatiom: ", notification);
                setSelectedNotification(notification);
              }}
            />
          );
        })}
      </Grid>
      <Grid alignItems={"center"} item xs={9}>
        <NotificationContent notification={{...selectedNotification,createdAt:new Date(selectedNotification?.createdAt)}} />
      </Grid>
    </Grid>
  );
}
