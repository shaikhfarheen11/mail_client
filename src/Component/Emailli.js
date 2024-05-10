import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import EmailListSetting from "./EmailListSetting";
// import EmailType from "./EmailType";
import Emailbody from "./Emailbody";
import db from "./firebase"; 


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


    return (
        <div className="emaillist">
            {/* <EmailListSetting />
            <EmailType /> */} 
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

