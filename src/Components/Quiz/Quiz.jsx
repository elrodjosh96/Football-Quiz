import React, { useState, useRef, useEffect } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

export const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [playerName, setPlayerName] = useState('');
    let [showLeaderboard, setShowLeaderboard] = useState(false);
    let [leaderboard, setLeaderboard] = useState([]);
    let [submitted, setSubmitted] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    let [quizStarted, setQuizStarted] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    useEffect(() => {
        if (showLeaderboard) {
            fetchLeaderboard();
        }
    }, [showLeaderboard]);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/leaderboard');
            const data = await response.json();
            setLeaderboard(data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    const submitScore = async () => {
        if (!playerName.trim()) {
            alert('Please enter your name');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playerName,
                    score: score,
                    totalQuestions: data.length
                })
            });

            if (response.ok) {
                setSubmitted(true);
                fetchLeaderboard();
            }
        } catch (error) {
            console.error('Error submitting score:', error);
            alert('Failed to submit score. Make sure the backend server is running on port 3001');
        } finally {
            setIsLoading(false);
        }
    };


    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add('correct');
                setLock(true);
                setScore(prev => prev + 1);
            }
            else {
                e.target.classList.add('wrong');
                setLock(true);
                option_array[question.ans - 1].current.classList.add('correct');
            }
        }

    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
                return null;
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setPlayerName('');
        setSubmitted(false);
    }

    const viewLeaderboard = () => {
        setShowLeaderboard(true);
    }

    const backFromLeaderboard = () => {
        setShowLeaderboard(false);
        reset();
    }

    const startQuiz = () => {
        setQuizStarted(true);
    }

    return (
        <div className='container'>
            <h1>Football Quiz</h1>
            <hr />
            
            {/* Welcome Screen */}
            {!quizStarted && !showLeaderboard ? (
                <>
                    <div className='welcome-content'>
                        <h2>Welcome to the Football Quiz!</h2>
                        <p>Test your knowledge of college football with our interactive quiz.</p>
                        <div className='quiz-info'>
                            <p><strong>Total Questions:</strong> {data.length}</p>
                            <p><strong>Format:</strong> Multiple Choice</p>
                            <p><strong>Time Limit:</strong> None</p>
                        </div>
                        <p className='quiz-description'>Answer all questions and submit your score to see where you rank on the leaderboard!</p>
                    </div>
                    <button onClick={startQuiz} className='start-button'>Start Quiz</button>
                    <button onClick={() => setShowLeaderboard(true)} className='leaderboard-button'>View Leaderboard</button>
                </>
            ) : null}
            
            {/* Leaderboard View */}
            {showLeaderboard ? (
                <>
                    <h2>Top 10 Leaderboard</h2>
                    {leaderboard.length > 0 ? (
                        <table className='leaderboard-table'>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry, idx) => (
                                    <tr key={entry.id}>
                                        <td>{idx + 1}</td>
                                        <td>{entry.name}</td>
                                        <td>{entry.score}/{entry.totalQuestions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No scores yet. Be the first to take the quiz!</p>
                    )}
                    <button onClick={backFromLeaderboard}>Back to Home</button>
                </>
            ) : result ? (
                <>
                    <h2>You Scored {score} out of {data.length}</h2>
                    
                    {!submitted ? (
                        <>
                            <div className='submission-form'>
                                <label htmlFor='playerName'>Enter your name to submit your score:</label>
                                <input
                                    id='playerName'
                                    type='text'
                                    placeholder='Your name'
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && submitScore()}
                                />
                                <button onClick={submitScore} disabled={isLoading}>
                                    {isLoading ? 'Submitting...' : 'Submit Score'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className='success-message'>✓ Your score has been submitted!</p>
                            <button onClick={viewLeaderboard}>View Leaderboard</button>
                        </>
                    )}
                    
                    <button onClick={reset}>Take Quiz Again</button>
                </>
            ) : quizStarted ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            ) : null}

        </div>
    )
}