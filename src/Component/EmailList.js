import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmailListSetting from "./EmailListSetting";
import EmailType from "./EmailType";
import Emailbody from "./Emailbody";
import db from "./firebase"; 
import Compose from "./Compose";

function Emaillist() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        db.collection("emails").orderBy("timestamp","desc").onSnapshot(snapshot=>{
            setEmails(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data(),
                isNew: true 
            })))
        })
    }, []);

    const handleSend = async (composedMessage) => {
        try {
            await db.collection("emails").add(composedMessage);
            console.log("Message sent successfully");
            setEmails([...emails, { id: Math.random(), data: composedMessage, isNew: true }]);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };
    
    

    return (
        <div className="emaillist">
            <EmailListSetting />
            <EmailType />
            <Compose onSend={handleSend} /> 
            <Container fluid>
                {emails.map(({ id, data, isNew }) => ( 
                    <Row key={id}>
                        <Col>
                            <Emailbody
                                name={data.to}
                                subject={data.subject}
                                message={data.message}
                                time={data.timestamp}
                                isNew={isNew} 
                            />
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default Emaillist;
