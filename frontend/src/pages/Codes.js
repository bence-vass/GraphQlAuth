import React, {Component} from 'react';
import Fig from "../components/Fig";
import Gist from "react-gist";

class Codes extends Component {

//<script src="https://gist.github.com/bence-vass/3c363248e8dacfd7eaba9c5ddcc658b1.js"></script>

    render() {
        return (
            <div className={'codes'}>
                <Fig style={{position: 'fixed'}} textStyle={{transform: 'translate(100%, -5%)'}}>
                    <div style={{textAlign: 'left'}}>
                        You can read here about:
                        <ul style={{
                            listStyleType: 'none',
                            margin: '10px',
                            padding: 0,
                        }}>
                            <a href="#prologue"><li><b>The goal</b></li></a>
                            <li>
                                <b>Frontend:</b>
                                <ul>
                                    <a href="#auth"><li>Authentication</li></a>
                                    <a href="#store"><li>Storing the tokens</li></a>
                                    <a href="#refresh"><li>Refreshing token</li></a>
                                    <a href="#logout"><li>Logout Method</li></a>
                                    <a href="#expDisp"><li>Expiration Display</li></a>
                                    <a href="#refetch"><li>Refetch Data</li></a>
                                    <a href="#update"><li>Update Data</li></a>
                                </ul>
                            </li>

                            <li>
                                <b>Backend:</b>
                                <ul>
                                    <li>Graphene-Django</li>
                                </ul>
                            </li>
                            <li>
                                <b>DevOps:</b>
                                <ul>
                                    <a href="#docker"><li>Docker</li></a>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Fig>
                <a href="https://github.com/bence-vass/GraphQlAuth" target="_blank">
                    <div><h3>Source: Github repo</h3></div>
                </a>
                <script src="https://gist.github.com/bence-vass/3c363248e8dacfd7eaba9c5ddcc658b1.js"></script>
                <div className={'prologue'} id={'prologue'}>
                    I would like to write more about the difficulties of this project. The goal of this
                    project was, that I could learn the usage of the GraphQl, the Apollo Client and the
                    Graphene-Django package. Therefor please note, that this project is not a work of an
                    expert, and there might be better solutions out there. But I am still sharing this with
                    the hope, that others might learn about my mistakes and I can give some practical advise
                    for other newcomers. If your not familiar with the following techs, I would recommend you
                    to read the <a href="/about">About Page</a> first, where I give a rough description about
                    their fundamentals.
                </div>
                <div className={'frontend'}>
                    <div>
                        This is the most interesting part of this project after all, so take a look on it
                        first.
                    </div>
                    <h2 id={'auth'}>Authentication</h2>
                    <div>
                        In terms of basic queries and mutations with the usage of the documentation it was
                        pretty easy to learn it, so the first authentication process was not a difficulty.
                        The client send a request the server response, it is simple, but for permission
                        required data you need to send your authentication token in the request, that cause
                        me the first issue. Despite the fact that it is well documented &nbsp;
                        <a href="https://www.apollographql.com/docs/react/networking/authentication/#header">
                            (link here)</a>, at first I could not get the idea of the Apollo Links. So I definitely
                        would recommend to read the
                        <a href="https://www.apollographql.com/docs/link/overview/"> concept guide (link here)</a>
                            , first and only then start coding.
                        <div>For those, who is interested in Graphene package, by default in the authorization
                        the package use "JWT" + token for identification instead of "Bearer".</div>
                    </div>
                    <Gist id={'3c363248e8dacfd7eaba9c5ddcc658b1'} file={'index1.js'}/>

                    <h2 id={'store'}>Storing the tokens</h2>
                    <div>
                        After the authentication, the client should store the data. As far as I am concerned one
                        of the most popular why the do so, is storing them in the localStorage of the browser. After
                        you leave the site it will remain stored, so even though the access token is expired, the
                        refresh token can be used.
                    </div>
                    <h2 id={'refresh'}>Refreshing token</h2>
                    <div>
                        This is also a part of the project, which could not be understood unless you have read
                        the <a href="https://www.apollographql.com/docs/link/overview/">Apollo Link guide</a>.&nbsp;
                        The main concept, that if the access token is expired, with the refresh token the client
                        request a new one. I think one of the best way, when the client made a request and the server
                        respond that signature token is expired, the client should make a token refresh call then
                        try again with the original request. There is no need to refresh tokens right after they are
                        expired, it is easier to catch errors and handle them.
                        <br/>
                        After a lot of research I found a code in a &nbsp;
                        <a href="https://github.com/apollographql/apollo-link/issues/190#issuecomment-340736211">
                            github thread by anju-kosambi
                        </a>, with a bit of modification I used it for the refresh process, which I found perfectly
                        viable solution. With the &nbsp;
                        <a href="https://www.apollographql.com/docs/link/links/error/">apollo-link-error</a>
                        &nbsp; you can catch the error and modify the request
                        accordingly. Although I made it with this method, I would like to mention the there
                        a community link for this purpose &nbsp;
                        <a href="https://github.com/newsiberian/apollo-link-token-refresh">
                            (link here) called apollo-link-token-refresh
                        </a>
                        and at this point I can not emphasis enough the how useful could be reading through
                        a documentation.
                        <br/>
                        This is the first time the I wrote authentication method, therefor it was not go
                        without saying, for me how to handle different situation with token. For example
                        what if the access token is invalid but the refresh is still live, what if the refresh
                        is invalid. After bit of thinking I come to conclusion, that the app can not mess
                        up with the stored data, if the token is invalid it is because of an auth server error or
                        some kind of third party activity. In order to securely manage authentication data, I have
                        found that the easiest way is to logout the user and clear the store.
                    </div>
                    <Gist id={'3c363248e8dacfd7eaba9c5ddcc658b1'} file={'index2.js'}/>

                    <h2 id={'logout'}>Logout Method</h2>
                    <div>
                        The logout method clears the localStorage, clear the Apollo store, and set the values to the
                        required value, then redirect to the home page.
                    </div>
                    <Gist id={'3c363248e8dacfd7eaba9c5ddcc658b1'} file={'index3.js'}/>

                    <h2 id={'expDisp'}>Expiration Display</h2>
                    <div>
                        On each token refresh, Apollo updates the expiration time in its store. When the store is
                        updated, Apollo automatically refetch the given queries and update the containing components.
                        The components get the current time and expiration time and calculates the remaining interval
                        in milliseconds, then set it as a state of the components.
                    </div>
                    <h2 id={'refetch'}>Refetch data</h2>
                    <div>
                        With the refetch button on profile page you can update apollo cache with the new
                        server-data. You can see the request and response in your browser developer mode.
                        If the access token has expired, you can see the three request, that have been made.
                        The first is the user info query, which returns in this case an token expiration
                        error. Secondly, the Apollo link catch the error and refresh the access token, and
                        last but not least the original user query, but now with valid data.
                    </div>
                    <h2 id={'update'}>Update data</h2>
                    <div>
                        When you update your profile data, a mutation has been made, which tells the server,
                        what kind of modification you intend to do. Normally you should than make a query
                        to update the displayed information, but apollo provide an update function with
                        each mutation, which makes it possible to modify data in the store without actual
                        query, it updates the stored data and handle it as it is newly queried data and
                        rerender the components accordingly.
                        <br/>
                        In this scenerio the project has been set up this way, that the logged in user
                        can query its data without any identification in the GraphQl request, it  only
                        idetentifies by the Authorization header, therefor there is no need of use ids
                        in this case. I made the mistake that I requested id in the update mutation, there
                        for it got an id in the store too. After the update, when I tried to refetch data
                        it gives me error. I think it is a corner-case, but still worth to mention. This
                        problem can be resolved with the identical fields in both the queries and mutations.
                    </div>
                    <Gist id={'3c363248e8dacfd7eaba9c5ddcc658b1'} file={'ProfileUpdate.js'}/>

                    <h2 id={'docker'}>Docker</h2>
                    <div>
                        First of all, in developer mode the server would stop after it has successfuly started,
                        inorder to prevent that, and make it run, you have to set <b>tty: true</b>. For hot reload
                        you have to set the volumes, like it is in the docker code and also important, that you
                        have to set <b>CHOKIDAR_USEPOLLING=true</b> in the envirement, unless it will not work.
                    </div>
                    <Gist id={'3c363248e8dacfd7eaba9c5ddcc658b1'} file={'docker-compose.dev.yml'}/>
                    <div>
                        For those <b>who use Mac for development</b>, please note that it is not exactly suitable
                        for this purpose. I tried to use it with the following configuration, but the <b>latency made
                        it unusable</b>. The request from the frontend toke from <b>15s to 40s to receive response</b>
                        from the backend. It is being said, that it is some kind of sync error and it can be bypassed
                        with the docker-sync library for mac, but I did not want to waste more time with this dead-end.
                    </div>
                </div>
            </div>
        );
    }
}

export default Codes;