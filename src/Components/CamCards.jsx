import React from "react";
import "./CamCards.css";
import UserIcon from "./UserIcon";
import { getStatusIcon, getPriorityIcon } from "../getIcons";

function CamCards({
  ticket,
  userData,
  hideStatusIcon,
  hideProfileIcon,
  hidePriorityIcon,
}) {
  return (
    <div className="card">
      <div className="top-container">
        <div className="ticket-id">{ticket.id}</div>
        {hideProfileIcon ? null : (
          <UserIcon name={userData.name} available={userData.available} />
        )}
      </div>
      <div className="middle-container">
        {hideStatusIcon ? null : (
          <>
            <div className="middle-image">{getStatusIcon(ticket.status)}</div>
          </>
        )}

        <div className="title">{ticket.title}</div>
      </div>
      <div className="bottom-container">
        {hidePriorityIcon ? null : (
          <>
            <div className="more-icon-container">
              {getPriorityIcon(ticket.priority)}
            </div>
          </>
        )}
        {ticket.tag.map((t) => (
          <div key={t} className="tag-container">
            <div className="tag-icon"></div>
            <div className="tag-text">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CamCards;
