import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import { Mutation, Query } from '@apollo/react-components';
import {Redirect} from 'react-router-dom';
import Fig from "../components/Fig";

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
            <div className={'update'}>
                <Fig>The mutation can update the data locally in the cache if it was successful,
                without refetching the data from the network.</Fig>
                <Query query={PROFILE} onCompleted={async(res)=>{
                    await this.setState({
                        firstname: res.me.firstName,
                        lastname: res.me.lastName,
                        email: res.me.email,
                    });
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
            }} onError={err=>null}>
                {(updateProfile, {data, error})=>{
                    if(this.state.redirect){
                        return <Redirect to={'/example/profile'}/>
                    }
                    if(data){
                        this.setState({redirect: true});
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
                                //this.setState({redirect: true});
                            }}>
                                {error ?
                                    <div>{error.message}</div>
                                    : null}
                                <div>
                                    <span>First name:</span>
                                    <input type="text"
                                           placeholder={'First name'}
                                           value={this.state.firstname}
                                           onChange={e => this.changeValue(e, 'firstname')}/>
                                </div>
                                <div>
                                    <span>Last name:</span>
                                    <input type="text"
                                           placeholder={'Last name'}
                                           value={this.state.lastname}
                                           onChange={e => this.changeValue(e, 'lastname')}/>
                                </div>
                                <div>
                                    <span>Email:</span>
                                    <input type="email"
                                           placeholder={'Email address'}
                                           value={this.state.email}
                                           onChange={e => this.changeValue(e, 'email')}/>
                                </div>
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