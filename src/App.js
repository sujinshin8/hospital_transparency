import MapView from './components/MapView';
import React, { useState, useEffect, useRef} from 'react';
import HospitalSearch from './components/HospitalSearch';
import json_hospitals_lat_lon from './data/hospitals_lat_lon_geopkg_1';

function App() {
  const [isOnLoadScreen, setIsOnLoadScreen] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const mapRef = useRef();

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
    .filter(({ facility_name }) =>
      //filter facilities with matching name; todo make matching more complex
      facility_name.toLowerCase().includes(searchValue.toLowerCase()),
    );

  useEffect(()=>{
    setTimeout(()=>{
      setIsOnLoadScreen(false)
    }, 1000)
  }, [])

  if (isOnLoadScreen){
    return(
      <>
        <h1>
          Welcome to Our Medical Cost Transparency App!
        </h1>
      </>
    )
  }

  if (!isOnLoadScreen){
    return(
      <>
        <HospitalSearch
          setSearchValue = {setSearchValue}
          mapRef = {mapRef}
          searchValue = {searchValue}
          facilities = {facilities}
        />
        <MapView 
          mapRef = {mapRef}
          facilities = {facilities}
        />
      </>
    )
  }

}
export default App;
