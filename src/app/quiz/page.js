// pages/quiz.js
'use client';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import '../../styles/quiz.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const QuizPage = () => {
    const searchParams = useSearchParams();
    const chapterId = searchParams.get('chapterId');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const answerLabels = ['A', 'B', 'C', 'D'];
    const questionsPerPage = 3;

    useEffect(() => {
        if (chapterId) {
            fetchQuizQuestions(chapterId);
        }
    }, [chapterId]);

    const fetchQuizQuestions = async (chapterId) => {
        try {
            const response = await axios.get(`/api/quiz?_id=${chapterId}`);
            const chapterData = response.data;
            setQuizQuestions(chapterData.data.quiz); // Assuming quiz is an array
        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
    };

    const handleAnswerChange = (questionIndex, answer) => {
        const absoluteIndex = currentPage * questionsPerPage + questionIndex; // Calculate the absolute index
        setUserAnswers((prev) => ({
            ...prev,
            [absoluteIndex]: answer, // Store the answer using absolute index
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let totalScore = 0;

        quizQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                totalScore++;
            }
        });

        setScore(totalScore);
        setSubmitted(true);

        // Save the score in the Progress model
        await saveQuizScore(chapterId, totalScore);
    };

    const saveQuizScore = async (chapterId, score) => {
        const userId = localStorage.getItem('userId'); // Get user ID from localStorage
        try {
            await axios.put('/api/progress', {
                userId,
                chapterId,
                score,
            });
        } catch (error) {
            console.error('Error saving quiz score:', error);
        }
    };

    // Pagination Handlers
    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(quizQuestions.length / questionsPerPage) - 1));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const currentQuestions = quizQuestions.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
    );

    const allQuestionsAnswered = Object.keys(userAnswers).length === quizQuestions.length;

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className='box'>
            <h1 className='header'>Quiz</h1>
            <form onSubmit={handleSubmit} className='form'>
                {Array.isArray(currentQuestions) && currentQuestions.length > 0 ? ( // Check if quizQuestions is defined and not empty
                    currentQuestions.map((question, index) => (
                        <div key={index} className='formDiv'>
                            <h3 className='header3'>{question.question}</h3>
                            {question.answers.map((answer, ansIndex) => (
                                <div key={ansIndex} className='ansDiv'>
                                    <input
                                        type="radio"
                                        id={`question-${index}-answer-${ansIndex}`}
                                        name={`question-${index}`}
                                        value={answerLabels[ansIndex]}
                                        onChange={() => handleAnswerChange(index, answerLabels[ansIndex])}
                                        className='input'
                                    />
                                    <label htmlFor={`question-${index}-answer-${ansIndex}`} className='answer'>
                                        {answerLabels[ansIndex]}. {answer}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className='spinner'>
                        <div className='spinnerCircle'></div>
                        <p className='loadingtxt'>Loading questions...</p>
                    </div>
                     // Show loading text while fetching questions
                )}

                 {/* Pagination Buttons */}
                 <div className="pagination-buttons">
                    <button
                        type="button"
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`pagination-button ${
                            currentPage === 0
                                ? 'pagination-button-prev-disabled'
                                : 'pagination-button-prev-enabled'
                        }`}
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage >= Math.ceil(quizQuestions.length / questionsPerPage) - 1}
                        className={`pagination-button ${
                            currentPage >= Math.ceil(quizQuestions.length / questionsPerPage) - 1
                                ? 'pagination-button-next-disabled'
                                : 'pagination-button-next-enabled'
                        }`}
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <button type="submit" className='submit-button' disabled={!allQuestionsAnswered}>Submit</button>
            </form>
            {submitted && (
                <div className="score-container">
                    <h2 className="score-title">Your Score: {score}/{quizQuestions.length}</h2>
                </div>
            )}
        </div>
         </Suspense>
    );
};

export default QuizPage;
