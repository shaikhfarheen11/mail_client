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
import useFetch from '../useFetch';

function Sent() {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { sendRequest } = useFetch(); 

  const handleArrowButtonClick = () => {
    navigate('/header');
  };

  const handleComposeToggle = () => {
    setIsComposeOpen(!isComposeOpen);
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const data = await sendRequest("https://mail-client-da555-default-rtdb.firebaseio.com/sentEmails.json");
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

    fetchEmails();

    const interval = setInterval(fetchEmails, 2000);
    return () => clearInterval(interval);
  }, [sendRequest]);

  const handleSend = async (composedMessage) => {
    setEmails([...emails, { id: Math.random(), data: composedMessage }]);
  };

  const handleDeleteEmail = async (id) => {
    try {
      await sendRequest(`https://mail-client-da555-default-rtdb.firebaseio.com/sentEmails/${id}.json`, 'DELETE');
      setEmails(emails.map(email => email.id === id ? { ...email, isDeleted: true } : email));
      console.log('Email deleted successfully from Firebase');
    } catch (error) {
      console.error('Error deleting email from Firebase:', error);
    }
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
            <Button variant="light" onClick={() => sendRequest("https://mail-client-da555-default-rtdb.firebaseio.com/sentEmails.json")}>
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
