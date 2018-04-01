import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
       super(props);
       this.state = { albums: albumData };
     }

   render() {
    return (
      <section className='library'>
      {
        this.state.albums.map( (album, index) =>
        <div className="Album">
          <Link className="Album-links" to={`/album/${album.slug}`} key={index}>
          <img src={album.albumCover} alt={album.title} height="auto " width="75%" />
             <div>{album.title}</div>
             <div>{album.artist}</div>
             <div>{album.songs.length} songs</div>
          </Link>
        </div>
        )
      }
      </section>
     );
   }
 }

export default Library;
