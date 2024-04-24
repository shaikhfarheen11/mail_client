import React, { useState } from "react";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import './EmailList.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMessage } from "./store/mailSlice";

function Emailbody({ id, name, subject, message, time, isNew }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRead, setIsRead] = useState(false);

    const handleOpenMessage = () => {
        dispatch(openMessage({
            id,
            name,
            subject,
            message,
            time
        }));
        // Navigate to the mail page
        navigate('/mail');
        // Mark the message as read
        setIsRead(true);
    };
    
    const messageDate = new Date(time).toLocaleDateString();
    const messageTime = new Date(time).toLocaleTimeString();

    const handleEmailClick = () => {
        if (isNew && !isRead) {
            // Update isNew state to false when the email is clicked
            setIsRead(true);
        }
        handleOpenMessage();
    };

    return (
        <div className={`emailbody ${isNew && !isRead ? 'new-message' : ''}`} onClick={handleEmailClick}>
            <div className="emailbody__left">
                <CheckBoxOutlineBlankIcon/>
                <StarBorderIcon/>
                <LabelOutlinedIcon/>
                <h4>{name}</h4>
            </div>
            <div className="emailbody__middle">
                <div className="emailbody__middle__msg">
                    <p><b>{subject}</b> {message}</p>
                </div>
            </div>
            <div className="emailbody__right">
                <p>{messageDate}</p>
                <p>{messageTime}</p>
            </div>
            {isNew && !isRead && <div className="blue-dot"></div>} 
        </div>
    );
}

export default Emailbody;
