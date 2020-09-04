import React, {Component} from 'react';

class NetworkErrorPage extends Component {
    render() {
        return (
            <div className={'network-err'}>
                <h1>Oops... something went wrong.</h1>
                <h3>Please try again later</h3>
            </div>
        );
    }
}

export default NetworkErrorPage;