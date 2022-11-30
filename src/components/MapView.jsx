import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import json_hospitals_lat_lon from '../data/hospitals_lat_lon_geopkg_1';

// ref docs:
// https://visgl.github.io/react-map-gl/docs
// https://blog.logrocket.com/using-mapbox-gl-js-react/
// https://medium.com/geekculture/building-an-interactive-map-with-mapbox-react-f335384f4863

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VqaW5zIiwiYSI6ImNsYWs5czlyZjAzdmIzeHFzbW9wNnN5M2sifQ.9h_C92SPpqMocXTgutMoEA';
function MapView() {
  const [showPopup, setShowPopup] = useState(true);
  const [popupContent, setPopupContent] = useState({
    lat: 40.71219,
    lng: -73.99986,
  });
  const [searchValue, setSearchValue] = useState('');
  
  const data = json_hospitals_lat_lon.features.map(
    ({
      properties: {
        lat,
        lng,
        facility_name,
        address,
        city,
        zip_code,
        county_name,
        phone_number,
        hospital_type,
        overall_rating,
      },
    }) => {
      return {
        lat,
        lng,
        facility_name,
        address,
        city,
        zip_code,
        county_name,
        phone_number,
        hospital_type,
        overall_rating,
      };
    },
  );

  const facilities = data
    .filter(({ lat, lng }) => lat !== null && lng !== null) //filter out facilities without latlng
    .filter(({facility_name}) =>
        //filter facilities with matching name; todo make matching more complex
        facility_name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const hospitalMarkers = facilities.map(({ lat, lng, facility_name }) => {
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
    zoom: 11,
  };

  function handleSearch(event) {
    setSearchValue(event.target.value);

    return true;
  }

  return (
    <>
      <div className="search-container">
        <div className="search-inner">
          <input
            type="text"
            id="search"
            placeholder="Search a hospital name"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div className="dropdown">
          {facilities.slice(0, 10).map((obj) => {
            return <div>{obj.facility_name}</div>;
          })}
        </div>
      </div>

      <Map
        id="map"
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
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
      </Map>
    </>
  );
}

export default MapView;
