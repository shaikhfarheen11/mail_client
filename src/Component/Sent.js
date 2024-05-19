import React from 'react';
import Header from './Header';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import RefreshIcon from '@material-ui/icons/Refresh';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import './EmailList.css';
import Emailli from './Emailli';

function Sent() {
  const navigate = useNavigate();
  
  const handleArrowButtonClick = () => {
    navigate('/header');
  };

  return (
    <div className="emaildetails">
      <Header />
      <Row className="emaillist__Set">
        <Col className="emaillist__SettingsLeft">
          <ButtonGroup>
            <Button variant="light">
              <CheckBoxOutlineBlankIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="light" onClick={handleArrowButtonClick}>
              <ArrowBackIcon />
            </Button>
            <Button variant="light">
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </Col>
        <Col className="emaillist__SettingsRight">
          <ButtonGroup className="float-right">
            <Button variant="light">
              <RefreshIcon />
            </Button>
            <Button variant="light">
              <MoreVertIcon />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <div className="emaillist-container">
        <Emailli />
      </div>
    </div>
  );
}

export default Sent;
