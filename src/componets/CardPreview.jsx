import React from 'react';
import './CardPreview.css';

const CardPreview = ({ data }) => {
  const {
    fullName,
    jobTitle,
    email,
    phone,
    website,
    linkedIn,
    github,
    profilePreview,
  } = data;

  return (
    <div className="card-preview">
      {profilePreview && (
        <img src={profilePreview} alt="Profile" className="profile-img" />
      )}

      <h2>{fullName || 'Your Name'}</h2>
      <h4>{jobTitle || 'Job Title'}</h4>

      <div className="info">
        {email && <p>📧 {email}</p>}
        {phone && <p>📞 {phone}</p>}
        {website && (
          <p>
            🌐 <a href={website} target="_blank">{website}</a>
          </p>
        )}
        {linkedIn && (
          <p>
            🔗 <a href={linkedIn} target="_blank">LinkedIn</a>
          </p>
        )}
        {github && (
          <p>
            💻 <a href={github} target="_blank">GitHub</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
