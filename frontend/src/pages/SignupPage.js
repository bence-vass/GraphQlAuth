import React, {Component} from 'react';
import Signup from "../components/auth/Signup";
import Fig from "../components/Fig";
import {Link} from "react-router-dom";

class SignupPage extends Component {
    render() {
        return (
            <div className={'signup'}>
                <Fig>Please sign up or login on the left</Fig>
                <Signup/>
                <Link to={'/example/login'}><h2>Login</h2></Link>
            </div>
        );
    }
}

export default SignupPage;