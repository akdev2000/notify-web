import { gql, useQuery, useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationContent from "../components/NotificationContent";
import { NotificationList } from "../components/NotificationList";
import { getSessionId, getDeviceId, clearLocalStorage } from "../utils/helpers";

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

const SESSION_LOG_OUT_LISTENER = gql`
  subscription logoutListener {
    logoutListener {
      device_id
      session_id
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
    device_id: string;
    session_id: string;
  };
};

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] = useState<any>();
  const sessionLogoutListener = useSubscription(SESSION_LOG_OUT_LISTENER);
  const getAllNotifications = useQuery<
    NotificationOutputType,
    NotificationInputType
  >(GET_NOTIFICATOINS, {
    variables: {
      input: {
        session_id: getSessionId(),
        device_id: getDeviceId(),
      },
    },
  });
  const navigate = useNavigate();

  const test = useQuery(gql`
    {
      test {
        id
      }
    }
  `);
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
    console.log("sessionLogoutListener?.data" , sessionLogoutListener?.data)
    if (sessionLogoutListener?.data) {
      if (sessionLogoutListener?.data?.logoutListener) {
        const { session_id, device_id } =
          sessionLogoutListener?.data?.logoutListener;
        const s_id = getSessionId();
        const d_id = getDeviceId();

        if (session_id.includes(s_id) && d_id == device_id) {
          clearLocalStorage();
          navigate("/");
        }
      }
    }
  }, [sessionLogoutListener?.data]);

  useEffect(() => {
    console.log("test : ", test.data);
  }, [test.data]);

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
        <NotificationContent
          notification={{
            ...selectedNotification,
            createdAt: new Date(selectedNotification?.createdAt),
          }}
        />
      </Grid>
    </Grid>
  );
}
