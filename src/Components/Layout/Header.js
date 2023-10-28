import React from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';
import SearchBar from '../SearchBar';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../Context/Cart';

function Header() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const allCategory = useCategory();


    const clearAll = (e) => {
        e.preventDefault();
        setAuth({ ...auth, user: null, token: "" });
        localStorage.clear();
        navigate('/login');

    }

    const logout = (e) => {
        e.preventDefault();
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem('auth');
        localStorage.removeItem('cartInLocal');
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
                                <NavLink className="nav-link active" aria-current="page" onClick={clearAll}>Clear All</NavLink>
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Category
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <Link className="dropdown-item" to="/all-category">All Category</Link>
                                    {allCategory?.map((c) => (
                                        <>

                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to={`/category/${c.name}`}>{c.name}</Link>


                                        </>
                                    ))}


                                </div>
                            </li>


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
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role !== 1 ? 'user' : 'admin'}`}>Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{ position: 'relative' }} className="nav-link" to={`/cart`}>Cart<span style={{ fontSize: '11px', display: 'inline', position: 'relative', top: '-4px' }} className="badge bg-danger">{cart.length}</span>

                                </NavLink>
                            </li>
                        </ul>
                        <SearchBar></SearchBar>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header