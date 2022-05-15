import React, {useState} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import "./Register.css";

/*const users = gql`
  query users{
    showUsers {
      name,
      email
    }
  }
`;*/

/*type UserInput = {
  name: String!,
  email: String!,
  password: String!,
}*/

const newUser = gql`
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
`;

function permission() {
    console.log("Click");
}

function Register() {
    //const result = useQuery(users);
    //console.log(result.data);
    //http://localhost:8080/graphql

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, {data, loading, error}] = useMutation(newUser);

    const navigateLogin = useNavigate();
    const navigationLogin = () => {
      navigateLogin("/");
    }

    /*const navigateRegister = useNavigate();
    const navigationRegister = () => {
      navigateRegister("/register");
    }*/

    return (
        <div className="reg">
            <div className="title">Registrar usuario</div>
            <form>
            <div className="input-login">
                <input
                    type="text"
                    name="username"
                    className="field"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"/>
            </div>
            
            <div className="input-login">
                <input
                    type="text"
                    name="email"
                    className="field"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"/>
            </div>

            <div className="input-login">
                <input
                    type="password"
                    name="password"
                    className="field"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"/>
            </div>

            <button className="but-login" onClick={() => {
              navigationLogin();
              createUser({variables: {username, email, password}})
              console.log(data);
            }}>Registrar</button>
            </form>
        </div>
    );
}

export default Register;