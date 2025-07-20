import React from 'react';
import './CardPreview.css';
import { motion } from 'framer-motion';

const CardPreviewFront = ({ data, theme, styleProps }) => {
  const { fullName, jobTitle, phone, profilePreview, about } = data;

  const cardBgColor = styleProps?.cardBgColor || '#ffffff';
  const textColor = styleProps?.textColor || '#000000';
  const font = styleProps?.font || 'sans-serif';
  const fontSize = styleProps?.fontSize || 16;
  const bgImage = styleProps?.bgImage || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`card-container vertical-layout ${theme}`}
      style={{
        maxHeight: '600px',
        overflowY: 'auto',
        backgroundColor: cardBgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '20px',
        color: textColor,
        fontFamily: font,
        fontSize: `${fontSize}px`,
      }}
    >
      {profilePreview && (
        <div className="card-cover">
          <img src={profilePreview} alt="Profile" className="cover-img" />
        </div>
      )}

      <div className="card-details">
        <h3
          className="name-text"
          style={{ color: textColor, fontFamily: font, fontSize: `${fontSize + 4}px` }}
        >
          {fullName || 'Full Name'}
        </h3>
        <p
          className="job-title-text"
          style={{ color: textColor, fontFamily: font, fontSize: `${fontSize}px` }}
        >
          {jobTitle || 'Job Title'}
        </p>
        {phone && (
          <p
            className="contact-text"
            style={{ color: textColor, fontFamily: font, fontSize: `${fontSize}px` }}
          >
            📞 {phone}
          </p>
        )}

        {about && (
          <div className="about-text">
            <h4 style={{ color: textColor, fontFamily: font, fontSize: `${fontSize + 2}px` }}>
              About
            </h4>
            <p style={{ color: textColor, fontFamily: font, fontSize: `${fontSize - 1}px` }}>
              {about.length >= 50
                ? about
                : about +
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CardPreviewFront;
