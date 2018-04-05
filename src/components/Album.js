import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
     super(props);

     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     const currentlyHoveredSongs = [];

     album.songs.forEach((song, i) => {
       currentlyHoveredSongs[i] = false;
     });

     console.log(currentlyHoveredSongs);

     this.state = {
       album: album,
       currentSong: null,
       currentlyHoveredSongs: currentlyHoveredSongs,
       currentTime: 0,
       duration: album.songs[0].duration,
       isPlaying: false,
       isHovering: false,
       volume: 0.5
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
    }

    handleMouseOver(e) {
      var currentlyHoveredSongs = this.state.currentlyHoveredSongs;
      console.log(e.target);
      currentlyHoveredSongs[parseInt(e.target.className, 10)] = true;
      this.setState({ currentlyHoveredSongs: currentlyHoveredSongs });
    }

    handleMouseLeave(e) {
      var currentlyHoveredSongs = this.state.currentlyHoveredSongs;
      currentlyHoveredSongs[parseInt(e.target.className, 10)] = false;
      this.setState({ currentlyHoveredSongs: currentlyHoveredSongs });
    }


    componentDidMount() {
      this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        },
        volumechange: e => {
          this.setState({ volume: this.audioElement.volume });
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
   }

    play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
    }

    pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
    }

    setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
    }

    handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
    }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
    }

    handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
    }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume});
    }

    formatTime(time) {
      var minutes = Math.floor(time/60);
      var seconds = Math.round(time % 60);
      if (typeof time !== "number") {
        return "-:--";
      }
      else if (seconds <10) {
        return minutes + ":0" + seconds;
      }
      return minutes + ":" + seconds;
    }

    buttonDisplay (song, index) {
      if (this.state.currentlyHoveredSongs[index+1] === true) {
        if (this.state.currentSong === song && this.state.isPlaying) {
          return <span className="ion-pause">{}</span>;
        } else {
          return <span className="ion-play">{}</span>;
        }
      } else {
        if (this.state.currentSong === song && this.state.isPlaying) {
          return <span className="ion-pause">{}</span>;
        } else {
          return <span className="song-number">{index+1}</span>;
        }
      }

    }

   render() {
     console.log("");
     console.log("Currently hovered songs: ");
     console.log(this.state.currentlyHoveredSongs);
     console.log("Is hovering? " + this.state.isHovering);
     console.log("Currently playing song: " + this.state.currentlyPlayingSong);
     console.log("Is playing? " + this.state.isPlaying);
     return (
       <section className="album">
       <div id="col-container">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover art" />
          <div className="album-details">
            <h4 id="album-title">{this.state.album.title}</h4>
            <h3 className="artist">{this.state.album.artist}</h3>
            <h4 id="release-info">{this.state.album.releaseInfo}</h4>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
<<<<<<< HEAD
              {this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                 <td className="song-actions">
                   <button>
                     <span className="song-number">{index+1}</span>
                     <span className="ion-play"></span>
                     <span className="ion-pause"></span>
                   </button>
                 </td>
                 <td className="song-title">{song.title}</td>
                 <td className="song-duration">{this.formatTime(parseInt(song.duration, 10))}</td>
               </tr>
              )}
=======
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                <td className="song-actions">
                <button className={index+1} onMouseEnter={(e) => this.handleMouseOver(e)}
                  onMouseLeave={(e) => this.handleMouseLeave(e)}>
                    {this.buttonDisplay(song, index)}
                </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(parseInt(song.duration, 10))}</td>
              </tr>
            )}
>>>>>>> assignment-10-styling
          </tbody>
        </table>
        </div>
        <div id="player-bar">
          <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           volume={this.audioElement.volume}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(time) => this.formatTime(time)}
         />
        </div>
       </section>
     );
   }
 }

export default Album;
