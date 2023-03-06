import { IconBell, IconMoon, IconStar, IconSun } from '@tabler/icons-react';
import React from 'react';

function NavigationHeader() {
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
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <a href=".">
                        <img
                            src="../../assets/images/logo.png"
                            width={110}
                            height={32}
                            alt="Safe Secrets"
                            className="navbar-brand-image"
                        />
                    </a>
                </h1>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="d-none d-md-flex">
                        <a
                            href="?theme=dark"
                            className="nav-link px-0 hide-theme-dark"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            aria-label="Enable dark mode"
                            data-bs-original-title="Enable dark mode">
                            <IconMoon className="icon" color="currentColor" stroke={2} size={24} />
                        </a>
                        <a
                            href="?theme=light"
                            className="nav-link px-0 hide-theme-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            aria-label="Enable light mode"
                            data-bs-original-title="Enable light mode">
                            <IconSun className="icon" color="currentColor" stroke={2} size={24} />
                        </a>
                        <div className="nav-item dropdown d-none d-md-flex me-3">
                            <a
                                href="#"
                                className="nav-link px-0"
                                data-bs-toggle="dropdown"
                                tabIndex={-1}
                                aria-label="Show notifications">
                                <IconBell className="icon" color="currentColor" stroke={2} size={24} />
                                <span className="badge bg-red" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Last updates</h3>
                                    </div>
                                    <div className="list-group list-group-flush list-group-hoverable">
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="status-dot status-dot-animated bg-red d-block" />
                                                </div>
                                                <div className="col text-truncate">
                                                    <a href="#" className="text-body d-block">
                                                        Example 1
                                                    </a>
                                                    <div className="d-block text-muted text-truncate mt-n1">
                                                        Change deprecated html tags to text decoration classes (#29604)
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="#" className="list-group-item-actions">
                                                        <IconStar
                                                            className="icon"
                                                            color="currentColor"
                                                            stroke={2}
                                                            size={24}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="status-dot d-block" />
                                                </div>
                                                <div className="col text-truncate">
                                                    <a href="#" className="text-body d-block">
                                                        Example 2
                                                    </a>
                                                    <div className="d-block text-muted text-truncate mt-n1">
                                                        justify-content:between ⇒ justify-content:space-between (#29734)
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="#" className="list-group-item-actions show">
                                                        <IconStar
                                                            className="icon"
                                                            color="currentColor"
                                                            stroke={2}
                                                            size={24}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="status-dot d-block" />
                                                </div>
                                                <div className="col text-truncate">
                                                    <a href="#" className="text-body d-block">
                                                        Example 3
                                                    </a>
                                                    <div className="d-block text-muted text-truncate mt-n1">
                                                        Update change-version.js (#29736)
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="#" className="list-group-item-actions">
                                                        <IconStar
                                                            className="icon"
                                                            color="currentColor"
                                                            stroke={2}
                                                            size={24}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <span className="status-dot status-dot-animated bg-green d-block" />
                                                </div>
                                                <div className="col text-truncate">
                                                    <a href="#" className="text-body d-block">
                                                        Example 4
                                                    </a>
                                                    <div className="d-block text-muted text-truncate mt-n1">
                                                        Regenerate package-lock.json (#29730)
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="#" className="list-group-item-actions">
                                                        <IconStar
                                                            className="icon"
                                                            color="currentColor"
                                                            stroke={2}
                                                            size={24}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link d-flex lh-1 text-reset p-0"
                            data-bs-toggle="dropdown"
                            aria-label="Open user menu">
                            <span
                                className="avatar avatar-sm"
                                style={{ backgroundImage: 'url(./static/avatars/003m.jpg)' }}
                            />
                            <div className="d-none d-xl-block ps-2">
                                <div>Dunn Slane</div>
                                <div className="mt-1 small text-muted">Research Nurse</div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a href="#" className="dropdown-item">
                                Status
                            </a>
                            <a href="./profile.html" className="dropdown-item">
                                Profile
                            </a>
                            <a href="#" className="dropdown-item">
                                Feedback
                            </a>
                            <div className="dropdown-divider" />
                            <a href="./settings.html" className="dropdown-item">
                                Settings
                            </a>
                            <a href="./sign-in.html" className="dropdown-item">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="./#">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconStar className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">First</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./#">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconStar className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">Second</span>
                                    <span className="badge badge-sm bg-red">2</span>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#navbar-third"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    role="button"
                                    aria-expanded="false">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconStar className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">Third</span>
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="./#">
                                        First
                                    </a>
                                    <a className="dropdown-item" href="./#">
                                        Second
                                    </a>
                                    <a className="dropdown-item" href="./#">
                                        Third
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="./#">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <IconStar className="icon" color="currentColor" stroke={2} size={24} />
                                    </span>
                                    <span className="nav-link-title">Disabled</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavigationHeader;
