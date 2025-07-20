import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Digital Business Card Builder</h1>
        <p>Create your professional card easily and customize your design!</p>
        <div className="home-buttons">
          <a href="/login" className="home-btn">Get Started</a>
          <a href="/about" className="home-btn secondary">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
