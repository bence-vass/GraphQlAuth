import React from 'react';
import {gql} from 'apollo-boost';
import {Mutation} from '@apollo/react-components';
import {Link, Redirect} from "react-router-dom";

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
const CREATE_USER = gql`
    mutation CreateUser(
        $email: String!,
        $username: String!,
        $password: String!
    ){
        createUser(email: $email, username:$username,
            password: $password){
            user{
                id
                username
            }
        }

    }
`;

class Signup extends React.Component {
    changeValue = (val, state_name) => {
        this.setState({[state_name]: val.target.value})
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            redirect: null,

        }
    }

    render() {
        return (
            <Mutation mutation={CREATE_USER} onCompleted={res => {
                this.setState({
                    email: '',
                    password: '',
                    username: '',
                });
            }} onError={err => {
                console.log(err)
            }}
            >
                {(createUser, {data, loading, error}) => {
                    // if user creation was successful login and redirect
                    if (data) {
                        return (
                            <Mutation mutation={LOGIN} onCompleted={res => {
                                localStorage.setItem('token', res.tokenAuth.token);
                                localStorage.setItem('refreshToken', res.tokenAuth.refreshToken);
                                localStorage.setItem('exp', res.tokenAuth.payload.exp);
                                localStorage.setItem('refreshExp', res.tokenAuth.refreshExpiresIn);

                                this.setState({redirect: true});
                            }} variables={{username: this.state.username, password: this.state.password}}
                            >
                                {
                                    (login, {data, client, called}) => {
                                        if (data) {
                                            //console.log(data.tokenAuth.payload.exp);
                                            client.writeData({
                                                data: {
                                                    exp: data.tokenAuth.payload.exp,
                                                    refreshExp: data.tokenAuth.refreshExpiresIn,
                                                },
                                            });
                                        }
                                        if (this.state.redirect) {
                                            return (<
                                                Redirect
                                                to={'/example/profile'}
                                            />)
                                        }
                                        if (!called) {
                                            login()
                                        }
                                        return <div>Logging in ...</div>
                                    }
                                }
                            </Mutation>
                        )
                    }
                    // Return the sign up form
                    return (
                        <div>

                            <h1>Sign up</h1>
                            <form onSubmit={e => {
                                e.preventDefault();
                                createUser({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password,
                                        username: this.state.username,
                                    }
                                });
                            }}>
                                {error ?
                                    error.message.split(':')[1]
                                        .replace('[', '')
                                        .replace(']', '')
                                        .split(',').map((e, i) => {
                                        if (e === ' UNIQUE constraint failed') {
                                            return (
                                                <div key={i} style={{textAlign: 'center'}}>
                                                    Username taken
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={i} style={{textAlign: 'center'}}>
                                                {e.replace(/'/g, "")}
                                            </div>
                                        )
                                    })
                                : null}
                                <input type="text" placeholder={'username'} value={this.state.username}
                                       onChange={e => this.changeValue(e, 'username')} required/>
                                <input type="password" placeholder={'password'} value={this.state.password}
                                       onChange={e => this.changeValue(e, 'password')} required/>
                                <input type="email" placeholder={'email'} value={this.state.email}
                                       onChange={e => this.changeValue(e, 'email')} required/>
                                <input type="submit" value={"Sign Up"}/>
                            </form>
                            <Link to={'/example/login'}><h2>Login</h2></Link>

                        </div>
                    )
                }}
            </Mutation>
        );
    }
}

export default Signup;