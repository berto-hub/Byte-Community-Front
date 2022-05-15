import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Page from './components/Page/Page';
import {ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider} from "@apollo/client";

/*const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:8080"
  }),
  uri: "http://localhost:8080",
});

const query = gql`
  query {
    showUsers {
      name,
      email
    }
  }
`;

client.query({query: query}).then(res => console.log(res.data));
*/

const client = new ApolloClient({
  cache: new InMemoryCache(),
  /*link: new HttpLink({
    uri: "https://byte-community-back.herokuapp.com"
  }),*/
  uri: "https://byte-community-back.herokuapp.com/graphql",
  /*headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
  credentials: "omit",*/
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
