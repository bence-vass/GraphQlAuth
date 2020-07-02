import React, {Component} from 'react';
import Login from "../components/auth/Login";
import Fig from "../components/Fig";
import {Link} from "react-router-dom";

class LoginPage extends Component {
    render() {
        return (
            <div className={'login'}>
                <Fig>Please sign up or login on the left</Fig>
                <Login/>
                <Link to={'/example/signup'}><h2>Sign Up</h2></Link>
            </div>
        );
    }
}

export default LoginPage;