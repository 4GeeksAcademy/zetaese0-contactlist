import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import EditContactModal from "../component/EditContactModal";
import AddContactModal from "../component/AddContactModal";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentContactToEdit, setCurrentContactToEdit] = useState(null);

  // Function to fetch contacts
  const fetchContacts = async () => {
    try {
      await actions.getContacts();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []); // Empty dependency array means this effect runs once on mount

  // Updated to async to ensure state is updated after the promise resolves
  const handleDeleteContact = async (id) => {
    await actions.deleteContact(id);
    fetchContacts(); // Re-fetch contacts after deletion
  };

  const handleAddOrEditContact = async (contact) => {
    if (contact.id) {
      await actions.editContact(contact.id, contact.name, contact.phone, contact.email, contact.address);
    } else {
      await actions.addContact(contact.name, contact.phone, contact.email, contact.address);
    }
    fetchContacts(); // Re-fetch contacts after add/edit
    setIsAddModalOpen(false); // Close add modal if open
    setIsEditModalOpen(false); // Close edit modal if open
  };

  // Handler to open edit modal with the contact's info
  const handleEditClick = (contactId) => {
    const contactToEdit = store.contacts.contacts.find((c) => c.id === contactId);
    if (contactToEdit) {
      setCurrentContactToEdit(contactToEdit);
      setIsEditModalOpen(true);
    } else {
      console.error("Contact not found");
    }
  };

  return (
    <div className="container">
      <h1>Contact List</h1>
      <button onClick={() => setIsAddModalOpen(true)} className="btn btn-success" style={{ position: 'absolute', top: '15px', right: '15px' }}>
        Add Contact
      </button>
      {/* Error and loading states handling */}
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : store.contacts.contacts.length > 0 ? (
      <div className="card-container">
      {store.contacts.contacts.map((contact, index) => (
        <div className="card" key={index}>
          <img src={contact.image} className="card-img-top" alt={contact.name} />
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text"><i className="fas fa-phone"></i> {contact.phone}</p>
            <p className="card-text"><i className="fas fa-envelope"></i> {contact.email}</p>
            <p className="card-text"><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
            <div className="card-actions">
              <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger">Delete</button>
              <button onClick={() => handleEditClick(contact.id)} className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No contacts in the agenda.</p>)}

      {/* Modals for adding and editing */}
      <AddContactModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddOrEditContact} />
      {currentContactToEdit && <EditContactModal isOpen={isEditModalOpen} contact={currentContactToEdit} onClose={() => setIsEditModalOpen(false)} onSave={handleAddOrEditContact} />}
    </div>
  );
};

export default Home;
