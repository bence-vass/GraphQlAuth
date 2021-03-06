import React from 'react';
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";
import Fig from "../../components/Fig";
import jwtFig from "../../images/jwtFig.svg";
const COLORS = ['#fb015b', '#d63aff', '#00b9f1']

function copyToClipboard(text) {
    let dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

const JwtPage = () => {
    const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6' +
        'IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36' +
        'POk6yJV_adQssw5c';
    return (
        <div>
            <Fig>JWT is commonly used tech for safety measures</Fig>

        <div className={'about-container'}>
            <h2>JSON Web Tokens</h2>
            <div>
                <i>"JSON Web Tokens are an open, industry standard RFC 7519
                method for representing claims securely between two parties."
                </i>
            </div>
            <div className={'token'}>
                <b>{localStorage.getItem('token') ?
                    <div>
                    <div>This is your access token:</div>
                        {localStorage.getItem('token').split('.').map((e, i)=>(
                        <span key={i}><span style={{color: COLORS[i] }}>{e}</span>{i !== 2 ? '.' : null}</span>
                    ))}
                    </div>
                    :
                    <div>
                        <div>This is an example token:</div>
                        {exampleToken.split('.').map((e, i)=>(
                           <span key={i}><span style={{color: COLORS[i] }}>{e}</span>{i !== 2 ? '.' : null}</span>
                        ))}
                    </div>

                }</b>
            </div>
            <div>It has three parts: the header, which contains the algorithm and token type, the payload
            which is the data it self, and the verifying signature.&nbsp;<a href="https://jwt.io/">
             You can check out the the decoded data on the official site of JWT
            </a>
            </div>
            <button onClick={()=>{
                if(localStorage.getItem('token')){
                    copyToClipboard(localStorage.getItem('token'))
                }
                window.open('https://jwt.io/')

            }}>Copy Token and Redirect to jwt.io</button>
            <img src={jwtFig} alt="jwt" className={'ill-img'}/>
            <div>
                In this experimental case you have significantly shorter token expiration time, for the
                purpose of demonstration, but in real life scenario the access token lives about
                15 min and the refresh token around a week.
            </div>
            <div>For more advanced security you can generate new refresh token with access token.
            In this project, after the request, the server revoke the previous token and only with the
            newly generated credentials can be the process repeated.</div>
        </div>
        </div>

    );
};

export default JwtPage;