import React from 'react';
import '../App.css';
import {Link} from "react-router-dom";
const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/character">Create account</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;