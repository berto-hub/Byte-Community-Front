import React, {useEffect, useState} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import "./Video.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

const video = gql`
  query video(
    $id: String!,
  ){
    findVideo(id: $id) {
      id
      image,
      url,
      author {
        username,
        id,
        follows {
          id
          username
        }
      }, 
      title,
      date,
      description,
      comments {
        id,
        comment,
        user {
          username,
          id
        },
        date
      }
    }
  }
`;

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

const myProfile = gql`
  query findUserId($id: String!) {
    findUserId(id: $id) {
      id,
      username
      follows {
        id
      }
    }
  }
`;

const createComment = gql`
  mutation createComment($id: String!, $user: String!, $comment: String!) {
    createComment(id: $id, user: $user, comment: $comment) {
      comment,
      user {
        username,
      }
    }
  }
`;

const addComment = gql`
  mutation addComment($id: String!, $comment: String!) {
    addComment(id: $id, comment: $comment) {
      comments {
        user {
          username
        }
        comment
      }
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

/*const followUser = gql`
  mutation followUser($id: String!, $idUser: String!) {
    followUser(id: $id, idUser: $idUser) {
      id,
      username,
    }
  }
`;*/

const Video = () => {
    const {id, idProfile} = useParams();
    const [search, setSearch] = useState("");
    const [follow, setFollow] = useState();
    const [listComments, setListComments] = useState([]);
    const [comment, setComment] = useState("");
    const [com, setCom] = useState(false);
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [limitCom, setLimitCom] = useState(5);
    const [skipCom, setSkipCom] = useState(0);
    var counter = 0;
    var i = 0;

    const resProfile = useQuery(myProfile, {
      variables: {
        id: idProfile,
      }
    });
    console.log(resProfile.data);
    //var listComments = [];
    var newCom = {
      comment: "",
      username : "",
    };
    const [newComment] = useMutation(createComment);
    const [addCom, {data, loading, error}] = useMutation(addComment);
    const [newFollow, {dataFollow}] = useMutation(addFollow);
    const [deleteFollow] = useMutation(removeFollow);

    const result = useQuery(video, {
      variables: {
          id: id,
      },
    });

    const resultVideos = useQuery(videos, {
      variables:{
        limit: limit,
        skip: skip,
      },
    });
    console.log(resultVideos.data);
    
    console.log(result.data);
    console.log(result.error);

    const navigateSearch = useNavigate();
    const navigationSearch = (search) => {
      console.log(search);
      navigateSearch(`/videoListSearch/${idProfile}/${search}`);
    }

    const navigateVideo = useNavigate();
    const navigationVideo = (id) => {
      console.log(id);
      navigateVideo(`/video/${id}/${idProfile}`);
    }

    const navigateProfile = useNavigate();
    const navigationProfile = (id) => {
      console.log(id);
      navigateProfile(`/dataOtherProfile/${id}/${idProfile}`);
    }

    const navigateMyProfile = useNavigate();
    const navigationMyProfile = (id) => {
      console.log(id);
      navigateMyProfile(`/profile/${id}`);
    }
    
    /*useEffect(() => {
      setListComments(result.data?.findVideo.comments);
      console.log(listComments);
    }, []);*/

    /*useEffect(() => {
      newCom = {
        comment: comment,
        username: resProfile.data?.finUser.username,
      }
      result.data?.findVideo.comments.push(newCom);
      //setListComments([...listComments, newCom]);
      //console.log(listComments);
    }, [com]);*/

    const followExist = () => {
      var exist = resProfile.data?.findUserId.follows.some((f) => {
        return f.id === result.data?.findVideo.author.id
      });

      if(follow !== undefined){
        if(exist !== follow){
          exist = follow;
        }
      }

      return exist;
    }
    
    console.log(followExist());
    console.log("Follow " + follow);

    const makeRandomId = (length) => {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }

    if(result.loading) return <div className="load"><ClipLoader size={50} loading={result.loading}></ClipLoader></div>

    return (
        <div className="all">
            <div className="input-data">
              <div className='userProfile'  onClick={(e) => {
                navigationMyProfile(idProfile)
              }}><FontAwesomeIcon icon={faUserAstronaut} size="3x" border/></div>
            
              <input
                type="text"
                name="search"
                className="field"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar"/>

              <button className='search-button' onClick={(e) => {
                //setSearch(video);
                //setBoolSearch(true);
                navigationSearch(search);
                console.log(e.target.value);
              }}>
                <FontAwesomeIcon icon={faSearch}/> Buscar
              </button>
            </div>
        
            <div className='page'>
                <div className='elem-video'>
                    <div className='player-video'>
                        <ReactPlayer height="100%" width="100%" controls url={result.data?.findVideo.url}/>
                    </div>
                    <div className='title-video'>{result.data?.findVideo.title}</div>
                    <div className='profile'>
                      
                      <FontAwesomeIcon onClick={(e) => {
                        navigationProfile(result.data?.findVideo.author.id)
                      }} icon={faUserAstronaut} size="3x" border/>
                      <div onClick={(e) => {
                        navigationProfile(result.data?.findVideo.author.id)
                      }}className='username-profile'>{result.data?.findVideo.author.username}</div>
                      
                      
                      {(followExist()===false || follow===false) && <button className='but-follow' onClick={() => {
                        setFollow(true);
                        newFollow({variables: {id: idProfile, idFollow: result.data?.findVideo.author.id}});
                        console.log(dataFollow);
                      }}>Seguir</button>}
                      {(followExist()===true || follow===true) && <button className='but-follow' onClick={() => {
                        setFollow(false);
                        deleteFollow({variables: {id: idProfile, idFollow: result.data?.findVideo.author.id}});
                      }}>Seguido</button>}
                    
                    </div>
                    <div className='description'>
                        {result.data?.findVideo.description}
                    </div>
                    <div className='write-comment'>
                    <textarea
                      type="text"
                      className='my-comment'
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Escribe aquí tu comentario"/>
                    <button className='but-send' onClick={() => {
                      if(comment !== ""){
                        const idComment = makeRandomId(10);
                        console.log(idComment);
                        console.log(idProfile);
                        console.log(comment);

                        newCom = {
                          username: resProfile.data?.findUserId.username,
                          comment: comment,
                        }
                        console.log(newCom);
                        setListComments(newCom);
                        console.log(listComments);
                        
                        setCom(true);
                        newComment({variables: {id: idComment, user: idProfile, comment: comment}});
                        addCom({variables: {id: id, comment: idComment}});
                        setComment("");
                      }
                    }}>Comentar</button>
                    </div>
                    <div className='comments'>
                      {//loading===true &&
                        //<div className="load"><ClipLoader size={50} loading={loading}></ClipLoader></div>
                        //data ? console.log(data) : console.log(error)
                      }
                      {data ? console.log(data) : console.log(error)}
                      {com===true && data?.addComment.comments.slice(0, limitCom).map((c, index) => {
                        if(index <= limitCom) {
                          return(
                            <div className='comment'>
                              <FontAwesomeIcon icon={faUserAstronaut} size="2x" border/>
                              <div className='infoComment'>
                                <div className="user-comment">{c.user.username}</div>
                                <div className='com-comment'>{c.comment}</div>
                              </div>
                            </div>
                          );
                        }
                      })}
                      {com===false && result.data?.findVideo.comments.slice(0, limitCom).map((c) => {
                        return(
                          <div className='comment'>
                            <FontAwesomeIcon icon={faUserAstronaut} size="2x" border/>
                            <div className='infoComment'>
                              <div className="user-comment">{c.user.username}</div>
                              <div className='com-comment'>{c.comment}</div>
                            </div>
                          </div>
                        );
                      })}
                      <button className="but-more" onClick={(e) => {
                        setLimitCom(limitCom + 5);
                        
                      }}>Más comentarios</button>
                
                      {/*skip !== 0 && <button className="but-more" onClick={(e) => {
                        counter = skip - 5;
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
                        
                      }}>Anteriores videos</button>*/}
                    </div>
                </div>

                <div className='listVideos'>
                {resultVideos.data?.showVideos.map((c) => {
                    if(c.id !== id){
                        return (
                        <div className="elements" onClick={e => {
                            //setId(c.id);
                            navigationVideo(c.id);
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
                )}
                <button className="but-more" onClick={(e) => {
                  counter = counter + 5;
                  setSkip(counter);
                  
                }}>Más videos</button>
                
                {skip !== 0 && <button className="but-more" onClick={(e) => {
                  counter = skip - 5;
                  setSkip(counter);
                  
                }}>Anteriores videos</button>}
                </div>
            </div>
        </div>
    );
}

export default Video;