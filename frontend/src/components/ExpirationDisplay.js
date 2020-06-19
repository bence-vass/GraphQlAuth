import React, {Component} from 'react';
import gql from "graphql-tag";
import Counter from "./Countdown";
import {Query} from "@apollo/react-components";

class ExpirationDisplay extends Component {
    render() {
        return (
            <Query query={gql`{exp refreshExp}`} fetchPolicy={'cache-only'}>
                {({data})=>{
                    if(data){
                        return (
                            <div className={'tokenDisplay'}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th colSpan={2} className={'title'}><span>Expiration</span></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th><span className="text">Access Token:</span></th>
                                        <th><b><Counter exp={data.exp}/></b></th>
                                    </tr>
                                    <tr>
                                        <th><span className="text">Refresh Token:</span></th>
                                        <th><b><Counter exp={data.refreshExp}/></b></th>
                                    </tr>
                                    </tbody>
                                </table>


                            </div>
                        )
                    }
                    return null
                }}
            </Query>
        );
    }
}

export default ExpirationDisplay;