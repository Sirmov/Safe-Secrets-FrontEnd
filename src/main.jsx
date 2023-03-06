import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './main.module.scss';

import App from './App';
import SignUpPage from './pages/signUp/signUpPage';
import LoginPage from './pages/login/loginPage';
import NotFoundPage from './pages/notFound/notFoundPage';
import HomePage from './pages/home/homePage';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
