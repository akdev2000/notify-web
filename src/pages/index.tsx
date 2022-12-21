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

const generatedSessionId = generateRandomString(20);


export default function Index() {
  const sessionLoggedInListener = useSubscription(SESSION_LOGGEDIN_LISTENER,{
    onData: (data) => {
      console.log("Subscription Data : " , data)
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionLoggedInListener?.data?.sessionLoggedIn) {
      console.log(
        "sessionLoggedInListener?.data :  ",
        sessionLoggedInListener?.data
      );
      if (
        sessionLoggedInListener?.data?.sessionLoggedIn?.session_id == generatedSessionId &&
        sessionLoggedInListener?.data?.sessionLoggedIn?.device_id
      ) {
        toast.success("Connected Successfylly");
        navigate("/notification");
        setSessionId(sessionLoggedInListener?.data?.sessionLoggedIn?.session_id);
        setDeviceId(sessionLoggedInListener?.data?.sessionLoggedIn?.device_id);
      } else {
        toast.error("Cannot connect, Please try again");
      }
    }
  }, [sessionLoggedInListener?.data]);

  useEffect(() => {
    const sessionId = getSessionId();
    const deviceId = getDeviceId();
    if (sessionId && deviceId) {
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
        <QRCode value={generatedSessionId} />
        {/* <button>test</button> */}
      </div>
    </Root>
  );
}
