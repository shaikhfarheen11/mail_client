import React from "react";
import "./SidebarOp.css";

function SidebarOp({ Icon, title, number, isactive }) {
  return (
    <div className={`sidebar_op ${isactive && "sidebar_op--active"}`}>
      <div className="sidebar_op__content">
        <Icon />
        <h4>{title}</h4>
      </div>
      {isactive && <p>{number}</p>}
    </div>
  );
}

export default SidebarOp;
