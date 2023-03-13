import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from '@pages/home/homePage';
import LoginPage from '@pages/login/loginPage';
import NotFoundPage from '@pages/notFound/notFoundPage';
import NotImplementedPage from '@pages/notImplemented/notImplementedPage';
import SecretsPage from '@pages/secrets/secretsPage';
import SignUpPage from '@pages/signUp/signUpPage';

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === null) {
            localStorage.setItem('theme', theme);
        } else {
            setTheme(currentTheme);
        }
    }, [theme]);

    return (
        <React.StrictMode>
            <div className={`page theme-${theme}`}>
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
            </div>
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
                theme={theme}
            />
        </React.StrictMode>
    );
}

export default App;
