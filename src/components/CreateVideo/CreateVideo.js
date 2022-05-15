import React, {useState} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import "./CreateVideo.css";

const newVideo = gql`
  mutation addVideo(
    $title: String!,
    $author: String!,
    $url: String!,
    $description: String!,
    $image: String!,
  ) {
    addVideo(title: $title, author: $author, url: $url, description: $description, image: $image){
        title
    }
  }
`;

const CreateVideo = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(id);
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState("");

    const [addVideo] = useMutation(newVideo);
    //setAuthor(id);

    /*const result = useQuery(profile, {
        variables: {
            id: id,
        }
    });*/

    //const resultVideos = useQuery(videos);
    //console.log(resultVideos.data);
    
    /*console.log(result.data);
    console.log(result.error);

    const navigateProfile = useNavigate();
    const navigationProfile = (id) => {
      console.log(id);
      navigateProfile(`/dataProfile/${id}`);
    }*/

    //if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    return (
        <div className="all">
            <div className="input-profile">
                <div className='profile'><FontAwesomeIcon icon={faUserAstronaut} size="3x" border/></div>
                <div>
                    <h3>Datos del video</h3>
                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        placeholder="Url de la imagen"/>

                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="Url del video"/>

                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Titulo"/>

                    <input
                        type="text"
                        name="search"
                        className="field"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descripción"/>

                </div>
                <button className="but-cr-vid" onClick={(e) => {
                    addVideo({variables: {title, description, author, image, url}});
                    window.history.back();
                }}>Subir video</button>
            </div>
        </div>
    );
}

export default CreateVideo;