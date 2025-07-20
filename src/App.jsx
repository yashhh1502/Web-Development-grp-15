// src/App.js
import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import CardForm from './components/CardForm';
import CardPreviewFront from './components/CardPreviewFront';
import CardPreviewBack from './components/CardPreviewBack';
import CustomizePage from './components/CustomizePage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup';

function MainFormPage({ cardData, setCardData }) {
  const [showBack, setShowBack] = useState(false);
  const previewRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const link = document.createElement('a');
    link.download = `digital-card-${showBack ? 'back' : 'front'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`digital-card-${showBack ? 'back' : 'front'}.pdf`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <CardForm onFormChange={setCardData} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f4f9fb',
          overflowY: 'auto',
          borderLeft: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button
          onClick={() => setShowBack(!showBack)}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {showBack ? '🔁 Show Front Side' : '🔁 Show Back Side'}
        </button>

        <div ref={previewRef}>
          {showBack ? (
            <CardPreviewBack data={cardData} />
          ) : (
            <CardPreviewFront data={cardData} />
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleDownloadImage}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Download as Image
          </button>

          <button
            onClick={handleDownloadPDF}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cardData, setCardData] = useState({});

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/cardform" element={<MainFormPage cardData={cardData} setCardData={setCardData} />} />
      <Route path="/customize" element={<CustomizePage cardData={cardData} />} />
    </Routes>
  );
}

export default App;
