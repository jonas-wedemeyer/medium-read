import React, { useState, useEffect } from 'react';
import { getArticles } from '../services/article-api-service';
import './App.css';


function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles(articles, setArticles);
  }, []);

  return (
    <div>
      <h1>Hi, I am the App!</h1>
    </div>
  );
}

export default App;
