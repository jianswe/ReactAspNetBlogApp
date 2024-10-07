import React from 'react';
import { Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import './NavMenu.css';

const NavMenu = () => {
    const token = localStorage.getItem('userToken')

    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
                <NavbarBrand tag={Link} to="/">Blogs</NavbarBrand>
                {token ? (
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/create">Create</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/blogs">Blogs</NavLink>
                        </NavItem>
                        <NavItem>
                            <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
                        </NavItem>
                    </ul>
                ) : (
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="btn btn-success" to="/login">Log In</NavLink>
                        </NavItem>
                    </ul>
                )}
            </Container>
            </Navbar>
        </header>
    )
}

export default NavMenu