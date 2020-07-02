import React from 'react';
import Gist from "react-gist";
import Fig from "../../components/Fig";

const DockerPage = () => {
    return (
        <div>
            <Fig>Docker is a largely scalable and it is ideal to quick start your project on all
            environment. I recommend you to use it even in earlier development state too</Fig>
        <div className={'about-container'}>
            <h2>Docker</h2>
            <i><div>"Docker is a platform for developers and sysadmins to build, run, and share
                applications with containers. The use of containers to deploy applications is
                called containerization. Containers are not new, but their use for easily deploying
                applications is."</div></i>
            <div>Docker can be useful for every kind of project in order to easily setup at all
            environment. My first intention was, to dockerize the back- and frontend even in the
            development state. I would recommend you to be cautious with your system specs, because
            if you want to keep your project on low-budget, you have to compromise, agree with other
                solutions.
            </div>

        </div>
        </div>
    );
};

export default DockerPage;