import React, { useState } from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import {useParams} from "react-router-dom";

const podcasts = gql`
  query podcasts($limit: Int!, $skip: Int!) {
    showPodcasts(limit: $limit, skip: $skip) {
      id
      image,
      url,
      author {
        id
        username
      },
      title,
      date
      description
    }
  }
`;

const searchPodcast = gql`
  query searchPodcast($title: String!) {
    searchPodcast(title: $title) {
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

function PodcastList() {
    const [search, setSearch] = useState("");
    const [boolSearch, setBoolSearch] = useState(false);
    const [podcast, setPodcast] = useState("");
    //const [id, setId] = useState("");
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    var counter = 0;

    const {idProfile} = useParams();

    const result = useQuery(podcasts, {
      variables: {
        limit: limit,
        skip: skip,
      }
    });
    console.log(result.data);

    const navigatePodcast = useNavigate();
    const navigationPodcast = (id) => {
      console.log(id);
      navigatePodcast(`/podcast/${id}/${idProfile}`);
    }

    const navigateProfile = useNavigate();
    const navigationProfile = (id) => {
      console.log(id);
      navigateProfile(`/profile/${id}`);
    }

    /*const filter = (s) => {
      var results = 
    }*/

    const {data, loading, error} = useQuery(searchPodcast, {
      variables: {
        title: search,
      }
    });

    if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    /*
                    Comentarios: 
                      {c.comments.map((com) => {
                        
                      })}
                      
                      {c.description}*/

    return (
      <div className="Menu">
          <div className="input-data">
            <div className='userProfile' onClick={(e) => {
              navigationProfile(idProfile);
            }}>
              <FontAwesomeIcon icon={faUserAstronaut} size="3x" border/>
            </div>
            
            <input
              type="text"
              name="search"
              className="field"
              value={podcast}
              onChange={e => {
                setPodcast(e.target.value)
                setBoolSearch(false)
              }}
              placeholder="Buscar"/>

            <button className='search-button' onClick={(e) => {
              setSearch(podcast);
              setBoolSearch(true);
            }}>
              <FontAwesomeIcon icon={faSearch}/> Buscar
            </button>
          </div>
          
          <div className="menu">
            <h2 className='h2-videos'>Novedades:</h2>
            {boolSearch && data?.searchPodcast.map((c) => {
              return (
                <div className="element" onClick={e => {
                    //setId(c.id);
                    navigationPodcast(c.id);
                  }}>
                  <img className="image-video" src={c.image} width="250px" height="150px"/>
                  <div className="data-video">
                    <div className="videos"><h3>{c.title}</h3></div>
                    <div className="profile-im">
                      <FontAwesomeIcon icon={faUserAstronaut} size="2x" border/>
                      <div className="infoUser">
                        <div className="author">{c.author.username}</div>
                        <div className="date">{Date(c.date).substring(4,15)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {boolSearch == false && result.data?.showPodcasts.map((c) => {
              return (
                <div className="element" onClick={e => {
                    //setId(c.id);
                    navigationPodcast(c.id);
                  }}>
                  <img className="image-video" src={c.image} width="250px" height="150px"/>
                  <div className="data-video">
                    <div className="videos"><h3>{c.title}</h3></div>
                    <div className="profile-im">
                      <FontAwesomeIcon icon={faUserAstronaut} size="2x" border/>
                      <div className="infoUser">
                        <div className="author">{c.author.username}</div>
                        <div className="date">{Date(c.date).substring(4,15)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            )}

            {result.data?.showPodcasts >= limit && boolSearch === false && <button className="but-more" onClick={(e) => {
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
              
            }}>Más podcasts</button>}
            {boolSearch === false && skip !== 0 && <button className="but-more" onClick={(e) => {
              counter = skip - 5;
              setSkip(counter);
              
            }}>Anteriores podcasts</button>}
          </div>
      </div>
    );
}

export default PodcastList;