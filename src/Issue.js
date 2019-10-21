import React from 'react';

import './Issue.css';

export const Issue = ({ avatarUrl, bodyText, createdAt, id, title, url }) => (
  <div key={id} className="Issue">
    <div className="Issue-info">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
      {bodyText}
      <br/>
      {new Date(createdAt).toDateString()}
    </div>
    <img className="Issue-avatar-container" src={avatarUrl} alt=""/>
  </div>
);