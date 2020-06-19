import React from 'react';
import {Link} from 'react-router-dom';
import vaLogo from '../images/va-logo.svg';

const Navbar = () => {
    return (
        <ul className={'navbar'}>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/example'}>Example</Link></li>
            <li><Link to={'/codes'}>Codes</Link></li>
            <li><Link to={'/about'}>About</Link></li>

            <a href="https://bencevass.com/"><img src={vaLogo} alt="Bence Vass"/></a>
        </ul>
    );
};

export default Navbar;