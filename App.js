import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider} from "@apollo/client";
import Login from "./components/login/Login";
import Page from "./components/Page/Page";

function App() {
  /*useEffect(() =>{
    fetch("https://byte-community-back.herokuapp.com",
      {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        mode: 'no-cors',
        body: JSON.stringify({ query: `
          query {
            showUsers {
              name,
              email
            }
          }`
        })
      }
    ).then(res => res.json())
    .then(res => {
      console.log(res.data)
    });
  })*/

/*const client = new ApolloClient({
  cache: new InMemoryCache(),
  /*link: new HttpLink({
    uri: "http://localhost:8080"
  }),*/
  /*uri: "https://byte-community-back.herokuapp.com",
  /*headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
  credentials: "omit",*/
/*});*/

/*const query = gql`
  query {
    showUsers {
      name,
      email
    }
  }
`;*/

  /*client.query({query: query}).then(res => {
    console.log(res.data);
  });*/

  return (
    //<ApolloProvider client={client}>
    <div className="App">
      <Page/>
    </div>
    //</ApolloProvider>
  );
}

export default App;
