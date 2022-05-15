import React, {useState, useEffect} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import "./Profile.css";

const profile = gql`
  query findAuthor(
    $id: String!,
  ){
    findAuthor(id: $id) {
      id
      username,
      email,
      password,
    }
  }
`;

const updateProfile = gql`
  mutation updateUser(
    $id: String!
    $username: String,
    $email: String,
    $password: String
  ) {
    updateUser(id: $id, username: $username, email: $email, password: $password)
  }
`;

const Profile = () => {
    const {id} = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*useEffect(() => {
        window.location.reload();
    });*/

    const [updateUser] = useMutation(updateProfile);

    const result = useQuery(profile, {
        variables: {
            id: id,
        }
    });

    //const resultVideos = useQuery(videos);
    //console.log(resultVideos.data);
    
    console.log(result.data);
    console.log(result.error);

    const navigateProfile = useNavigate();
    const navigationProfile = (id) => {
      console.log(id);
      navigateProfile(`/dataProfile/${id}`);
    }

    const navigateFollows = useNavigate();
    const navigationFollows = (id) => {
      console.log(id);
      navigateFollows(`/follows/${id}`);
    }

    const navigateNewVideo = useNavigate();
    const navigationNewVideo = (id) => {
      console.log(id);
      navigateNewVideo(`/createVideo/${id}`);
    }

    const navigateNewPodcast = useNavigate();
    const navigationNewPodcast = (id) => {
      console.log(id);
      navigateNewPodcast(`/createPodcast/${id}`);
    }

    if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    return (
        <div className="all">
            <div className="editProfile">
                <div className='profileImage'><FontAwesomeIcon icon={faUserAstronaut} size="3x" border/></div>
                <button className='but-profile' onClick={(e)=>{navigationProfile(id)}}>Ver perfil</button>
                <button className='but-follows' onClick={(e)=>{navigationFollows(id)}}>Ver seguidos</button>
                <div className='input-profile'>
                    <h3>Editar datos del perfil</h3>
                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder={result.data?.findAuthor.username}/>

                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={result.data?.findAuthor.email}/>

                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={result.data?.findAuthor.password}/>
                </div>
                <button className='but-profile' onClick={(e) => {
                    updateUser({variables: {id, username, email, password}});
                    //window.location.reload();
                }}>Actualizar datos</button>
            </div>
        
            <div className='addData'>
                <button className='but-profile' onClick={(e)=>{navigationNewVideo(id)}}>Subir video</button>
                <button className='but-profile' onClick={(e)=>{navigationNewPodcast(id)}}>Subir podcast</button>
            </div>
        </div>
    );
}

export default Profile;