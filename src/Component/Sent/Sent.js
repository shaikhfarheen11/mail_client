import React, { useEffect, useState } from 'react';
import Header from '../Inbox/Header';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Emailbody from '../Emailbody';
import Compose from '../Compose';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sent.css';

function Sent() {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const handleArrowButtonClick = () => {
    navigate('/header');
  };

  const handleComposeToggle = () => {
    setIsComposeOpen(!isComposeOpen);
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch("https://mail-client-da555-default-rtdb.firebaseio.com/sentEmails.json");
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();

      if (data) {
        const emailsArray = Object.keys(data).map(key => {
          const emailData = data[key];
          return {
            id: key,
            data: emailData,
            isDeleted: false
          };
        });
        setEmails(emailsArray);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchEmails();

    const interval = setInterval(fetchEmails, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (composedMessage) => {
    setEmails([...emails, { id: Math.random(), data: composedMessage }]);
  };

  const handleDeleteEmail = (id) => {
    setEmails(emails.map(email => email.id === id ? { ...email, isDeleted: true } : email));

    fetch(`https://mail-client-da555-default-rtdb.firebaseio.com/sentEmails/${id}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Email deleted successfully from Firebase');
    })
    .catch(error => {
      console.error('Error deleting email from Firebase:', error);
    });
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
            <Button variant="light" onClick={fetchEmails} data-testid="refresh-button">
              <RefreshIcon />
            </Button>
            <Button variant="light">
              <MoreVertIcon />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <div className="emaillist-container">
        {emails.map(({ id, data, isDeleted }) => (
          !isDeleted && (
            <Row key={id}>
              <Col>
                <Emailbody
                  id={id}
                  name={data.to}
                  subject={data.subject}
                  message={data.message}
                  time={data.timestamp}
                  onDelete={() => handleDeleteEmail(id)}
                />
              </Col>
            </Row>
          )
        ))}
      </div>

      {isComposeOpen && <Compose isOpen={isComposeOpen} handleClose={handleComposeToggle} onSend={handleSend} />}
    </div>
  );
}

export default Sent;
