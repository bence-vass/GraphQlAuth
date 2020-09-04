import React from 'react';
import apolloDiagram from '../../images/apolloDiagram.svg'
import apolloCaching from '../../images/apolloCaching.png'
import Fig from "../../components/Fig";

const ApolloPage = () => {
    return (
        <div>
        <Fig>If you are not familiar with Apollo Client please read this short description or
            read the documentation, for better understanding.</Fig>
        <div className={'about-container'}>
            <h2>Apollo Client</h2>
            <i>"Apollo Client is a complete state management library for JavaScript apps. Simply write a GraphQL query,
            and Apollo Client will take care of requesting and caching your data, as well as updating your UI."</i>
            <img src={apolloDiagram} alt="apollo graphq"/>
            <div>
                With Apollo you can query and mutate data, with the greatest ease, since you can use the
                exact code that you use with GraphQl UI. In concept it is very different from Redux, but in
                it can be used pretty similarly. It helps you to manage data through components, which makes Redux
                in this case unnecessary, in my opinion. It could eliminate the necessity of the usage of Redux,
                because, Apollo`s store can rerender components, when the queried data has been changed in the store.
            </div>
            <img src={apolloCaching} alt="apollo graphq"/>
            <a href="https://www.apollographql.com/docs/"><div>
                For more detailed description, please check out the official documentation (link here)
            </div></a>
        </div>
        </div>
    );
};

export default ApolloPage;