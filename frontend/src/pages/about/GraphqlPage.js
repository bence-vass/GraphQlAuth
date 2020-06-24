import React from 'react';
import Fig from "../../components/Fig";
import example from '../../images/queryexample.png'
import query from '../../images/graphqlquery.png'

const GraphqlPage = () => {
    return (
        <div>
            <Fig></Fig>
            <div className={'about-container'}>
                <h2>GraphQl</h2>
                <i><div>
                    "GraphQL is a query language for APIs and a runtime for fulfilling those queries
                    with your existing data. GraphQL provides a complete and understandable description
                    of the data in your API, gives clients the power to ask for exactly what they need and
                    nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools."
                </div></i>
                <img src={example} alt="qraphql"/>
                <div>
                    I had experiences with RestAPI, but after using GraphQl, I do not see RestAPI as the best solution
                    for backend-frontend communication. Despite the fact that, I did not make any measurements between
                    these two in terms of computation demand and speed, but it is clear that the GraphQl is more
                    capable with the now days standards. With the solution that you only query data, that you need,
                    it is capable to sending significantly smaller requests and responses. After all, since everything
                    about the UX, and some countries have exceedingly slow mobile data connection, it could be the
                    best solution to increase user experience.
                </div>
                <img src={query} alt="graphql"/>
                <a href="https://graphql.org/learn/"><div>
                    You can check out the GraphQl site for more advanced description (link here)
                </div></a>
            </div>
        </div>

    );
};

export default GraphqlPage;