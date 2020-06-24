import React from 'react';
import Gist from "react-gist";
import Fig from "../../components/Fig";

const DockerPage = () => {
    return (
        <div>
            <Fig></Fig>
        <div className={'about-container'}>
            <h2>Docker</h2>
            <i><div>"Docker is a platform for developers and sysadmins to build, run, and share
                applications with containers. The use of containers to deploy applications is
                called containerization. Containers are not new, but their use for easily deploying
                applications is."</div></i>
            <div>Docker can be useful for every kind of project in order to easily setup at all
            environment. My first intention was, to dockerize the back- and frontend even in the
            development state. </div>

        </div>
        </div>
    );
};

export default DockerPage;