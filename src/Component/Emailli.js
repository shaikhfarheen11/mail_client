import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import EmailListSetting from "./EmailListSetting";
// import EmailType from "./EmailType";
import Emailbody from "./Emailbody";
import Compose from "./Compose";

function Emailli() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const storedEmails = JSON.parse(localStorage.getItem("emails"));
        if (storedEmails) {
            setEmails(storedEmails);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("emails", JSON.stringify(emails));
    }, [emails]);

    const handleSend = async (composedMessage) => {
        setEmails([...emails, { id: Math.random(), data: composedMessage, isNew: true }]);
    };

    const handleDeleteEmail = (id) => {
        console.log("Deleting email with ID:", id);
    };
  
    useEffect(() => {
        console.log("Emails after deletion:", emails);
    }, [emails]);
        
    
    return (
        <div className="emaillist">
            {/* <EmailListSetting />
            <EmailType /> */}
            <Compose onSend={handleSend} /> 
            <Container fluid>
    {emails.filter(({ id, isDeleted }) => !isDeleted).map(({ id, data, isNew, isDeleted }) => ( 
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
    ))}
</Container>

        </div>
    );
}
export default Emailli;