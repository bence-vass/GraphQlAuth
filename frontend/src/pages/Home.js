import React, {Component} from 'react';
import text from '../images/text.svg';
import react from '../images/react-grey.svg';
import jwt from '../images/jwt.svg';
import apollo from '../images/apollo.svg';
import graphql from '../images/graphql.svg';
import docker from '../images/docker.svg';
import django from '../images/django.svg';
import graphene from '../images/graphene.svg';
import certbot from '../images/certbot.svg';
import nginx from '../images/nginx.svg';
import Fig from "../components/Fig";
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className={'home'}>
                <div className={'text'}><img src={text} alt="GraphQAuth"/></div>
                <div className={'desc'}>
                    Example project for JWT authentication in an SPA React.js app with Apollo through GraphQl API
                </div>
                <Fig style={{position: 'absolute'}}>
                    Hello, It is a showcase example of the JWT Auth.
                    <br/>
                    Check out the demo on the <Link to={'/example'}>example page</Link>
                    <br/>
                    For more about the fundamentals, check out the <Link to={'/about'}>about page</Link>
                </Fig>
                <div className="tech">
                    <div style={{margin: '0 auto 4rem', width: 'fit-content'}}>
                    <div className="techContainer"><img src={react} alt="react"/></div>
                    <div className="techContainer"><img src={jwt} alt="jwt"/></div>
                    <div className="techContainer"><img src={apollo} alt="apollo"/></div>
                    <div className="techContainer"><img src={graphql} alt="graphql"/></div>
                    </div>
                    <div>
                        <div className="techContainer"><img src={docker} alt="docker"/></div>
                        <div className="techContainer"><img src={nginx} alt="nginx"/></div>
                        <div className="techContainer"><img src={certbot} alt="certbot"/></div>
                        <div className="techContainer"><img src={django} alt="django"/></div>
                        <div className="techContainer"><img src={graphene} alt="graphene"/></div>
                    </div>
                </div>
                <Link to={'/about'}><h2>More about the tech</h2></Link>
            </div>
        );
    }
}

export default Home;