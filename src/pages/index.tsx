import React from 'react'
import { NotificationList } from '../components/NotificationList'
import QRCode from "react-qr-code"
import { generateRandomString } from '../helpers'
export default function index() {
    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} >
            {/* <NotificationList  
                title={"Test"}
                description={"Testing description"}
            /> */}
            <QRCode value={generateRandomString(20)}  />
        </div>
    )
}
