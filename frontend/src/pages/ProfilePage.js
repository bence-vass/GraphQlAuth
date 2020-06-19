import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';
import {Link, Redirect} from "react-router-dom";
import Fig from "../components/Fig";

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

class ProfilePage extends Component {
    render() {
        return (
            <Query query={PROFILE} onError={err=>{console.log('profile error')}}>
                {({loading, error, data, updateQuery, refetch}) => {
                    if(loading){
                        return (
                            <div>
                                Loading...
                            </div>
                        )
                    }
                    if(error){
                        return (<Redirect to={'logout'}/>)
                    }

                    return(
                        <div className={'profile'}>
                            <Fig>You can see your authentication tokens expiration down below</Fig>
                            <h1>Profile</h1>
                            <Link to={'/example/profile/update'}><h5>Update Profile</h5></Link>
                            {data && data.me ? data.me.username : 'not yet'}
                            <br/>
                            {data.me.firstName ? data.me.firstName : 'not given'}
                            <br/>
                            {data.me.lastName ? data.me.lastName : 'not given'}
                            <br/>
                            {data.me.email ? data.me.email : 'not given'}
                            <br/>
                            <button onClick={()=>{updateQuery(); refetch()}}>Refetch data</button>
                            <br/>
                            <Link to={'/example/logout'}>Logout</Link>
                        </div>
                    )
                }
                }
            </Query>


        );
    }
}

export default ProfilePage;