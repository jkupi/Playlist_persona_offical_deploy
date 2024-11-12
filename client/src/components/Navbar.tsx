import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from "../utils/auth";
import { useState, useEffect } from "react";

const Nav = () => {
    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck]);

    return (
        <nav className="navbar navbar-expand-lg rounded p-2">
            <div className="container-fluid">
                {/* App name */}
                <div className="ms-2">
                    <NavLink className="navbar-brand fw-bold" to="/profile" style={{ color: '#2e4b40', fontSize: '1.5rem' }}>
                        <img className="justify-content-center"
                            src="/assets/pp-rf-logo.svg"
                            style={{ height: '65px', marginRight: '8px' }} />
                        Playlist Persona</NavLink>
                </div>

                {/* Toggler Button for Mobile View */}
                <button
                    className="navbar-toggler btn-nav-color body-text-alt"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>

                {/* Collapsible Navbar Section */}
                <div className="collapse navbar-collapse mx-auto p-1" id="navbarNavAltMarkup">
                    {/* Navigation Links */}
                    <div className="navbar-nav container-fluid d-flex flex-column flex-lg-row mx-auto align-items-center gap-3 mb-2">
                        <div className="nav nav-pills nav-fill mx-auto gap-4 d-flex flex-row justify-content-between align-items-center text-center">
                            <div className="nav-item">
                                <NavLink className="nav-link rounded-pill btn btn-light" to="/createAccount">
                                    Create Account
                                </NavLink>
                            </div>
                            {loginCheck ? (
                                <NavLink type="button" className="nav-link rounded-pill btn btn-light" onClick={() => { auth.logout(); }} to="/">
                                    Logout
                                </NavLink>
                            ) : (
                                <NavLink type="button" className="nav-link rounded-pill btn btn-light" to="/">
                                    Login
                                </NavLink>
                            )}
                            <NavLink type="button" className="nav-link rounded-pill btn btn-light" to="/generatePlaylist">
                                Generate Playlist
                            </NavLink>
                            {/* <NavLink type="button" className="nav-link rounded-pill btn btn-light" to="/currentPlaylist">
                                Current Playlist
                            </NavLink> */}
                            <NavLink type="button" className="nav-link rounded-pill btn btn-light" to="/profile">
                                Profile
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
