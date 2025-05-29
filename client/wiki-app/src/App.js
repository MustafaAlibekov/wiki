import React, { useState } from 'react';

function App() {
  const [userId, setUserId] = useState('cb721d58-6a2c-4b5b-a148-6916e17f179f');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = () => {
    fetch(`http://localhost:5000/articleAPI/articles/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => {
        console.log('Полученные данные:', data);
        setUser(data);
        setError('');
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Получить пользователя</h2>

      <input
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="ID пользователя"
      />
      <button onClick={fetchUser}>Найти</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div>
          {user && (
  <div dangerouslySetInnerHTML={{ __html: user.content_html }} />
)}
        </div>
      )}
    </div>
  );
}

export default App;