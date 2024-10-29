import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
export default function NotFound() {
  return (
    <div className="not-found-container bg-qais">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-text">
          The page you're looking for doesn't exist or has been moved. 
        </p>
        <Link to="/" className="home-button">
          Go Back Home
        </Link>
      </div>
      <div className="not-found-illustration">
        
        <img src="https://cdn-icons-png.flaticon.com/512/751/751463.png" alt="404 Illustration" />
      </div>
    </div>
  );
}

