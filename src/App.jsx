import React, { useState } from 'react';
import CardForm from './componets/CardForm';  //
import CardPreview from './componets/CardPreview';

function App() {
  const [cardData, setCardData] = useState({});

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* 🧾 Form Section */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: 'transparent',
          overflowY: 'auto',
        }}
      >
        <CardForm onFormChange={setCardData} />
      </div>

      {/* 🧾 Preview Section */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f4f9fb',
          overflowY: 'auto',
          borderLeft: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardPreview data={cardData} />
      </div>
    </div>
  );
}

export default App;
