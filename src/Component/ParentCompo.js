// ParentComponent.js

import React from 'react';
import Compose from './Compose';

function ParentComponent() {
  const handleSendEmail = (emailData) => {
    // Logic to send email
    console.log('Sending email:', emailData);
  };

  return (
    <div>
      <Compose onSend={handleSendEmail} isOpen={true} handleClose={() => {}} />
    </div>
  );
}

export default ParentComponent;
