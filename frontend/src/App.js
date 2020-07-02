import React from 'react';
import './style.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Example from "./pages/Example";
import Codes from "./pages/Codes";
import About from "./pages/About";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import ExpirationDisplay from "./components/ExpirationDisplay";
import JwtPage from "./pages/about/JwtPage";
import ApolloPage from "./pages/about/ApolloPage";
import AboutPage from "./pages/AboutPage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import DockerPage from "./pages/about/DockerPage";
import GraphqlPage from "./pages/about/GraphqlPage";
import NetworkErrorPage from "./pages/NetworkErrorPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Route path={'/about'}><About/></Route>
                <Route path={'/example'}><ExpirationDisplay/></Route>
                <Query query={gql`query{networkStatus}`} fetchPolicy={'cache-only'}>
                    {({data,client})=>{
                        if(data && data.networkStatus === 0){
                            client.writeData({
                                data: {networkStatus: 1},
                            });
                            return <Redirect to={'/network-error'}/>
                        } else {
                            return null
                        }

                    }}
                </Query>
                <Switch>
                    <Route path={'/example/signup'}><SignupPage/></Route>
                    <Route path={'/example/login'}><LoginPage/></Route>
                    <Route path={'/example/logout'}><LogoutPage/></Route>
                    <Route path={'/example/profile/update'}><ProfileUpdatePage/></Route>

                    <Route path={'/example/profile'}><ProfilePage/></Route>

                    <Route path={'/example'}><Example/></Route>
                    <Route path={'/codes'}><Codes/></Route>
                    <Route path={'/about/apollo'}><ApolloPage/></Route>
                    <Route path={'/about/jwt'}><JwtPage/></Route>
                    <Route path={'/about/graphql'}><GraphqlPage/></Route>
                    <Route path={'/about/docker'}><DockerPage/></Route>
                    <Route exact path={'/about'}><AboutPage/></Route>
                    <Route exact path={'/network-error'}><NetworkErrorPage/></Route>
                    <Route exact path={'/'}><Home/></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
