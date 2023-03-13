import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import HomePage from '@pages/home/homePage';
import LoginPage from '@pages/login/loginPage';
import NotFoundPage from '@pages/notFound/notFoundPage';
import NotImplementedPage from '@pages/notImplemented/notImplementedPage';
import SecretsPage from '@pages/secrets/secretsPage';
import SignUpPage from '@pages/signUp/signUpPage';

import './main.module.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/secrets" element={<SecretsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/not-implemented" element={<NotImplementedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={false}
            pauseOnHover={true}
            theme="light"
        />
    </React.StrictMode>
);
