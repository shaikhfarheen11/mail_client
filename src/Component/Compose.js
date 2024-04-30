import React, { useState } from "react";
import './Compose.css';
import RemoveIcon from '@material-ui/icons/Remove';
import {Button, Form, Row } from 'react-bootstrap';
import HeightIcon from '@material-ui/icons/Height';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PhotoIcon from '@material-ui/icons/Photo';
import PhonelinkLockIcon from '@material-ui/icons/PhonelinkLock';
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { closeSendMessage } from "./store/mailSlice";
import { useDispatch } from "react-redux";


function Compose({ onSend }) {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [timestamp, setTimestamp] = useState("");
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeSendMessage());
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const sanitizedTo = to.trim();
        const sanitizedSubject = subject.trim();
        const sanitizedMessage = message.trim();
    
        // Validate email format
        if (!sanitizedTo.includes("@")) {
            return alert("Please enter a valid email address");
        }
    
        if (sanitizedSubject === "") {
            return alert("Subject is required");
        }
        if (sanitizedMessage === "") {
            return alert("Message is required");
        }
    
        const currentTimestamp = new Date().toLocaleString();
    
        try {
            const response = await fetch('https://mail-client-da555-default-rtdb.firebaseio.com/emails.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: sanitizedTo,
                    subject: sanitizedSubject,
                    message: sanitizedMessage,
                    timestamp: currentTimestamp
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send data to the database');
            }
    
            console.log("Email sent successfully");
            setShowSuccessMessage(true);
            setTimestamp(currentTimestamp);
    
            setTo("");
            setSubject("");
            setMessage("");
    
            setTimeout(() => {
                setShowSuccessMessage(false);
                dispatch(closeSendMessage());
            }, 3000);
            onSend({
                to: sanitizedTo,
                subject: sanitizedSubject,
                message: sanitizedMessage,
                timestamp: currentTimestamp
            });
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };
    
    return (
        <div className="compose">
            <div className="success-message" style={{ display: showSuccessMessage ? "block" : "none" }}>Email sent successfully at {timestamp}</div>

            <div className="compose__header">
                <div className="compose__header__left">
                    <span>New message</span>
                </div>
                <div className="compose__header__right">
                    <RemoveIcon />
                    <HeightIcon />
                    <CloseIcon onClick={handleClose} />
                </div>
            </div>
            <Form onSubmit={formSubmit}>
                <div className="compose__body">
                    <div className="compose__bodyForm">
                <Form.Group as={Row}>
                   <Form.Control type="email" placeholder="Recipients" value={to} onChange={(e) => setTo(e.target.value)} />
                            
                 </Form.Group>
              <Form.Group as={Row}>
            <Form.Control type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                   
            </Form.Group>
            <Form.Group as={Row}>
           <Form.Control as="textarea" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </Form.Group>
                    </div>
                </div>
                <div className="compose__footer">
                    <Button type="submit">
                        Send <ArrowDropDownIcon />
                    </Button>
                    <div className="compose__footerRight">
                        <FormatColorTextIcon />
                        <AttachFileIcon />
                        <LinkIcon />
                        <InsertEmoticonIcon />
                        <NoteAddIcon />
                        <PhotoIcon />
                        <PhonelinkLockIcon />
                        <CreateIcon />
                        <MoreVertIcon />
                        <DeleteIcon />
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Compose;