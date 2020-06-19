import React from 'react';
import {gql} from 'apollo-boost';
import { Mutation } from '@apollo/react-components';


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
        }
    }

    render() {

        console.log(this.state);
        return (
            <Mutation mutation={CREATE_USER} onCompleted={res=>{
                console.log(res);
                this.setState({
                    email: '',
                    password: '',
                    username: '',
                });
            }} onError={err=>{
                console.log(err)
            }}
            >
                {(createUser, {data, loading, error})=>(
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
                            <input type="text" placeholder={'username'} value={this.state.username}
                                   onChange={e => this.changeValue(e, 'username')} required/>
                            <input type="password" placeholder={'password'} value={this.state.password}
                                   onChange={e => this.changeValue(e, 'password')} required/>
                            <input type="email" placeholder={'email'} value={this.state.email}
                                   onChange={e => this.changeValue(e, 'email')} required/>
                            <input type="submit" value={"Sign Up"}/>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default Signup;