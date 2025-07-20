import React from 'react';
import './CardPreview.css';
import { motion } from 'framer-motion';

const CardPreviewBack = ({ data, theme, styleProps }) => {
  const { email, website, address, companyWebsite, tagline } = data;

  const cardBgColor = styleProps?.cardBgColor || '#fbfbfbff';
  const textColor = styleProps?.textColor || '#000000';
  const font = styleProps?.font || 'sans-serif';
  const fontSize = styleProps?.fontSize || 16;
  const bgImage = styleProps?.bgImage || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`card-container fixed-card-size vertical-layout ${theme}`}
      style={{
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
      <div className="card-details back-card-details">
        {email && (
          <p className="contact-text" style={{ color: textColor }}>
            ✉️{' '}
            <a
              href={`mailto:${email}`}
              className="link-text"
              style={{ color: textColor, textDecoration: 'underline' }}
            >
              {email}
            </a>
          </p>
        )}
        {website && (
          <p className="contact-text" style={{ color: textColor }}>
            🌐{' '}
            <a
              href={website}
              className="link-text"
              style={{ color: textColor, textDecoration: 'underline' }}
              target="_blank"
              rel="noreferrer"
            >
              {website}
            </a>
          </p>
        )}
        {companyWebsite && (
          <p className="contact-text" style={{ color: textColor }}>
            🏢{' '}
            <a
              href={companyWebsite}
              className="link-text"
              style={{ color: textColor, textDecoration: 'underline' }}
              target="_blank"
              rel="noreferrer"
            >
              {companyWebsite}
            </a>
          </p>
        )}
        {address && (
          <p className="contact-text" style={{ color: textColor }}>
            📍 {address}
          </p>
        )}
        {tagline && (
          <p className="about-text tagline-text" style={{ color: textColor, fontStyle: 'italic' }}>
            “{tagline}”
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CardPreviewBack;
