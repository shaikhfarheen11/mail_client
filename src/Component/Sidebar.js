import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openSendMessage, closeSendMessage } from "./store/mailSlice";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import './Sidebar.css';
import SidebarOp from "./SidebarOp";
import InboxIcon from '@material-ui/icons/Inbox';
import StarRateIcon from '@material-ui/icons/StarRate';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Compose from "./Compose";

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    const handleSidebarOpClick = (path) => {
        console.log("Navigating to:", path); 
        navigate(path);
    };

    const handleComposeOpen = () => {
        setIsComposeOpen(true);
        dispatch(openSendMessage());
    };

    const handleComposeClose = () => {
        setIsComposeOpen(false);
        dispatch(closeSendMessage());
    };

    return (
        <div className="sidebar">
            <Button
                className="compose__btn"
                onClick={handleComposeOpen} >
                <Row className="align-items-center">
                    <Col><AddIcon />Compose</Col>
                </Row>
            </Button>

            <div className="sidebar-link" onClick={() => handleSidebarOpClick("/inbox")}>
                <SidebarOp Icon={InboxIcon} title="Inbox" number="224" isactive={true} />
            </div>
            <SidebarOp Icon={StarRateIcon} title={"Starred"} number={500} onClick={() => handleSidebarOpClick("/starred")} />
            <SidebarOp Icon={WatchLaterIcon} title={"Snoozed"} number={300} onClick={() => handleSidebarOpClick("/snoozed")} />
            <SidebarOp Icon={LabelImportantIcon} title={"Important"} number={452} onClick={() => handleSidebarOpClick("/important")} />
            
            <div className="sidebar-link" onClick={() => handleSidebarOpClick("/sent")}>
                <SidebarOp Icon={SendIcon} title="Sent" isactive={true} />
            </div>
            <SidebarOp Icon={DraftsIcon} title={"Drafts"} number={254} onClick={() => handleSidebarOpClick("/drafts")} />    

            <Compose isOpen={isComposeOpen} handleClose={handleComposeClose} />
        </div>
    );
}

export default Sidebar;
