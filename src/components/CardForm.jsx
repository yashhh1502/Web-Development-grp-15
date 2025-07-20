import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CardForm.css';
import { motion } from "framer-motion";

const CardForm = ({ onFormChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state || {};

  const [formData, setFormData] = useState({
    fullName: passedData.fullName || '',
    jobTitle: passedData.jobTitle || '',
    email: passedData.email || '',
    phone: passedData.phone || '',
    address: passedData.address || '',
    companyWebsite: passedData.companyWebsite || '',
    tagline: passedData.tagline || '',
    about: passedData.about || '',
    profilePicture: passedData.profilePicture || null,
    profilePreview: passedData.profilePreview || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onFormChange(updatedFormData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      const updatedFormData = {
        ...formData,
        profilePicture: file,
        profilePreview: previewURL,
      };
      setFormData(updatedFormData);
      onFormChange(updatedFormData);
    }
  };

  const goToDesignPage = () => {
    navigate('/customize', { state: formData });
  };

  return (
    <form className="form">
      {/* ✅ Animated Title */}
      <motion.h2
        className="name"
        whileHover={{ scale: 1.05 }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {formData.fullName ? `Welcome, ${formData.fullName}` : 'Enter Your Information'}
      </motion.h2>

      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
      <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

      <hr style={{ margin: '1rem 0' }} />

      <input type="text" name="address" placeholder="Company Address" value={formData.address} onChange={handleChange} />
      <input
        type="url"
        name="companyWebsite"
        placeholder="Company Website"
        value={formData.companyWebsite}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tagline"
        placeholder="Company Tagline (optional)"
        value={formData.tagline}
        onChange={handleChange}
      />

      <label style={{ marginTop: '1rem' }}>About You</label>
      <textarea
        name="about"
        placeholder="Write a short bio or description..."
        rows="4"
        value={formData.about}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>Upload Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {formData.profilePreview && (
        <img
          src={formData.profilePreview}
          alt="Preview"
          style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }}
        />
      )}

      <button
        type="button"
        onClick={goToDesignPage}
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.2rem',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Next →
      </button>
    </form>
  );
};

export default CardForm;
