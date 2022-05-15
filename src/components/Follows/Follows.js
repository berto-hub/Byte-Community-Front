import React, {useState} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import "./Follows.css";

const follows = gql`
  query findUserId(
    $id: String!
  ){
    findUserId(id: $id) {
      follows {
        id
        username
      }
    }
  }
`;

const removeFollow = gql`
  mutation removeFollow($id: String!, $idFollow: String!) {
    removeFollow(id: $id, idFollow: $idFollow) {
      username
      follows {
        id
        username
      }
    }
  }
`;

const Follows = () => {
    const {id} = useParams();
    const [search, setSearch] = useState("");
    const [unfollow, setUnfollow] = useState(false);
    const [follow, setFollow] = useState("");
    const [boolSearch, setBoolSearch] = useState(false);

    const [deleteFollow, {data, loading, error}] = useMutation(removeFollow);

    const result = useQuery(follows, {
        variables: {
            id: id,
        }
    });

    /*const resultPodcasts = useQuery(podcasts);
    console.log(resultPodcasts.data);*/
    
    console.log(result.data);
    console.log(result.error);

    const navigatePodcast = useNavigate();
    const navigationPodcast = (id) => {
      console.log(id);
      //navigatePodcast(`/podcast/${id}/${idProfile}`);
    }

    const navigateProfile = useNavigate();
    const navigationProfile = (id) => {
      console.log(id);
      navigateProfile(`/dataProfile/${id}`);
    }

    const navigateMyProfile = useNavigate();
    const navigationMyProfile = (id) => {
      console.log(id);
      navigateMyProfile(`/profile/${id}`);
    }

    if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    return (
        <div className="all-follows">
            <div className="input-data">
              <div className='userProfile' onClick={(e) => {navigationMyProfile(id)}}><FontAwesomeIcon icon={faUserAstronaut} size="3x" border/></div>
            
              <input
                type="text"
                name="search"
                className="field"
                value={follow}
                onChange={e => {
                    setFollow(e.target.value);
                    setBoolSearch(false);
                }}
                placeholder="Buscar"/>

              <button className='search-button' onClick={(e) => {
                setSearch(follow);
                setBoolSearch(true);
                console.log(search);
              }}>
                <FontAwesomeIcon icon={faSearch}/> Buscar
              </button>
            </div>
        
            <div className='page-follows'>
                <div className='elem-follows'>
                    {boolSearch===false && unfollow === false && result.data?.findUserId.follows.map((f) => {
                        return(
                            <div className='user-follow'>
                                <FontAwesomeIcon  onClick={() => {
                                    navigationProfile(f.id);
                                }} icon={faUserAstronaut} size="3x" border/>
                                <div  onClick={() => {
                                    navigationProfile(f.id);
                                }}className='name-follow'>{f.username}</div>
                                <button className='but-follow' onClick={() => {
                                    setUnfollow(true);
                                    deleteFollow({variables: {id: id, idFollow: f.id}});
                                }}>Dejar de seguir</button>
                            </div>
                            
                        );
                    })}
                    {boolSearch===false && unfollow === true && data?.removeFollow.follows.map((f) => {
                        return(
                            <div className='user-follow'>
                                <FontAwesomeIcon  onClick={() => {
                                    navigationProfile(f.id);
                                }} icon={faUserAstronaut} size="3x" border/>
                                <div  onClick={() => {
                                    navigationProfile(f.id);
                                }}className='name-follow'>{f.username}</div>
                                <button className='but-follow' onClick={() => {
                                    setUnfollow(true);
                                    deleteFollow({variables: {id: id, idFollow: f.id}});
                                }}>Dejar de seguir</button>
                            </div>
                            
                        );
                    })}

                    {boolSearch===true && unfollow === false && result.data?.findUserId.follows.map((f) => {
                        //console.log(search === f.username);
                        if(f.username.indexOf(search) !== -1){
                            return(
                                <div className='user-follow'>
                                    <FontAwesomeIcon  onClick={() => {
                                        navigationProfile(f.id);
                                    }} icon={faUserAstronaut} size="3x" border/>
                                    <div  onClick={() => {
                                        navigationProfile(f.id);
                                    }}className='name-follow'>{f.username}</div>
                                    <button className='but-follow' onClick={() => {
                                        setUnfollow(true);
                                        deleteFollow({variables: {id: id, idFollow: f.id}});
                                    }}>Dejar de seguir</button>
                                </div>
                                
                            );
                        }
                    })}
                    {boolSearch===true && unfollow === true && data?.removeFollow.follows.map((f) => {
                        if(f.username.indexOf(search) !== -1){
                            return(
                                <div className='user-follow'>
                                    <FontAwesomeIcon  onClick={() => {
                                        navigationProfile(f.id);
                                    }} icon={faUserAstronaut} size="3x" border/>
                                    <div  onClick={() => {
                                        navigationProfile(f.id);
                                    }}className='name-follow'>{f.username}</div>
                                    <button className='but-follow' onClick={() => {
                                        setUnfollow(true);
                                        deleteFollow({variables: {id: id, idFollow: f.id}});
                                    }}>Dejar de seguir</button>
                                </div>
                                
                            );
                        }
                    })}
                    
                </div>

                <div className='listVideos'>
                {/*resultPodcasts.data?.showPodcasts.map((c) => {
                    if(c.id !== id){
                        return (
                        <div className="elements" onClick={e => {
                            //setId(c.id);
                            navigationPodcast(c.id);
                            }}>
                            <img className="im" src={c.image} width="150px" height="100px"/>
                            <div className="d">
                                <div className="vid"><h4>{c.title}</h4></div>
                                <div className="auth">{c.author.username}</div>
                                <div className="da">{Date(c.date).substring(4,15)}</div>
                            </div>
                        </div>
                        );
                    }
                }
            )*/}
                </div>
            </div>
        </div>
    );
}

export default Follows;