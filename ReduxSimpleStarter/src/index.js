import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = "AIzaSyDHXYCQMBrRBrPSlznhEfITTKD_hGlhf5M";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch("surfboards");
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({videos: videos, selectedVideo: videos[0]});
        });
    }

    render() {
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 200);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/><br/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
            </div>
        );
    };
}

ReactDOM.render(<App/>, document.querySelector('.container'));
