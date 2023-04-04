import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '@contexts/authContext';
import ThemeContext from '@contexts/themeContext';

import HomePage from '@pages/homePage/homePage';
import LoginPage from '@pages/loginPage/loginPage';
import NotFoundPage from '@pages/notFoundPage/notFoundPage';
import NotImplementedPage from '@pages/notImplementedPage/notImplementedPage';
import PostDetailsPage from '@pages/postDetailsPage/postDetailsPage';
import PostsPage from '@pages/postsPage/postsPage';
import SecretDetailsPage from '@pages/secretDetailsPage/secretDetailsPage';
import SecretsPage from '@pages/secretsPage/secretsPage';
import SignUpPage from '@pages/signUpPage/signUpPage';

import RouteGuard from '@components/routeGuard/routeGuard';

import useLocalStorage from '@hooks/useLocalStorage';

function App() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    return (
        <React.StrictMode>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <div className={`page theme-${theme}`}>
                    <BrowserRouter>
                        <AuthProvider>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route element={<RouteGuard />}>
                                    <Route path="/secrets/*" element={<SecretsPage />} />
                                    <Route path="/secrets/details/:secretId" element={<SecretDetailsPage />} />
                                </Route>
                                <Route path="/posts/*" element={<PostsPage />} />
                                <Route path="/posts/details/:postId/*" element={<PostDetailsPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/sign-up" element={<SignUpPage />} />
                                <Route path="/not-implemented" element={<NotImplementedPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </AuthProvider>
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
