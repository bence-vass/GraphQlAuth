import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Fig from "../components/Fig";

class About extends Component {
    render() {
        return (
            <div className={'about'}>
                <div className="tech">
                    <Link to={'/about/apollo'}>Apollo Client</Link>
                    <Link to={'/about/jwt'}>JWT</Link>
                    <Link to={'/about/graphql'}>GraphQl</Link>
                    <Link to={'/about/docker'}>Docker</Link>

                </div>

            </div>
        );
    }
}

export default About;