import React from "react";
import { Badge } from 'react-bootstrap';
import "./SidebarOp.css";

function SidebarOp({ Icon, title, number, isactive }) {
  return (
    <div className={`sidebar_op ${isactive && "sidebar_op--active"}`}>
      <div className="sidebar_op__content">
        <Icon />
        <h4>{title}</h4>
      </div>
      {isactive && <Badge>{number}</Badge>}
    </div>
  );
}

export default SidebarOp;
