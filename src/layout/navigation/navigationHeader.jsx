import React from 'react';

import { IconHome, IconLock, IconLogin, IconMoon, IconSun, IconWritingSign } from '@tabler/icons-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { useThemeContext } from '@contexts/themeContext';

import { logout } from '@services/usersService';

import { isAuthenticated, isStatusOk } from '@utils/_';

import styles from './navigationHeader.module.scss';

function NavigationHeader() {
    const { theme, setTheme } = useThemeContext();
    const { auth, setAuth } = useAuthContext();
    const navigate = useNavigate();

    async function handleLogout() {
        const response = await logout();

        if (!isStatusOk(response.status)) {
            toast.error('Something went wrong.');
        }

        setAuth({});
        navigate('/');
    }

    return (
        <header className="navbar navbar-expand-md navbar-light d-print-none">
            <div className="container-xl">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-menu"
                    aria-controls="navbar-menu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Logo */}
                <h1 className="navbar-brand d-none-navbar-horizontal pe-0 pe-md-3">
                    <Link to="/">
                        <img
                            src="../../assets/images/logo.png"
                            width={110}
                            height={32}
                            alt="Safe Secrets"
                            className="navbar-brand-image"
                        />
                    </Link>
                </h1>
                {/* Right section */}
                <div className="navbar-nav flex-row order-md-last">
                    <div className="d-none d-md-flex">
                        {/* Theme change */}
                        {String(theme).toLowerCase() === 'light' ? (
                            <Link
                                to="?theme=dark"
                                onClick={() => setTheme('dark')}
                                className="nav-link px-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                aria-label="Enable dark mode"
                                data-bs-original-title="Enable dark mode">
                                <IconMoon className="icon" color="currentColor" stroke={2} size={24} />
                            </Link>
                        ) : (
                            <Link
                                to="?theme=light"
                                onClick={() => setTheme('light')}
                                className="nav-link px-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                aria-label="Enable light mode"
                                data-bs-original-title="Enable light mode">
                                <IconSun className="icon" color="currentColor" stroke={2} size={24} />
                            </Link>
                        )}
                    </div>
                    {/* Avatar */}
                    {isAuthenticated(auth.accessToken) ? (
                        <div className="nav-item dropdown">
                            <div className="nav-item cursor-pointer" data-bs-toggle="dropdown">
                                <div className="nav-link ms-2">
                                    <h3 className="nav-link-title mb-0">Hello {auth.username}</h3>
                                </div>
                            </div>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <Link to="/not-implemented" className="dropdown-item">
                                    Settings
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item">
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="nav-item">
                                <NavLink to="/login" className="nav-link mx-2">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconLogin className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">Login</span>
                                </NavLink>
                            </div>
                            <div className="nav-item">
                                <NavLink to="/sign-up" className="nav-link">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconWritingSign className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">Sign up</span>
                                </NavLink>
                            </div>
                        </>
                    )}
                </div>
                {/* Navigation links */}
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? `nav-link ${styles['nav-link-active']}` : 'nav-link'
                                    }>
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconHome className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">Home</span>
                                </NavLink>
                            </li>
                            {isAuthenticated(auth.accessToken) ? (
                                <li className="nav-item">
                                    <NavLink
                                        to="/secrets"
                                        className={({ isActive }) =>
                                            isActive ? `nav-link ${styles['nav-link-active']}` : 'nav-link'
                                        }>
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <IconLock className="icon" color="currentColor" stroke={2} size={24} />
                                        </span>
                                        <span className="nav-link-title">Secrets</span>
                                    </NavLink>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavigationHeader;
