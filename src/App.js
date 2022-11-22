// https://visgl.github.io/react-map-gl/docs
// https://blog.logrocket.com/using-mapbox-gl-js-react/
// https://medium.com/geekculture/building-an-interactive-map-with-mapbox-react-f335384f4863

import React, {useState, useEffect} from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import json_hospitals_lat_lon from "./data/hospitals_lat_lon_geopkg_1"

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [popupContent, setPopupContent] = useState({lat: 40.71219, lng: -73.99986})
  const [searchValue, setSearchValue] = useState('Search Here')


  // useEffect(()=> {
  //   const data = json_hospitals_lat_lon.features.map(({properties: {lat, lng, facility_name, address, city, zip_code, county_name, phone_number, hospital_type, overall_rating}}) => {
  //     return {
  //       lat, lng, facility_name, address, city, zip_code, county_name, phone_number, hospital_type, overall_rating
  //     }
  //   })
  //   console.log(data)
  // },[])


  const data = json_hospitals_lat_lon.features.map(({properties: {lat, lng, facility_name, address, city, zip_code, county_name, phone_number, hospital_type, overall_rating}}) => {
    return {
      lat, lng, facility_name, address, city, zip_code, county_name, phone_number, hospital_type, overall_rating
    }
  })


    const facilityArr =  data.map(({lat, lng, facility_name}) => {
      return({lat, lng, facility_name})})
    console.log('facilityArray',facilityArr)
    console.log('above filtered',searchValue)
    const filtered = facilityArr.filter(obj => obj.facility_name.includes(searchValue) && obj.lat !== null);
    console.log(filtered)
    const filteredMarkers = filtered.length > 0 ? filtered.map(({lat, lng, facility_name})=>{
      console.log('inside filtered Markers', lat, lng)
      return (
      <Marker>
        longitude={lng}
        latitude={lat}
      </Marker>
    )}) : null 

    const hospitalMarkers = data.map(({lat, lng, facility_name}) => {
      const handleClick = () => {
        setPopupContent({lat, lng, facility_name})
        setShowPopup(true)
        }
    //   return(
    //   <Marker
    //     longitude={lng}
    //     latitude={lat}
    //     onClick={handleClick}
    //   />
    // )
      const markers = searchValue === 'Search Here' ? (
        <>
        <Marker
          longitude={lng}
          latitude={lat}
          onClick={handleClick}
        />
        </> 
      ) : null

      return (markers)
  });

  
  const viewport = {
    latitude: 40.78343,
    longitude: -73.96625,
    zoom: 11
  };
  console.log('is this setting searchValue', searchValue)
  function handleSearch(event){
    setSearchValue(event.target.value)

    return true
  }
  console.log('searchValue is', searchValue)
  return (
        <>
         <input type='text' id='search' value={searchValue} onChange={handleSearch}>
        
         </input>
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
           
           
            {showPopup && <Popup
          anchor='bottom'
          longitude={popupContent.lng}
          latitude={popupContent.lat}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
        >
          <h3> {popupContent.facility_name}</h3>
        </Popup>}
        {hospitalMarkers}
        {filteredMarkers}
          </Map>
        </>
  );
}
export default App;


