import React, { useState } from 'react';
import './CardForm.css';

const CardForm = ({ onFormChange }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    linkedIn: '',
    github: '',
    profilePicture: null,
    profilePreview: '',
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

  return (
    <form className="form">
      <h2>Enter Your Information</h2>

      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <input type="url" name="website" placeholder="Website/Portfolio" onChange={handleChange} />
      <input type="url" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} />
      <input type="url" name="github" placeholder="GitHub URL" onChange={handleChange} />

      <label>Upload Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {formData.profilePreview && (
        <img src={formData.profilePreview} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
      )}
    </form>
  );
};

export default CardForm;
