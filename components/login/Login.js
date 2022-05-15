import React, {useState} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const log = gql`
  query login(
    $username: String!,
    $email: String!,
    $password: String!,
  ){
    login(username: $username, email: $email, password: $password) {
      id,
      username
    }
  }
`;

/*type UserInput = {
  name: String!,
  email: String!,
  password: String!,
}*/

/*const newUser = gql`
  mutation CreateUser(
    $username: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(username: $username, email: $email, password: $password) {
      _id,
      username,
    }
  }
`;*/

function permission() {
    console.log("Click");
}

function Login() {
    //const result = useQuery(users);
    //console.log(result.data);
    //http://localhost:8080/graphql

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [name, setName] = useState("");
    const [em, setEm] = useState("");
    const [pa, setPa] = useState("");

    const [logIn, setLogIn] = useState(false);

    //const [createUser] = useMutation(newUser);
    const {data, loading, error} = useQuery(log, {
      variables: {
        username: username,
        email: email,
        password: password,
      }
    });

    const navigateLogin = useNavigate();
    const navigationLogin = (id) => {
      navigateLogin(`/menu/${id}`);
    }

    const loginQuery = () => {
      console.log(data);
      
      console.log(em); 
      console.log(name); 
      console.log(pa);

      console.log(email); 
      console.log(username); 
      console.log(password);

      if(data.login !== null){
        navigationLogin(data?.login.id)
      }
    }

    const navigateRegister = useNavigate();
    const navigationRegister = () => {
      navigateRegister("/register");
    }

    return (
        <div className="login">
            <div className="image"></div>
            <div className="title">Accede con tu cuenta</div>
            <form onSubmit={e => {
              //createUser({variables: {username, email, password}})
            }}>
            <div className="input-login">
                <input
                    type="text"
                    name="username"
                    className="field"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"/>
            </div>
            
            <div className="input-login">
                <input
                    type="text"
                    name="email"
                    className="field"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                    placeholder="Email"/>
            </div>

            <div className="input-login">
                <input
                    type="password"
                    name="password"
                    className="field"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                    }}
                    placeholder="Password"/>
            </div>

            <button className="but-login" onClick={(e) => {
              setEm(email);
              setPa(password);
              setName(username);
              
              loginQuery();
              //navigationLogin
            }}>Login</button>

            <button className="but-login" onClick={navigationRegister}>Registrar</button>
            </form>
        </div>
    );
}

export default Login;