import React, { useState } from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import {useParams} from "react-router-dom";
import "./DataProfile.css";

const user = gql`
    query findUserId($id: String!) {
        findUserId(id: $id) {
            id,
            username,
            email,
            password
        }
    }
`;

const videosAuthor = gql`
  query videosAuthor($idAuthor: String!, $limit: Int!, $skip: Int!)  {
    showVideosAuthor(idAuthor: $idAuthor, limit: $limit, skip: $skip) {
      id
      image,
      url,
      author {
        id
        username
      },
      title,
      date,
      description
    }
  }
`;

const podcastsAuthor = gql`
  query podcastsAuthor($idAuthor: String!, $limit: Int!, $skip: Int!)  {
    showPodcastsAuthor(idAuthor: $idAuthor, limit: $limit, skip: $skip) {
      id
      image,
      url,
      author {
        id
        username
      },
      title,
      date,
      description
    }
  }
`;

const searchVideo = gql`
  query searchVideo($title: String!) {
    searchVideo(title: $title) {
      id
      image,
      url,
      author {
        id
        username
      },
      title,
      date,
      description,
      comments
    }
  }
`;

const addFollow = gql`
  mutation addFollow($id: String!, $idFollow: String!) {
    addFollow(id: $id, idFollow: $idFollow) {
      username
      follows {
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
        username
      }
    }
  }
`;

function ProfileVideos() {
    const [search, setSearch] = useState("");
    const [boolSearch, setBoolSearch] = useState(false);
    const [video, setVideo] = useState("");
    //const [id, setId] = useState("");
    //const [user, setUser] = useState("");
    const [follow, setFollow] = useState();
    const [limitv, setLimitv] = useState(5);
    const [skipv, setSkipv] = useState(0);
    const [limitp, setLimitp] = useState(5);
    const [skipp, setSkipp] = useState(0);
    var counterv = 0;
    var counterp = 0;

    //const [newFollow, {dataFollow}] = useMutation(addFollow);
    //const [deleteFollow] = useMutation(removeFollow);
    
    const {id} = useParams();
    const resultUser = useQuery(user, {
        variables: {
            id: id,
        }
    });

    const result = useQuery(videosAuthor, {
        variables: {
            idAuthor: id,
            limit: limitv,
            skip: skipv,
        }
    });
    console.log(result.data);

    const resultPodcasts = useQuery(podcastsAuthor, {
        variables: {
            idAuthor: id,
            limit: limitp,
            skip: skipp,
        }
    });
    console.log(resultPodcasts.data);

    const navigateVideo = useNavigate();
    const navigationVideo = (id, idProfile) => {
      console.log(id);
      navigateVideo(`/video/${id}/${idProfile}`);
    }

    const navigatePodcast = useNavigate();
    const navigationPodcast = (id, idProfile) => {
      console.log(id);
      navigatePodcast(`/podcast/${id}/${idProfile}`);
    }

    /*const followExist = () => {
      var exist = resProfile.data?.findUserId.follows.some((f) => {
        return f.id === result.data?.findVideo.author.id
      });

      if(follow !== undefined){
        if(exist !== follow){
          exist = follow;
        }
      }

      return exist;
    }*/

    /*const filter = (s) => {
      var results = 
    }*/

    /*const {data, loading, error} = useQuery(searchVideo, {
      variables: {
        title: search,
      }
    });

    console.log(data);*/

    if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    /*
                    Comentarios: 
                      {c.comments.map((com) => {
                        
                      })}
                      
                      {c.description}*/

    return (
      <div className="profile-menu">
          <div className="input-data">
            <div className='user-profile' onClick={(e) => {
              //navigationProfile()
            }}>
                <FontAwesomeIcon icon={faUserAstronaut} size="3x" border/>
                <div className="usname-prof">{resultUser.data?.findUserId.username}</div>

            </div>
            {/*(followExist()===false || follow===false) && <button className='but-follow' onClick={() => {
              setFollow(true);
              newFollow({variables: {id: idProfile, idFollow: result.data?.findVideo.author.id}});
              console.log(dataFollow);
            }}>Seguir</button>}
            {(followExist()===true || follow===true) && <button className='but-follow' onClick={() => {
              setFollow(false);
              deleteFollow({variables: {id: idProfile, idFollow: result.data?.findVideo.author.id}});
            }}>Seguido</button>*/}
          </div>
          
          <div className="menu">
            <h2 className='h2-videos'>Videos:</h2>
            {result.data?.showVideosAuthor.map((c) => {
              return (
                <div className="element" onClick={e => {
                    //setId(c.id);
                    navigationVideo(c.id, id);
                  }}>
                  <img className="image-video" src={c.image} width="250px" height="150px"/>
                  <div className="data-video">
                    <div className="videos"><h3>{c.title}</h3></div>
                    <div className="infoUser">
                      <div className="author">{c.author.username}</div>
                      <div className="date">{Date(c.date).substring(4,15)}</div>
                    </div>
                  </div>
                </div>
              );
            }
            )}
            {(result.data?.showVideosAuthor.length >= limitv) && <button className="but-more" onClick={(e) => {
              counterv = counterv + 5;
              setSkipv(counterv);
              
            }}>Más videos</button>}
            {skipv !== 0 && <button className="but-more" onClick={(e) => {
              counterv = skipv - 5;
              setSkipv(counterv);
              
            }}>Anteriores videos</button>}

            <h2 className='h2-videos'>Podcasts:</h2>
            {resultPodcasts.data?.showPodcastsAuthor.map((c) => {
              return (
                <div className="element" onClick={e => {
                    //setId(c.id);
                    navigationPodcast(c.id, id);
                  }}>
                  <img className="image-video" src={c.image} width="250px" height="150px"/>
                  <div className="data-video">
                    <div className="videos"><h3>{c.title}</h3></div>
                    <div className="infoUser">
                      <div className="author">{c.author.username}</div>
                      <div className="date">{Date(c.date).substring(4,15)}</div>
                    </div>
                  </div>
                </div>
              );
            }
            )}
            {console.log(resultPodcasts.data?.showPodcastsAuthor.length)}
            {(resultPodcasts.data?.showPodcastsAuthor.length >= limitp) && <button className="but-more" onClick={(e) => {
              counterp = counterp + 5;
              setSkipp(counterp);

            }}>Más podcasts</button>}
            {skipp !== 0 && <button className="but-more" onClick={(e) => {
              counterp = skipp - 5;
              setSkipp(counterp);
              
            }}>Anteriores podcasts</button>}
          </div>
      </div>
    );
}

export default ProfileVideos;