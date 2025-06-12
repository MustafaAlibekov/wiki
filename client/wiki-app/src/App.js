import React, { useState } from 'react';

function Navbar({ onNavigate }) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start bg-dark">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"></a>
      <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" className="nav-link px-2 text-secondary" onClick={() => onNavigate('home')}>Главная</a></li>
        <li><a href="#" className="nav-link px-2 text-white" onClick={() => onNavigate('about')}>Новые Статьи</a></li>
        <li><a href="#" className="nav-link px-2 text-white">Добавить свою статью</a></li>
        <li><a href="#" className="nav-link px-2 text-white" onClick={() => onNavigate('article')}>Поиск Статьи</a></li>
      </ul>
      <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        <input
          type="search"
          className="form-control form-control-dark text-bg-dark"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>
      <div className="text-end">
        <button type="button" className="btn btn-outline-light me-2">Login</button>
        <button type="button" className="btn btn-warning">Sign-up</button>
      </div>
    </div>
  );
}

function Article()
{

const [userId, setUserId] = useState('');
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


const MainPage = ({ onNavigate }) => {


  const [ArtictleId, setArticleId] = useState('');
  const [Article, setArticle] = useState(null);
  const [error, setError] = useState('');


const fetchArticle = () => 
  {
    fetch(`http://localhost:5000/articleAPI/articles/random`)
    .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => {
        console.log('Полученные данные:', data);
        setArticle(data);
        setError('');
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setError(err.message);
      });

  }


  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1>Добро пожаловать на главную страницу</h1>
        <p className="lead">Здесь может быть краткое описание сайта или проекта</p>
      </header>

      <section className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Статьи</h5>
              <p className="card-text">Просмотрите интересные статьи по различным темам.</p>
              <a href="/articles" className="btn btn-primary mt-auto">Перейти</a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title" >Случайная статья</h5>
              <p className="card-text">Узнайте что-нибудь новое — попробуйте случайную статью.</p>
              <a href="/random"  onClick={(e) => {
    e.preventDefault(); // ❗️ОТМЕНА перехода по ссылке
    fetchArticle();
  }
  
  }  className="btn btn-success mt-auto">Открыть</a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">О сайте</h5>
              <p className="card-text">Подробнее о возможностях и целях нашего ресурса.</p>
              <a href="/about" className="btn btn-info mt-auto">Подробнее</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


function App() {


const [activePage, setActivePage] = useState('home');
const [activeState, setActiveState] = useState('');
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <MainPage/>;
      case 'about':
        return <></>;
      case 'article':
        return (
           <>
      <Article />
    </>
        );
      default:
        return <Navbar />;
    }
  };
  return (
    <div>
      <Navbar onNavigate={setActivePage} /> {/* Передаём setActivePage как onNavigate */}
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;