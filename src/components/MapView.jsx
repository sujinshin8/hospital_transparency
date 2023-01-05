import React, { useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import env from "react-dotenv";

// ref docs:
// https://visgl.github.io/react-map-gl/docs

function MapView(props) {
  const [showPopup, setShowPopup] = useState(true);
  const [popupContent, setPopupContent] = useState({
    lat: 40.71219,
    lng: -73.99986,
  });


  const hospitalMarkers = props.facilities.map(({ lat, lng, facility_name }) => {
    const handleClick = () => {
      setPopupContent({ lat, lng, facility_name });
      setShowPopup(true);
    };
    return (
      <Marker
        key={facility_name}
        longitude={lng}
        latitude={lat}
        onClick={handleClick}
      />
    );
  });

  const viewport = {
    latitude: 40.78343,
    longitude: -73.96625,
    zoom: 10,
  };

  return (
    <>
      <Map
        id="map"
        mapboxAccessToken={env.MAPBOX_TOKEN}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={props.mapRef}
      >
        {showPopup && (
          <Popup
            anchor="bottom"
            longitude={popupContent.lng}
            latitude={popupContent.lat}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
          >
            <h3> {popupContent.facility_name}</h3>
          </Popup>
        )}

        {hospitalMarkers}

        <NavigationControl
          position = "bottom-right"
        />
      </Map>
    </>
  );
}

export default MapView;
