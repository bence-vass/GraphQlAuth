import React from 'react';
import Fig from "../components/Fig";
import {Link} from "react-router-dom";

const AboutPage = () => {
    return (
        <div>
            <Fig>Here you can learn more about the stacks</Fig>
            <div className={'about-container'}>
            <div>
            It is a guide for newbies for some of the cutting edge techs, if you want to know more about its solutions, you
            should read the <Link to={'codes'}>Codes section</Link>.
                <a href="https://github.com/bence-vass/GraphQlAuth" target="_blank">
                    <div><h3>Source: Github repo</h3></div>
                </a>
            </div>
                <h2>The goal</h2>
                <div>
                    This project is a learning-project, I knew nothing about GraphQl nor Graphene at the
                    beginning, but I could master some of the techniques, through this project. Hopefully
                    it will be a great base for later, will come handy with more robust projects with similar stack. My
                    solutions might not be the best, but I hope that others could learn about my mistakes
                    and avoid them.
                </div>
            </div>

        </div>
    );
};

export default AboutPage;