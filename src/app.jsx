import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AuthContext from '@contexts/authContext';
import ThemeContext from '@contexts/themeContext';

import HomePage from '@pages/home/homePage';
import LoginPage from '@pages/login/loginPage';
import NotFoundPage from '@pages/notFound/notFoundPage';
import NotImplementedPage from '@pages/notImplemented/notImplementedPage';
import SecretsPage from '@pages/secrets/secretsPage';
import SignUpPage from '@pages/signUp/signUpPage';

import useLocalStorage from '@hooks/useLocalStorage';

function App() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [auth, setAuth] = useLocalStorage('auth', {});

    return (
        <React.StrictMode>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <div className={`page theme-${theme}`}>
                    <BrowserRouter>
                        <AuthContext.Provider value={{ auth, setAuth }}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/secrets/*" element={<SecretsPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/sign-up" element={<SignUpPage />} />
                                <Route path="/not-implemented" element={<NotImplementedPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </AuthContext.Provider>
                    </BrowserRouter>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={true}
                    theme={theme}
                />
            </ThemeContext.Provider>
        </React.StrictMode>
    );
}

export default App;
