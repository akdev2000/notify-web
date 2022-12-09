import React from "react";
import { NotificationList } from "../components/NotificationList";
import QRCode from "react-qr-code";
import { generateRandomString } from "../helpers";
import { Root } from "../components/Root";
export default function index() {
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
