import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, from, Observable} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from "apollo-link-error";
import {gql} from 'apollo-boost';

const REFRESH_TOKEN = gql`
    mutation RefreshToken($token: String!) {
        refreshToken(refreshToken: $token) {
            token
            payload
            refreshToken
            refreshExpiresIn
        }
    }
`;
const refreshAccessToken = async (refreshToken) => {
    /*console.log('.............................................');
    console.log('refresh auth token with token:');
    console.log(refreshToken);
    console.log('.............................................');*/
    return client.mutate({
        mutation: REFRESH_TOKEN,
        variables: {token: refreshToken},
    })
};
const ERRORS_TO_REFRESH = [
    //'Token is required',
    'Signature has expired',
];

const link = new HttpLink({uri: 'https://backend:8000/graphql/'});
const authMiddleware = new ApolloLink((
    operation,
    forward) => {
    if (localStorage.getItem('token')) {
        operation.setContext({
            headers: {
                authorization: ('JWT ' + localStorage.getItem('token')),
            }
        });

    }

    return forward(operation)
},);
const tokenRefreshLink = onError(({
                                graphQLErrors,
                                networkError,
                                operation,
                                forward,
                            }) => {
    if(graphQLErrors) {
        for (let err of graphQLErrors) {
            if (ERRORS_TO_REFRESH.includes(err.message)) {
                if (localStorage.getItem('refreshToken')) {
                    return new Observable(observe => {
                        refreshAccessToken(localStorage.getItem('refreshToken')).then(res => {
                            localStorage.setItem('token', res.data.refreshToken.token);
                            localStorage.setItem('refreshToken', res.data.refreshToken.refreshToken);
                            localStorage.setItem('exp', res.data.refreshToken.payload.exp);
                            operation.setContext({
                                headers: {
                                    authorization: 'JWT ' + res.data.refreshToken.token
                                }
                            });
                            client.writeData({
                                data: {exp: res.data.refreshToken.payload.exp},
                            });
                        }).catch(err => {
                            console.log(err);
                            console.log('err in refresh');
                        }).then(() => {
                            const subscriber = {
                                next: observe.next.bind(observe),
                                error: observe.error.bind(observe),
                                complete: observe.complete.bind(observe),
                            };
                            forward(operation).subscribe(subscriber)
                        }).catch(err => {
                            console.log('error at end of reauth');
                            observe.error(err)
                        })
                    })
                } else {

                }
            } else {
                console.log('unhandled');
                console.log(err);
            }
        }
    }


});
const cache = new InMemoryCache();
const client = new ApolloClient({
    cache: cache,
    link: from([
        tokenRefreshLink,
        authMiddleware,
        link,
    ]),

});
let data = {
    exp: 0,
    refreshExp: 0,
};
if(localStorage.getItem('exp') && localStorage.getItem('refreshExp')){
    data = {
        exp: localStorage.getItem('exp'),
        refreshExp: localStorage.getItem('refreshExp'),
    };
}

cache.writeData({data});

client.onClearStore(async () => await cache.writeData({data}));
client.onResetStore(async () => await cache.writeData({data}));


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
