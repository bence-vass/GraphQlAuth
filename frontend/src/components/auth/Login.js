import React from 'react';

import {gql} from 'apollo-boost';
import {Mutation} from '@apollo/react-components';
import {Redirect} from "react-router-dom";


const LOGIN = gql`
    mutation Login($username: String!, $password: String!){
        tokenAuth(username: $username, password: $password){
            payload
            token
            refreshToken
            refreshExpiresIn
        }
    }
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: null,
        }
    }

    changeValue = (val, state_name) => {
        this.setState({[state_name]: val.target.value})
    };

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/example/profile'}/>)
        }
        return (
            <Mutation mutation={LOGIN} onCompleted={res => {
                localStorage.setItem('token', res.tokenAuth.token);
                localStorage.setItem('refreshToken', res.tokenAuth.refreshToken);
                localStorage.setItem('exp', res.tokenAuth.payload.exp);
                localStorage.setItem('refreshExp', res.tokenAuth.refreshExpiresIn);

                this.setState({redirect: true});
            }} onError={err=>console.log('Authentication error')}>
                {(login, {data, loading, error, client}) => {
                    if (data) {
                        //console.log(data.tokenAuth.payload.exp);
                        client.writeData({
                            data: {
                                exp: data.tokenAuth.payload.exp,
                                refreshExp: data.tokenAuth.refreshExpiresIn,
                            },
                        });
                    }
                    return (
                        <div>
                            <h1>Login</h1>
                            <form onSubmit={e => {
                                e.preventDefault();
                                login({
                                    variables: {
                                        username: this.state.username,
                                        password: this.state.password,
                                    },
                                });
                            }}>
                                {error ?
                                    <div style={{textAlign: 'center'}}>
                                        Please enter valid credentials
                                    </div> : null}
                                <input type="text" placeholder={'username'} required
                                       onChange={e => this.changeValue(e, 'username')}/>
                                <input type="password" placeholder={'password'} required
                                       onChange={e => this.changeValue(e, 'password')}/>
                                <input type="submit" value={'login'}/>
                            </form>
                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default Login;