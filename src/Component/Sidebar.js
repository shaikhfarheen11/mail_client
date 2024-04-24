import React from "react"
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import './Sidebar.css';
import SidebarOp from "./SidebarOp";
import InboxIcon from '@material-ui/icons/Inbox';
import StarRateIcon from '@material-ui/icons/StarRate';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useDispatch } from "react-redux";
import { openSendMessage } from "./store/mailSlice";


function Sidebar() {
    const dispatch = useDispatch();
    
    return (
        <div className="sidebar">
            <Button startIcon={<AddIcon/>}
        className="compose__btn" onClick={()=>dispatch(openSendMessage())}>Compose</Button>

            <SidebarOp Icon={InboxIcon} title="Inbox" number="224" isactive={true}/>
            <SidebarOp Icon={StarRateIcon} title={"Starred"} number={500}/>
            <SidebarOp Icon={WatchLaterIcon} title={"Snoozed"} number={300}/>
            <SidebarOp Icon={LabelImportantIcon} title={"Important"} number={452}/>
            <SidebarOp Icon={SendIcon} title={"Sent"} number={254}/>
            <SidebarOp Icon={DraftsIcon} title={"Drafts"} number={254}/>


        </div>
    )
}
export default Sidebar;