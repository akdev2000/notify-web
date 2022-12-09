import React, { ReactElement } from "react";

type Props = {
  children: React.ReactElement;
};
export function Root(props: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: window.innerHeight,
      }}
    >
      <div style={{marginTop:10}} >
        <h2 style={{ margin: 20,textAlign:"center" }}>Notify</h2>
        {props.children}
      </div>
      <div style={{ marginBottom: 30 }}>Copyrights@</div>
    </div>
  );
}
