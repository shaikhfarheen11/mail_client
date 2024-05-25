import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmailListSetting from "./EmailListSetting";
import EmailType from "./EmailType";
import Emailbody from "./Emailbody";
import Compose from "./Compose";
import useFetch from "./useFetch";

function Emaillist() {
    const [emails, setEmails] = useState([]);
    const { isLoading, error, sendRequest } = useFetch();

    const fetchEmails = useCallback(async () => {
        try {
            const data = await sendRequest("https://mail-client-da555-default-rtdb.firebaseio.com/emails.json");
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
    }, [sendRequest]);

    useEffect(() => {
        const interval = setInterval(fetchEmails, 2000);
        return () => clearInterval(interval);
    }, [fetchEmails]);

    const handleSend = async (composedMessage) => {
        try {
            const data = await sendRequest(
                "https://mail-client-da555-default-rtdb.firebaseio.com/emails.json",
                "POST",
                composedMessage
            );
            setEmails([...emails, { id: data.name, data: composedMessage, isNew: true }]);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const handleDeleteEmail = async (id) => {
        setEmails(emails.map(email => email.id === id ? { ...email, isDeleted: true } : email));

        try {
            await sendRequest(
                `https://mail-client-da555-default-rtdb.firebaseio.com/emails/${id}.json`,
                "DELETE"
            );
            console.log('Email deleted successfully from Firebase');
        } catch (error) {
            console.error('Error deleting email from Firebase:', error);
        }
    };

    const unreadCount = emails.filter(email => email.isNew && !email.isDeleted).length;

    return (
        <div className="emaillist">
            <EmailListSetting />
            <EmailType unreadCount={unreadCount} />
            <Compose onSend={handleSend} />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
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
