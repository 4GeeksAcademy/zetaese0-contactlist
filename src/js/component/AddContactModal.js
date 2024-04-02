import React, { useState } from 'react';

function AddContactModal({ isOpen, onClose, onSave }) {
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />

          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            required
          />

          <button type="submit">Save Contact</button>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;
