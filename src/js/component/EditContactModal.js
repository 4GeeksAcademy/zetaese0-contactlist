import React, { useState, useEffect } from "react";

const EditContactModal = ({ contact, isOpen, onClose, onSave }) => {
  const [editedContact, setEditedContact] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Update the local state when the contact prop changes
  useEffect(() => {
    if (contact) {
      setEditedContact({
        id: contact.id,
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        address: contact.address || "",
      });
    }
  }, [contact]);

  const handleInputChange = (e) => {
    setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(editedContact);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedContact.name}
            onChange={handleInputChange}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={editedContact.phone}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedContact.email}
            onChange={handleInputChange}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={editedContact.address}
            onChange={handleInputChange}
          />

          <button type="button" onClick={handleSubmit}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
