import React from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';

function Header() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();


    const logout = (e) => {
        e.preventDefault();
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem('auth');
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">E-commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            {!auth.user ? (<><li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </>) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" onClick={logout}>Logout</NavLink>
                                    </li></>
                            )}


                            {/* <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role !== 1 ? 'user' : 'admin'}`}>Dashboard</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header