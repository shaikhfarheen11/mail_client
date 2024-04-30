import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom'; 
import './EmailList.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import { selectedMail } from './store/mailSlice';
import { IconButton } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import PrintIcon from '@material-ui/icons/Print';
import LaunchIcon from '@material-ui/icons/Launch';
import StarIcon from '@material-ui/icons/Star';
import ReplyIcon from '@material-ui/icons/Reply';

function EmailDetails() {
  const mail = useSelector(selectedMail);
  const navigate = useNavigate(); 
  const handleArrowButtonClick = () => {
    navigate('/header'); 
  };
  
  return (
    <div className="emaildetails">
      <Header isRightCorner={true} />
      <Row className="emaillist__Set">
        <Col className="emaillist__SettingsLeft">
          <ButtonGroup>
            <Button variant="light" onClick={handleArrowButtonClick}>
              <ArrowBackIcon />
            </Button>
            <Button variant="light">
              <ArrowDropDownIcon />
            </Button>
            <Button variant="light">
              <RefreshIcon />
            </Button>
            <Button variant="light">
              <MoreVertIcon />
            </Button>
          </ButtonGroup>
        </Col>
        <Col className="emaillist__settingsRight">
          <p>1-50 of 10,222</p>
          <ButtonGroup>
            <Button variant="light">
              <ChevronLeftIcon />
            </Button>
            <Button variant="light">
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <div className='emaildetails_message'>
        <Row className="emaildetails__header">
          <Col className='emaildetails__headerLeft'>
            <h4>{mail.subject}</h4>
            <IconButton>
              <LabelImportantIcon />
            </IconButton>
          </Col>
          <Col className='emaildetails__headerRight'>
            <IconButton>
              <PrintIcon />
            </IconButton>
            <IconButton>
              <LaunchIcon />
            </IconButton>
          </Col>
        </Row>
        <Row className="emaildetails__middleheader">
          <Col className='emaildetails__middleheaderLeft'>
            <IconButton>
              <Avatar />
            </IconButton>
            <h4>{mail.name}</h4>
            <p>{mail.email}</p>
          </Col>
          <Col className='emaildetails__middleheaderRight'>
            <p>{mail.time}</p>
            <IconButton>
              <StarIcon />
            </IconButton>
            <IconButton>
              <ReplyIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Col>
        </Row>
        <Row className='emaildetails_body'>
          <Col>
            <p>{mail.message}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EmailDetails;
