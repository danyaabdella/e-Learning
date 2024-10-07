'use client'
import '../../../styles/quiz.css';
import '../../../styles/globals.css';
import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function quizPage () {
  const [forms, setForms] = useState([
    { question: '', answers: ['', '', '', ''], correctAnswer: '', disabled: false }
  ]);
  const chapterId = useParams().chapterId;
  console.log('ch',chapterId);

  useEffect(() => {
    if (chapterId) {
      fetchQuiz();
    }
  }, [chapterId]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`/api/quiz?_id=${chapterId}`); // Adjust the endpoint as needed
      const data = response.data;
      setForms(data.data.quiz); 

    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };
  // Function to duplicate form
  const addForm = () => {
    setForms([...forms, { question: '', answers: ['', '', '', ''], correctAnswer: '', disabled: false }]); // Add a new empty form object
  };
  const removeForm = async (index) => {
    //   setForms(forms.filter((_, index) => index !== indexToRemove));
    // };
    const confirmed = confirm("Are you sure you want to delete this quiz?");
    if (!confirmed) return; // Exit if user cancels the deletion

    try {
      const response = await fetch(`/api/quiz?chapterId=${chapterId}&quizIndex=${index}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        alert('Quiz deleted successfully');
        setForms(forms.filter((_, i) => i !== index)); // Remove the form from state after successful deletion
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Error deleting quiz');
    }
  };
  const handleInputChange = (index, field, value) => {
    const updatedForms = [...forms];
    if (field === 'question' || field === 'correctAnswer') {
      updatedForms[index][field] = value;
    } else {
      updatedForms[index].answers[field] = value; // Handle choices
    }
    setForms(updatedForms);
  };
  const handleSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const formToSubmit = forms[index];
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizData: [formToSubmit], chapterId: chapterId }), // Send quiz data
      });
      const result = await response.json();
      if (response.ok) {
        alert('Quiz submitted successfully');
         // Disable all forms after successful submission
         const updatedForms = forms.map(form => ({
          ...form,
          disabled: true // Disable input fields after submission
        }));
        setForms(updatedForms);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz');
    }
  };
  // Function to update a form (for now just logging the update action)
  const updateForm = (index) => {
    const updatedForms = [...forms];
    updatedForms[index].disabled = false; // Enable fields for the form
    setForms(updatedForms);
  };
  const validateCorrectAnswer = (value) => {
    const allowedValues = ['A', 'B', 'C', 'D'];
    return allowedValues.includes(value.toUpperCase());
  };

  return (
    <div>
    {forms.map((form, index) => (
      <form key={index} className='formBox'>
        <div >
          <label className='formLbl'>Question {index + 1}</label>
        </div>
        <div>
          <input 
          type='text' 
          required 
          className='formInput'
          value={form.question}
          onChange={(e) => handleInputChange(index, 'question', e.target.value)}
          disabled={form.disabled}
          />
        </div>
        <div>
          <label className='formLbl'>Choice</label>
        </div>
        <div>
          A.<input 
          type='text' 
          className='formInput'
          value={form.answers[0]}
          onChange={(e) => handleInputChange(index, 0, e.target.value)}
          disabled={form.disabled}
          />
        </div>
        <div>
          B.<input 
          type='text' 
          className='formInput'
          value={form.answers[1]}
          onChange={(e) => handleInputChange(index, 1, e.target.value)}
          disabled={form.disabled}
          />
        </div>
        <div>
          C.<input 
          type='text' 
          className='formInput'
          value={form.answers[2]}
          onChange={(e) => handleInputChange(index, 2, e.target.value)}
          disabled={form.disabled}
          />
        </div>
        <div>
          D.<input 
          type='text' 
          className='formInput'
          value={form.answers[3]}
          onChange={(e) => handleInputChange(index, 3, e.target.value)}
          disabled={form.disabled}
          />
        </div>
        <div>
          <label className='formLbl'>Correct answer</label>
        </div>
        <input 
        type='text' 
        className='formInput' 
        value={form.correctAnswer}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          if (validateCorrectAnswer(value)) {
            handleInputChange(index, 'correctAnswer', value);
          } else {
            alert('enter appropriate value for the correctanswer field');
          }
        }}
        disabled={form.disabled}
        />
        {/* Buttons for each form */}
        <div className='buttonGroup'>
            <button
              type="button"
              className="updateBtn"
              onClick={() => updateForm(index)}
              title='update'
            >
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="updateBtn">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg> */}
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              className="removeBtn"
              onClick={() => removeForm(index)} // Pass form id for deletion
              title='remove quiz'
            >
              <i class="fa-solid fa-trash"></i>
            </button>
            <button 
            className='submitBtn' 
            onClick={(e) => handleSubmit(e, index)}
            disabled={form.disabled} >
            Submit
            </button>
          </div>
          
      </form>
    ))}

    <button
      type="button"
      className="addQuiz"
      title='add another question'
      onClick={addForm}
      
    >
      + 
    </button>
  </div>
);
}

