import React, { useState } from "react";
import './Compose.css';
import RemoveIcon from '@material-ui/icons/Remove';
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

function Compose({ onSend }) { // Accept the onSend prop
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [timestamp, setTimestamp] = useState("");
    const dispatch = useDispatch();

    const formSubmit = async (e) => {
        e.preventDefault();
        const sanitizedTo = to.trim().replace(/[@.]/g, "");
        const sanitizedSubject = subject.trim();
        const sanitizedMessage = message.trim();

        if (sanitizedTo === "") {
            return alert("To is required");
        }
        if (sanitizedSubject === "") {
            return alert("Subject is required");
        }
        if (sanitizedMessage === "") {
            return alert("Message is required");
        }

        const currentTimestamp = new Date().toLocaleString();

        try {
            const response = await fetch('https://react-mail-2c482-default-rtdb.firebaseio.com/emails.json', {
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

            // Clear input fields after sending the message
            setTo("");
            setSubject("");
            setMessage("");

            setTimeout(() => {
                setShowSuccessMessage(false);
                dispatch(closeSendMessage());
            }, 3000);

            // Call the onSend prop with composed message
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
                    <CloseIcon onClick={() => dispatch(closeSendMessage())} />
                </div>
            </div>
            <form onSubmit={formSubmit}>
                <div className="compose__body">
                    <div className="compose__bodyForm">
                        <input type="email" name="email" placeholder="Recipients" value={to} onChange={(e) => setTo(e.target.value)} />
                        <input type="text" name="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        <textarea rows="20" name="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="compose__footer">
                    <div className="compose__footerLeft">
                        <button type="submit">
                            Send <ArrowDropDownIcon />
                        </button>
                    </div>
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
            </form>
        </div>
    );
}

export default Compose;
