import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmailListSetting from "./EmailListSetting";
import EmailType from "./EmailType";
import Emailbody from "./Emailbody";
import Compose from "./Compose";

function Emaillist() {
    const [emails, setEmails] = useState([]);

const fetchEmails = async () => {
    try {
        const response = await fetch("https://mail-client-da555-default-rtdb.firebaseio.com/emails.json");
        if (!response.ok) {
            throw new Error("Failed to fetch emails");
        }
        const data = await response.json();
    
        if (data) {
            const emailsArray = Object.keys(data).map(key => {
                const emailData = data[key];
                const isNew = localStorage.getItem(`email_${key}_read`) !== "true";
                return {
                    id: key,
                    data: emailData,
                    isNew: isNew,
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
        setEmails([...emails, { id: Math.random(), data: composedMessage, isNew: true }]);
    };

    const handleDeleteEmail = (id) => {
        setEmails(emails.map(email => email.id === id ? { ...email, isDeleted: true } : email));
    
        fetch(`https://mail-client-da555-default-rtdb.firebaseio.com/emails/${id}.json`, {
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
    const unreadCount = emails.filter(email => email.isNew && !email.isDeleted).length;
    
    return (
        <div className="emaillist">
            <EmailListSetting />
            <EmailType unreadCount={unreadCount} />
            <Compose onSend={handleSend} /> 
            <Container fluid>
                {emails.map(({ id, data, isNew, isDeleted }) => ( 
                    !isDeleted && (
                        <Row key={id}>
                            <Col>
                                <Emailbody
                                    id={id}
                                    name={data.to}
                                    subject={data.subject}
                                    message={data.message}
                                    time={data.timestamp}
                                    isNew={isNew}
                                    onDelete={() => handleDeleteEmail(id)} 
                                />
                            </Col>
                        </Row>
                    )
                ))}
            </Container>
        </div>
    );
}
export default Emaillist;