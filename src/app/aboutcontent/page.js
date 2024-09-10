'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/aboutcontent.css'; // Adjust the path as needed
import SideBar from '@/Components/SideBar';

const AboutContentPage = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState([{ title: '', description: '' }]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/aboutcontent'); // Adjust the API endpoint as needed
          const data = response.data;
          setImageUrl(data.img || '');
          setContent(data.content || [{ title: '', description: '' }]);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };
  
      fetchData();
    }, []);

  const handleTitleChange = (index, event) => {
    const newContent = [...content];
    newContent[index].title = event.target.value;
    setContent(newContent);
  };

  const handleDescriptionChange = (index, event) => {
    const newContent = [...content];
    newContent[index].description = event.target.value;
    setContent(newContent);
  };

  const handleAddTitle = () => {
    setContent([...content, { title: '', description: '' }]);
  };

  const handleRemoveTitle = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/aboutcontent', {
        img: imageUrl,
        content,
      });
      alert('Content updated successfully');
    } catch (error) {
      console.error('Error updating content', error);
    }
  };

  return (
    <>
    <SideBar/>
    <div className="container">
      <h1 className="header">About Content</h1>
      
      <div className="mb">
        <label className="img-url">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="inputField"
        />
      </div>

      {content.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flexContainer">
            <input
              type="text"
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleTitleChange(index, e)}
              className="inputFieldMr"
            />
            <button
              type="button"
              onClick={handleAddTitle}
              className="buttonAdd"
            >
              +
            </button>
            {content.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTitle(index)}
                className="buttonRemove"
              >
                Trash
              </button>
            )}
          </div>
          {item.title && (
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleDescriptionChange(index, e)}
              className="textarea"
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="buttonUpdate"
      >
        Update
      </button>
    </div>
    </>
  );
};

export default AboutContentPage;
