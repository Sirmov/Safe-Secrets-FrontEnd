import {
    IconHome,
    IconLock,
    IconLogin,
    IconMoon,
    IconNews,
    IconStar,
    IconSun,
    IconWritingSign,
} from '@tabler/icons-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { useThemeContext } from '@contexts/themeContext';

import { ThemeModes } from '@models/enums/themeModes';

import { logout } from '@services/usersService';

import { isAuthenticated } from '@utils/_';

import styles from './navigationHeader.module.scss';

function NavigationHeader() {
    const { theme, setTheme } = useThemeContext();
    const { auth, setAuth } = useAuthContext();
    const navigate = useNavigate();

    async function handleLogout() {
        const response = await logout();

        if (!response.isOk) {
            toast.error('Something went wrong.');
        }

        setAuth?.(null);
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
                        <img src="/images/logo.png" width={110} height={32} alt="Logo" className="navbar-brand-image" />
                    </Link>
                </h1>
                {/* Right section */}
                <div className="navbar-nav flex-row order-md-last">
                    <div className="d-none d-md-flex">
                        {/* Theme change */}
                        {String(theme.mode).toLowerCase() === 'light' ? (
                            <Link
                                to="?theme=dark"
                                onClick={() =>
                                    setTheme?.((theme) => {
                                        return { ...theme, mode: ThemeModes.Dark };
                                    })
                                }
                                className="nav-link px-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                aria-label="Enable dark mode"
                                data-bs-original-title="Enable dark mode">
                                <IconMoon className="icon" />
                            </Link>
                        ) : (
                            <Link
                                to="?theme=light"
                                onClick={() =>
                                    setTheme?.((theme) => {
                                        return { ...theme, mode: ThemeModes.Light };
                                    })
                                }
                                className="nav-link px-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                aria-label="Enable light mode"
                                data-bs-original-title="Enable light mode">
                                <IconSun className="icon" />
                            </Link>
                        )}
                    </div>
                    {/* Avatar */}
                    {isAuthenticated(auth) ? (
                        <div className="nav-item dropdown">
                            <div className="nav-item cursor-pointer" data-bs-toggle="dropdown">
                                <div className="nav-link ms-2">
                                    <h3 className="nav-link-title mb-0">Hello {auth?.username}</h3>
                                </div>
                            </div>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <Link to="/secrets?favorites=true" className="dropdown-item">
                                    <IconStar className="icon-filled text-yellow me-2" />
                                    Favorites
                                </Link>
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
                                        <IconLogin className="icon" />
                                    </span>
                                    <span className="nav-link-title">Login</span>
                                </NavLink>
                            </div>
                            <div className="nav-item">
                                <NavLink to="/sign-up" className="nav-link">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconWritingSign className="icon" />
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
                                        <IconHome className="icon" />
                                    </span>
                                    <span className="nav-link-title">Home</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/posts"
                                    className={({ isActive }) =>
                                        isActive ? `nav-link ${styles['nav-link-active']}` : 'nav-link'
                                    }>
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconNews className="icon" />
                                    </span>
                                    <span className="nav-link-title">Posts</span>
                                </NavLink>
                            </li>
                            {isAuthenticated(auth) ? (
                                <li className="nav-item">
                                    <NavLink
                                        to="/secrets"
                                        className={({ isActive }) =>
                                            isActive ? `nav-link ${styles['nav-link-active']}` : 'nav-link'
                                        }>
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <IconLock className="icon" />
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
