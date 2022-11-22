
import React, { Component } from 'react';
import ReactMapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = 'pk.eyJ1Ijoic3VqaW5zIiwiYSI6ImNsYWs5czlyZjAzdmIzeHFzbW9wNnN5M2sifQ.9h_C92SPpqMocXTgutMoEA'

class Map extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 40.78343,
        longitude: -73.96625,
        zoom: 11
      }
    }
    this.handleViewportChange = this.handleViewportChange.bind(this)
  }
  handleViewportChange(viewport) {
    this.setState(prevState => ({
      viewport: {...prevState.viewport, ...viewport}
    }))
  }
  render() {
    return (
      <ReactMapGl
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v10"
      />
    )
  }
}

export default Map;


// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = 'pk.eyJ1Ijoic3VqaW5zIiwiYSI6ImNsYWs5czlyZjAzdmIzeHFzbW9wNnN5M2sifQ.9h_C92SPpqMocXTgutMoEA';
 
// export default function App() {
// const mapContainer = useRef(null);
// const map = useRef(null);
// const [lng, setLng] = useState(-73.96625);
// const [lat, setLat] = useState(40.78343);
// const [zoom, setZoom] = useState(11);
 
// useEffect(() => {
// if (map.current) return; // initialize map only once
// map.current = new mapboxgl.Map({
// container: mapContainer.current,
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [lng, lat],
// zoom: zoom
// });
// });
 
// useEffect(() => {
// if (!map.current) return; // wait for map to initialize
// map.current.on('move', () => {
// setLng(map.current.getCenter().lng.toFixed(4));
// setLat(map.current.getCenter().lat.toFixed(4));
// setZoom(map.current.getZoom().toFixed(2));
// });
// });
 
// return (
//   <div>
//     <div className="sidebar">
//     Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//     </div>
//     <div ref={mapContainer} className="map-container">

//     </div> 

//   </div>
// );
// }