import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openMessage } from "./store/mailSlice";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import './EmailList.css';
import Delete from "@material-ui/icons/Delete";

function Emailbody({ id, name, subject, message, time, isNew, onDelete }) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRead, setIsRead] = useState(false);
   

    useEffect(() => {
        const readStatus = localStorage.getItem(`email_${id}_read`);
        setIsRead(readStatus === "true");
    }, [id]);

    const handleOpenMessage = () => {
        dispatch(openMessage({
            id,
            name,
            subject,
            message,
            time
        }));
        navigate('/mail');
        setIsRead(true);
        localStorage.setItem(`email_${id}_read`, "true");
    };
    
    const messageDate = new Date(time).toLocaleDateString();
    const messageTime = new Date(time).toLocaleTimeString();

    const handleEmailClick = () => {
        if (isNew && !isRead) {
            setIsRead(true);
            localStorage.setItem(`email_${id}_read`, "true");
        }
        handleOpenMessage();
    };

    const handleDelete = async (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 

        try {
            await onDelete(id);
        } catch (error) {
            console.error('Error deleting email:', error);
        }
    };

    return (
        <div className={`emailbody ${isNew && !isRead ? 'new-message' : ''}`} onClick={handleEmailClick}>
            <Row className="align-items-center">
                <Col>
                    <div className="emailbody__left">
            
                        <CheckBoxOutlineBlankIcon />
                        <StarBorderIcon />
                        <LabelOutlinedIcon />
                        <h4>{name}</h4>
                    </div>
                </Col>
                <Col>
                    <div className="emailbody__middle">
                        <div className="emailbody__middle__msg">
                            <p><b>{subject}</b> {message}</p>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="emailbody__right">
                        <p>{messageDate}</p>
                        <p>{messageTime}</p>
                        <div className="emailbody__delete" onClick={handleDelete}>

                            <Button variant="link"><Delete /></Button>
                        </div>
                    </div>
                </Col>
            </Row>
            {isNew && !isRead && <div className="blue-dot"></div>} 
        </div>
    );
}

export default Emailbody;   