import React, { useEffect } from "react";
import { NotificationList } from "../components/NotificationList";
import QRCode from "react-qr-code";
import { generateRandomString } from "../helpers";
import { Root } from "../components/Root";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { Router, useNavigate } from "react-router-dom";
import {
  getDeviceId,
  getSessionId,
  setDeviceId,
  setSessionId,
} from "../utils/helpers";
import { toast } from "react-hot-toast";

const SESSION_LOGGEDIN_LISTENER = gql`
  subscription sessionLoggedIn {
    sessionLoggedIn {
      device_id
      session_id
    }
  }
`;
export default function Index() {
  const sessionLoggedInListener = useSubscription(SESSION_LOGGEDIN_LISTENER);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionLoggedInListener?.data) {
      console.log(
        "sessionLoggedInListener?.data :  ",
        sessionLoggedInListener?.data
      );
      if (
        sessionLoggedInListener?.data?.session_id &&
        sessionLoggedInListener?.data?.device_id
      ) {
        toast.error("Connected Successfylly");
        navigate("/notification");
        setSessionId(sessionLoggedInListener?.data?.session_id);
        setDeviceId(sessionLoggedInListener?.data?.device_id);
      } else {
        toast.error("Cannot connect, Please try again");
      }
    }
  }, [sessionLoggedInListener?.data]);

  useEffect(() => {
    const sessionId = getSessionId();
    const deviceId = getDeviceId();
    if (sessionId && deviceId) {
      toast.error("Cannot connect, Please try again");
      navigate("/notification");
    }
  }, []);

  return (
    <Root>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <NotificationList title={"Test"} description={"Testing description"} /> */}
        <QRCode value={generateRandomString(20)} />
      </div>
    </Root>
  );
}
