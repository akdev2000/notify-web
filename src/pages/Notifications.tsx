import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { NotificationList } from "../components/NotificationList";

const GET_NOTIFICATOINS = gql`
  query getNotificationByID($token: String!) {
    getNotificationByID(token: $token) {
      user_id
      source
      title
      mainTitle
      notificationData
      notificationReceivedTime
    }
  }
`;

type NotificationOutputType = {
  getNotificationByID: {
    id: number;
    user_id: number;
    source: string;
    title: string;
    mainTitle: string;
    notificationData: string;
    notificationReceivedTime: Date;
    createdAt: string;
    updatedAt: string;
  }[];
};
export default function Notifications() {
  const getAllNotifications = useQuery<
    NotificationOutputType,
    { token: string }
  >(GET_NOTIFICATOINS, {
    variables: {
      token: "Fdf",
    },
  });
  useEffect(() => {
    if (getAllNotifications.data) {
      console.log("getAllNotifications.data : ", getAllNotifications.data);
    }
  }, [getAllNotifications.data, getAllNotifications.error]);
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {getAllNotifications?.data?.getNotificationByID?.map((notification) => {
        return (
          <NotificationList
            title={notification.title}
            description={notification.mainTitle}
            notification={notification.notificationData}
          />
        );
      })}
    </div>
  );
}
