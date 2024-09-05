// components/AddPartnerModal.js
import { useState } from 'react';
import '../styles/partners.css';

const AddPartnerModal = ({ isOpen, onClose, onAddPartner }) => {
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddPartner = () => {
    // Call the onAddPartner function passed from the parent with form data
    onAddPartner({ fullName, description, img: imageUrl });
    // Clear form fields
    setFullName('');
    setDescription('');
    setImageUrl('');
    // Close the modal
    onClose();
  };

  if (!isOpen) return null; // Do not render the modal if it is not open

  return (
    <div className="addPartner-container">
      <div className="addPartner-form">
        <h2 className="addPartner-heading">Add Partner</h2>
        <div className="addPartner-section">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="addPartner-input-field"
          />
        </div>
        <div className="addPartner-section">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="addPartner-input-field"
          />
        </div>
        <div className="addPartner-heading">
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="addPartner-input-field"
          />
        </div>
        <div className="addPartner-buttons">
          <button
            className="addPartner-button-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="addPartner-button-add"
            onClick={handleAddPartner}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPartnerModal;
