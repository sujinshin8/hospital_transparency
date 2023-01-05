import React, { useState, useRef } from 'react';


// add 'x' into hospital search box to clear search and revert back to original view with all markers
// create a 'button' in the search box
// when the button is clicked, should setSearchValue to an empty string and all the markers should appear 
// also needs to go back to original viewPort
// create a piece of state with lng,lat array 'center'

function HospitalSearch(props) {
    function handleSearch(event) {
        props.setSearchValue(event.target.value);
        return true;
      }
    
    function handleSearchClick(lng, lat){
        props.mapRef.current.flyTo({center:[lng, lat], zoom:15})
      }

    function clearSearchClick(){
        props.setSearchValue('')
        props.mapRef.current.flyTo({center:[ -73.96625, 40.78343], zoom:10})
    }
    
      return (
        <>
          <div className="search-container">

            <input
              type="text"
              id="search"
              className="search-inner"
              placeholder="Search a hospital name"
              value={props.searchValue}
              onChange={handleSearch}
            />

            <button onClick= {()=>{ clearSearchClick() }}>
                Clear Search
            </button>

            {props.searchValue ? (
              <ul className="search-outer">
                {props.facilities.slice(0, 10).map((obj,i) => {
                  return <li key={i} className="search-item">
                    <a href="#" 
                      onClick={() => handleSearchClick(obj.lng, obj.lat)}
                      >{obj.facility_name}</a></li>;
                })}
              </ul>
            ) : null}

          </div>
        </>
)}

export default HospitalSearch