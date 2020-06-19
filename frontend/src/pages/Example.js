import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class Example extends Component {
    render() {
        return (
            <div>
                {localStorage.getItem('token')?
                    <Redirect to={'/example/profile'}/>
                    :
                    <Redirect to={'/example/signup'}/>
                }
            </div>
        );
    }
}

export default Example;