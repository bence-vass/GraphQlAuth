import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import { Mutation, Query } from '@apollo/react-components';
import {Redirect} from 'react-router-dom';

const UPDATE_PROFILE = gql`
    mutation UpdateProfile(
        $firstname: String,
        $lastname: String,
        $email: String,
    ){
        updateProfile(firstName: $firstname, lastName: $lastname, email: $email){
            user{
                username
                firstName
                lastName
                email
            }
        }
    }
`;
const PROFILE = gql`
    query{
        me{
            username
            isStaff
            firstName
            lastName
            email
        }
    }
`;
class ProfileUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            redirect: false,
        }
    }
    changeValue = (val, state_name) => {
        this.setState({[state_name]: val.target.value})
    };
    render() {
        return (
            <div>
                <Query query={PROFILE} onCompleted={async(res)=>{
                    //console.log(res);
                    await this.setState({
                        firstname: res.me.firstName,
                        lastname: res.me.lastName,
                        email: res.me.email,
                    });
                    //console.log(this.state)
                }}>
                    {({data, called})=>{ return null }}
                </Query>
            <Mutation mutation={UPDATE_PROFILE} update={(cache, {
                data:{
                    updateProfile:{
                        user
                    }
                }
            }) => {
                cache.writeQuery({query: PROFILE, data:{me: user}})
            }}>
                {(updateProfile, {data})=>{
                    if(this.state.redirect){
                        return <Redirect to={'/example/profile'}/>
                    }

                    return(
                        <div>
                            <form onSubmit={e=>{
                                e.preventDefault();
                                updateProfile({variables:{
                                    firstname: this.state.firstname,
                                    lastname: this.state.lastname,
                                    email: this.state.email,
                                    }});
                                this.setState({redirect: true});
                            }}>
                                <input type="text"
                                       placeholder={'First name'}
                                       value={this.state.firstname}
                                       onChange={e => this.changeValue(e, 'firstname')}/>
                                <input type="text"
                                       placeholder={'Last name'}
                                       value={this.state.lastname}
                                       onChange={e => this.changeValue(e, 'lastname')}/>
                                <input type="email"
                                       placeholder={'Email address'}
                                       value={this.state.email}
                                       onChange={e => this.changeValue(e, 'email')}/>
                                <input type="submit" value={"Update"}/>

                            </form>
                        </div>
                    )
                }}
            </Mutation>
            </div>
        );
    }
}

export default ProfileUpdatePage;