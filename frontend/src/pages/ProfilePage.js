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
    constructor() {
        super();
        this.state = {
            refetched: false
        }
    }
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
                   /* if(error){
                        return (<Redirect to={'/example/logout'}/>)
                    }*/

                    return(
                        <div className={'profile'}>

                            <Fig>
                                {this.state.refetched ?
                                    <div>Your profile data has been updated, you can check out the request in the
                                    Network menu in developer mode. If your credentials are valid, it will be
                                        executed with them, otherwise it is going to request new ones.
                                    </div>
                                    :
                                    <div>You can see your authentication tokens expiration down below</div>

                                }
                            </Fig>
                            <h1>Profile</h1>
                            <div>
                                <span>Username:</span>
                                <span>{data && data.me ? data.me.username : 'not yet'}</span>
                            </div>
                            <div>
                                <span>First name:</span>
                                <span>{data.me.firstName ? data.me.firstName : 'not given'}</span>
                            </div>
                            <div>
                                <span>Last name:</span>
                                <span>{data.me.lastName ? data.me.lastName : 'not given'}</span>
                            </div>
                            <div>
                                <span>Email:</span>
                                <span>{data.me.email ? data.me.email : 'not given'}</span>
                            </div>
                            <button onClick={()=>{
                                refetch();
                                this.setState({refetched: true});
                                setTimeout(()=>this.setState({refetched: false}), 20000)
                            }}>Refetch data</button>
                            <Link to={'/example/profile/update'}>
                                <h5 className={'update-btn'}>Update Profile</h5>
                            </Link>

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