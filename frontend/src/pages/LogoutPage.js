import React, {Component} from 'react';
import {ApolloConsumer} from "@apollo/react-components";
import {Redirect} from "react-router-dom";


class LogoutPage extends Component {
    render() {
        return (
            <ApolloConsumer>
                {client => {
                    localStorage.clear();
                    client.writeData({
                        data: {
                            exp: 0,
                            refreshExp: 0
                        }
                    });
                    client.clearStore();
                    return (<Redirect to={'/example/login'}/>);
                }}
            </ApolloConsumer>
        );
    }
}

export default LogoutPage;