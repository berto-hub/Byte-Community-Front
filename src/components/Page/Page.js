import React, {Component} from 'react';
import {BrowserRouter, renderMatches, Route, Routes} from "react-router-dom";
import Login from "../login/Login";
import VideoList from "../VideoList/VideoList";
import PodcastList from "../PodcastList/PodcastList";
import VideoListSearch from "../VideoList/VideoListSearch";
import PodcastListSearch from "../PodcastList/PodcastListSearch";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import DataProfile from "../DataProfile/DataProfile";
import DataOtherProfile from "../DataProfile/DataOtherProfile";
import Follows from "../Follows/Follows";
import Video from "../Video/Video";
import Podcast from "../Podcast/Podcast";
import CreatePodcast from "../CreatePodcast/CreatePodcast";
import CreateVideo from "../CreateVideo/CreateVideo";
import Menu from "../Menu/Menu";

class Page extends Component {
    render() {
        return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/videoListSearch/:idProfile/:s" element={<VideoListSearch/>}/>
                <Route path="/podcastListSearch/:idProfile/:s" element={<PodcastListSearch/>}/>
                <Route path="/videoList/:idProfile" element={<VideoList/>}/>
                <Route path="/podcastList/:idProfile" element={<PodcastList/>}/>
                <Route path="/menu/:idProfile" element={<Menu/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/dataProfile/:id" element={<DataProfile/>}/>
                <Route path="/dataOtherProfile/:id/:idProfile" element={<DataOtherProfile/>}/>
                <Route path="/follows/:id" element={<Follows/>}/>
                <Route path="/createVideo/:id" element={<CreateVideo/>}/>
                <Route path="/createPodcast/:id" element={<CreatePodcast/>}/>
                <Route path="/video/:id/:idProfile" element={<Video/>}/>
                <Route path="/podcast/:id/:idProfile" element={<Podcast/>}/>
                <Route path="*" element={<div>404 Not found</div>}/>
            </Routes>
        </BrowserRouter>
        );
    }
}

export default Page;
  