import { useState } from 'react';

const TestPage = () => {
  const [score, setScore] = useState<number>(0);
  const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));

  const submitScore = async () => {
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, timestamp }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1>Submit Your Score</h1>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        placeholder="Enter score"
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <button
        onClick={submitScore}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Submit Score
      </button>
    </div>
  );
};

export default TestPage;
