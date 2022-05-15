import React, { useEffect, useState } from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";
import ClipLoader from "react-spinners/ClipLoader";
import "./VideoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import {useParams} from "react-router-dom";

const videos = gql`
  query videos($limit: Int!, $skip: Int!) {
    showVideos(limit: $limit, skip: $skip) {
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
      description
    }
  }
`;

function VideoListSearch() {
    const {idProfile, s} = useParams();

    const [search, setSearch] = useState(s);
    const [boolSearch, setBoolSearch] = useState(true);
    const [video, setVideo] = useState(s);
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [allVideos, setAllVideos] = useState([]);
    var counter = 0;

    const result = useQuery(videos, {
      variables: {
        limit: limit,
        skip: skip,
      }
    });
    console.log(result.data);

    useEffect(function() {
      if(skip === 0) return;

      
    }, [skip]);
    
    /*if(skip > 0) {
      result.updateQuery({
        query: videos,
        variables: {
          limit: limit,
          skip: skip,
        }
      });
    }*/

    const navigateVideo = useNavigate();
    const navigationVideo = (id) => {
      console.log(id);
      navigateVideo(`/video/${id}/${idProfile}`);
    }

    const navigateProfile = useNavigate();
    const navigationProfile = (id) => {
      console.log(id);
      navigateProfile(`/profile/${id}`);
    }

    /*const filter = (s) => {
      var results = 
    }*/

    const {data, loading, error} = useQuery(searchVideo, {
      variables: {
        title: search,
      }
    });

    console.log(data);

    if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    /*
                    Comentarios: 
                      {c.comments.map((com) => {
                        
                      })}
                      
                      {c.description}*/

    return (
      <div className="input-videos">
          <div className="input-data">
            <div className='userProfile' onClick={(e) => {
              navigationProfile(idProfile)
            }}>
              <FontAwesomeIcon icon={faUserAstronaut} size="3x" border/>
            </div>
            
            <input
              type="text"
              name="search"
              className="field"
              value={video}
              onChange={e => {
                setVideo(e.target.value)
                setBoolSearch(false)
              }}
              placeholder="Buscar"/>

            <button className='search-button' onClick={(e) => {
              setSearch(video);
              setBoolSearch(true);
            }}>
              <FontAwesomeIcon icon={faSearch}/> Buscar
            </button>
          </div>
          
          <div className="menu">
            <h2 className='h2-videos'>Novedades:</h2>
            {boolSearch && data?.searchVideo.map((c) => {
              return (
                <div className="element" onClick={e => {
                    //setId(c.id);
                    navigationVideo(c.id);
                  }}>
                  <img className="image-video" src={c.image} width="250px" height="150px"/>
                  <div className="data-video">
                    <div className="videos"><h3>{c.title}</h3></div>
                    <div className='profile-im'>
                      <FontAwesomeIcon icon={faUserAstronaut} size="2x" border/>
                      <div className="infoUser">
                        <div className="author">
                          {c.author.username}
                        </div>
                        <div className="date">{Date(c.date).substring(4,15)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {boolSearch == false && result.data?.showVideos.map((c) => {
              return (
                <div className="element" onClick={e => {
                    //setId(c.id);
                    navigationVideo(c.id);
                  }}>
                  <img className="image-video" src={c.image} width="250px" height="150px"/>
                  <div className="data-video">
                    <div className="videos"><h3>{c.title}</h3></div>
                    <div className='profile-im'>
                      <FontAwesomeIcon icon={faUserAstronaut} size="2x" border/>
                      <div className="infoUser">
                        <div className="author">
                          {c.author.username}
                        </div>
                        <div className="date">{Date(c.date).substring(4,15)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            )}

            {boolSearch == false && <button className="but-more" onClick={(e) => {
              counter = counter + 5;
              setSkip(counter);
              
              //const currentLength = result.data.showVideos.length;
              result.fetchMore({
                variables: {
                  limit: limit,
                  skip: skip,
                }
              }).then(fetchMoreResult => {
                // Update variables.limit for the original query to include
                // the newly added feed items.
                setLimit(skip + fetchMoreResult.result.data.showVideos.length);
              });
              
            }}>Más videos</button>}
            {boolSearch == false && skip !== 0 && <button className="but-more" onClick={(e) => {
                counter = skip - 5;
                setSkip(counter);
                
            }}>Anteriores videos</button>}
          </div>
      </div>
    );
}

export default VideoListSearch;