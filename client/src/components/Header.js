import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';


import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();  // clear session/token
        navigate("/login");
    };

    return (
        <Navbar
            light
            expand="md"
            style={{
                backgroundColor: "#F2F5F7",
                padding: "10px 20px",
                borderBottom: "1px solid #d6d6d6",
            }}
        >
            <NavbarBrand>
                {/* <img src={Logo} width="130px" alt="Brand" /> */}
            </NavbarBrand>

            <NavbarToggler onClick={toggle} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>

                    {/* HOME */}
                    <NavItem style={{ margin: "0 15px", fontSize: "20px" }}>
                        <Link to="/home" style={{ color: "#2E3A47" }}>
                            <FaHome />
                        </Link>
                    </NavItem>

                    {/* PROFILE */}
                    <NavItem style={{ margin: "0 15px", fontSize: "20px" }}>
                        <Link to="/admin-update" style={{ color: "#2E3A47" }}>
                            <FaUserAlt />
                        </Link>
                    </NavItem>

                    {/* LOGOUT */}
                    <NavItem
                        style={{
                            margin: "0 15px",
                            cursor: "pointer",
                            fontSize: "20px",
                            color: "#C0392B"
                        }}
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt />
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;
