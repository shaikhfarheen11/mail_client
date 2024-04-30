import React, { useState } from "react";
import { Row, Col, Badge, Button } from "react-bootstrap";
import { CheckBoxOutlineBlank, StarBorder, LabelOutlined, Delete } from '@material-ui/icons';
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
        navigate('/mail');
        setIsRead(true);
    };
    
    const messageDate = new Date(time).toLocaleDateString();
    const messageTime = new Date(time).toLocaleTimeString();

    const handleEmailClick = () => {
        if (isNew && !isRead) {
            setIsRead(true);
        }
        handleOpenMessage();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://mail-client-da555-default-rtdb.firebaseio.com/${id}.json`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete email');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error deleting email:', error);
        }
    };

    return (
        <div className={`emailbody ${isNew && !isRead ? 'new-message' : ''}`} onClick={handleEmailClick}>
            <Row className="emailbody__left">
                <Col>
                    <CheckBoxOutlineBlank />
                </Col>
                <Col>
                    <StarBorder />
                </Col>
                <Col>
                    <LabelOutlined />
                </Col>
                <Col>
                    <h4>{name}</h4>
                </Col>
            </Row>
            <Row className="emailbody__middle">
                <Col>
                    <div className="emailbody__middle__msg">
                        <p><b>{subject}</b> {message}</p>
                    </div>
                </Col>
            </Row>
            <Row className="emailbody__right">
                <Col>
                    <p>{messageDate}</p>
                </Col>
                <Col>
                    <p>{messageTime}</p>
                </Col>
            </Row>
            {isNew && !isRead && <Badge className="blue-dot" />}
            <div className="emailbody__delete" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                <Button variant="link"><Delete /></Button>
            </div>
        </div>
    );
}

export default Emailbody;
