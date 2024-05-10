import React, { useState, useEffect } from 'react';
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
  const [sentData, setSentData] = useState([]);

  const handleArrowButtonClick = () => {
    navigate('/header');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mail-client-da555-default-rtdb.firebaseio.com/sent.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSentData(data || []); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="emaildetails">
      <Header isRightCorner={true} />
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
        <Col className="emaillist__settingsRight"> 
          <ButtonGroup className="ml-auto">
            <Button variant="light">
              <RefreshIcon />
            </Button>
            <Button variant="light">
              <MoreVertIcon />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Emailli folder="sent" data={sentData} />
    </div>
  );
}

export default Sent;
