import React, {useState} from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import {GifPlayer} from "react-gif-player";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserAstronaut, faBookJournalWhills, faVideo, faRadio } from '@fortawesome/free-solid-svg-icons'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {useParams} from "react-router-dom";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./Menu.css";

function Menu() {
    const {idProfile} = useParams();

    const navigateLogin = useNavigate();
    const navigationLogin = (id) => {
      navigateLogin(`/videoList/${id}`);
    }

    const navigatePodcast = useNavigate();
    const navigationPodcast = (id) => {
      navigatePodcast(`/podcastList/${id}`);
    }
    /*
                    Comentarios: 
                      {c.comments.map((com) => {
                        
                      })}
                      
                      {c.description}*/

    return (
      <div className="menuMenu">
        <SideNav
            style={
                {
                    'background-color': '#455A64',
                    'color': '#fff',
                    'border-top-right-radius': '10px',
                    'border-bottom-right-radius': '10px'
                }
            }
            className="sidenav"
            onSelect={(selected) => {
                if(selected == "videos") {
                    navigationLogin(idProfile)
                }else{
                    navigationPodcast(idProfile);
                    console.log(selected);
                }
            }}
            >
            <SideNav.Toggle />
                <SideNav.Nav>
                    <NavItem eventKey="videos">
                        <NavIcon>
                            <FontAwesomeIcon icon={faVideo} size="2x"/>
                        </NavIcon>
                        <NavText>
                            Videos
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="podcasts">
                        <NavIcon>
                            <FontAwesomeIcon icon={faRadio} size="2x"/>
                        </NavIcon>
                        <NavText>
                            Podcasts
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        <div className="inicio-menu">
            <div className='userProfile'><FontAwesomeIcon icon={faUserAstronaut} size="7x" border/></div>
            <div className="title-menu">
                <h1>Byte Community</h1>
                <h2 className="h2-menu">The universe of technology</h2>
            </div>
        </div>
        <div className='elems-menu'>
            <img className="gif" width="600px" height="300px" src={"https://matematicasvorticiales.files.wordpress.com/2018/09/orig.gif"}/>
        </div>
      </div>
    );
}

export default Menu;