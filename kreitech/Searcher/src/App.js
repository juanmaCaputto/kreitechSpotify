import React, { Component } from 'react';
import './App.css';
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class Song extends Component {
  
  render() {
    return (
      <div>
        <div className="grid-item">{this.props.song.name}</div>
        <div className="grid-item">{this.props.song.artists[0].name}</div>
      </div>
    )
  }
}



class App extends Component {
  
  constructor() {
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false
    }
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
    
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getSearchedTracks(searchedSong) {

    searchedSong = document.getElementById("buscador").value;
    
    spotifyWebApi.searchTracks(searchedSong).then((data) => {
      console.log(data);
      this.setState({
        songs: data.tracks.items           
      })
      
    }, function(err) {
      console.error(err);
    });
  }

  render() {

    let songToRender = 
      this.state.songs 
        ? this.state.songs
        : []
    return (          
      <div className="App">
          {(this.getHashParams()).access_token ?
            <div>
              <div className="title">
                <h1>Song Finder</h1>
              </div>
              <div className="buscador">
                <div className="buscador-item">
                  <input id="buscador" type="text"/>
                </div>
                <div className="buscador-item">
                  <button onClick={() => {this.getSearchedTracks()}} className="boton">Search</button>
                </div>
              </div>
              <div className="grid-container">
                <div>
                  <div className="grid-item" id="grid-title">Song</div>
                  <div className="grid-item" id="grid-title">Artist</div>
                </div>
                {songToRender.map(song =>
                  <Song song={song}/>
                )}
              </div>
            </div> :  <a href = "http://localhost:8888"> 
                       <button className="boton">Login to Spotify</button>
                      </a>
          }
      </div>
    );
  }
}

export default App;
