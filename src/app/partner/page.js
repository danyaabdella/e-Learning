
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/partners.css';
import SideBar from '@/Components/SideBar';
import AddPartnerModal from '@/Components/AddPartnerModal';

const PartnerPage = () => {
  const [partners, setPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get('/api/partners');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };
  const handleAddPartner = async (newPartner) => {
    try {
      const response = await axios.post('/api/partners', newPartner);
      setPartners((prevPartners) => [...prevPartners, response.data]);
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  return (
    <>
    <SideBar/>
    <div className="partner-page-container">
      <button className="add-partner-button"
              onClick={() => setIsModalOpen(true)}
              >Add Partner</button>
      <div className="partners-grid">
        {partners.map((partner) => (
          <div key={partner._id} className="partner-card">
            <img src={partner.img} alt={partner.fullName} className="partner-logo" />
            <h3 className="partner-name">{partner.fullName}</h3>
            <p className="partner-description">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
    <AddPartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPartner={handleAddPartner}
      />
    </>
  );
};

export default PartnerPage;
