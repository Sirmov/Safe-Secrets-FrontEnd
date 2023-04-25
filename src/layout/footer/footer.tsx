import { IconHeart } from '@tabler/icons-react';

function Footer() {
    return (
        <footer className="footer footer-transparent d-print-none">
            <div className="container-xl">
                <div className="row text-center align-items-center flex-row-reverse">
                    <div className="col-lg-auto ms-lg-auto">
                        <ul className="list-inline list-inline-dots mb-0">
                            <li className="list-inline-item">
                                <a
                                    href="https://github.com/Sirmov/Safe-Secrets-FrontEnd/blob/main/README.md"
                                    className="link-secondary"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Documentation
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    href="https://github.com/Sirmov/Safe-Secrets-FrontEnd/blob/main/LICENSE"
                                    className="link-secondary"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    License
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    href="https://github.com/Sirmov/Safe-Secrets-FrontEnd"
                                    className="link-secondary"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Source code
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a
                                    href="https://www.buymeacoffee.com/sirmov"
                                    className="link-secondary"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <IconHeart className="icon icon-filled text-pink" />
                                    Sponsor
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                        <ul className="list-inline list-inline-dots mb-0">
                            <li className="list-inline-item">Copyright © 2023 Safe Secrets. All rights reserved.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
