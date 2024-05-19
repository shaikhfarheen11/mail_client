import React from "react";
import { Row, Col } from 'react-bootstrap';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmailType({ unreadCount }) {
    return (
        <Row className="emailtype">
            <Col xs={4} className="emailtype__options emailtype__options--active text-center">
                <InboxIcon />
                <p>Primary ({unreadCount})</p>
            </Col>
            <Col xs={4} className="emailtype__options text-center">
                <PeopleIcon />
                <p>Social</p>
            </Col>
            <Col xs={4} className="emailtype__options text-center">
                <LocalOfferIcon />
                <p>Promotions</p>
            </Col>
        </Row>
    );
}

export default EmailType;
