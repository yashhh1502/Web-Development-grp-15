import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CardPreviewFront from './CardPreviewFront';
import CardPreviewBack from './CardPreviewBack';
import './CustomizePage.css';
import './CardPreview.css';
import { motion, AnimatePresence } from 'framer-motion';

const templates = {
  classic: {
    cardBgColor: '#ffffff',
    textColor: '#000000',
    font: 'Georgia',
    fontSize: 16,
    bgImage: '',
  },
  modern: {
    cardBgColor: '#222831',
    textColor: '#eeeeee',
    font: 'Roboto',
    fontSize: 16,
    bgImage: '',
  },
  bold: {
    cardBgColor: '#ff5722',
    textColor: '#ffffff',
    font: 'Impact',
    fontSize: 18,
    bgImage: '',
  },
  elegant: {
    cardBgColor: '#fdf6f0',
    textColor: '#333333',
    font: 'Playfair Display',
    fontSize: 17,
    bgImage: '',
  },
};

const CustomizePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardData = location.state;

  if (!cardData) {
    return <p>Error: No card data provided. Please go back and fill the form.</p>;
  }

  const [cardBgColor, setCardBgColor] = useState('#ffffff');
  const [pageBgColor, setPageBgColor] = useState('#f0f0f0');
  const [textColor, setTextColor] = useState('#000000');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [bgImage, setBgImage] = useState('');
  const [theme, setTheme] = useState('default');
  const [showBack, setShowBack] = useState(false);

  const applyTemplate = (templateId) => {
    const t = templates[templateId];
    if (t) {
      setCardBgColor(t.cardBgColor);
      setTextColor(t.textColor);
      setFont(t.font);
      setFontSize(t.fontSize);
      setBgImage(t.bgImage);
    }
  };

  return (
    <div
      className="customize-page"
      style={{
        backgroundColor: pageBgColor,
        backgroundImage: 'url(https://imgs.search.brave.com/tDjXqe7A1gKfah_QKL0QSaaL2o_xZx3MUc2-5OMaJl8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFHbkNG/bDNqclkvMS8wLzkw/MHcvY2FudmEtYWVz/dGhldGljLWJlaWdl/LXRyZWUtc2hhZG93/LW1vdGl2YXRpb25h/bC1xdW90ZS1waG9u/ZS13YWxscGFwZXIt/endlUWVPYm54T2su/anBn)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <header style={{
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        marginBottom: '20px',
        textAlign: 'center',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🛠️ Business Card Customizer</h1>
      </header>

      <h2 className="customize-title">🎨 Customize Your Digital Card</h2>

      <div className="customize-layout">
        {/* Left Side Controls */}
        <div className="customize-controls">
          <label>Choose Template:
            <select onChange={(e) => applyTemplate(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="bold">Bold</option>
              <option value="elegant">Elegant</option>
            </select>
          </label>

          <label>Card Background Color:
            <input type="color" value={cardBgColor} onChange={(e) => setCardBgColor(e.target.value)} />
          </label>

          <label>Page Background Color:
            <input type="color" value={pageBgColor} onChange={(e) => setPageBgColor(e.target.value)} />
          </label>

          <label>Text Color:
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </label>

          <label>Font:
            <select value={font} onChange={(e) => setFont(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Impact">Impact</option>
            </select>
          </label>

          <label>Font Size:
            <input
              type="range"
              min="12"
              max="30"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </label>

          <label>Card Background Image URL:
            <input
              type="text"
              placeholder="https://example.com/bg.jpg"
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
            />
          </label>

          <label>Theme:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="default">Default</option>
              <option value="dark">Dark</option>
              <option value="glass">Glassmorphism</option>
            </select>
          </label>

          <button className="glossy-button" onClick={() => setShowBack(!showBack)}>
            {showBack ? '🔁 Show Front Side' : '🔁 Show Back Side'}
          </button>

          <button
            className="glossy-button"
            onClick={() =>
              navigate('/cardform', {
                state: {
                  ...cardData,
                  styleProps: {
                    cardBgColor,
                    textColor,
                    font,
                    fontSize,
                    bgImage,
                  },
                },
              })
            }
          >
            ← Back to Edit
          </button>
        </div>

        {/* Right Side Live Preview */}
        <div className="custom-card-wrapper" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          flex: 1,
          minHeight: '80vh'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={showBack ? 'back' : 'front'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`custom-card-preview ${theme}`}
              style={{
                width: '550px',
                height: '600px',
                backgroundColor: cardBgColor,
                
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                fontFamily: font,
                fontSize: `${fontSize}px`,
                color: textColor,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {showBack ? (
                <CardPreviewBack data={cardData} theme={theme} styleProps={{ cardBgColor, textColor, font, fontSize, bgImage }} />
              ) : (
                <CardPreviewFront data={cardData} theme={theme} styleProps={{ cardBgColor, textColor, font, fontSize, bgImage }} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
