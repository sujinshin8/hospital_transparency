import MapView from './components/MapView';
import React, { useState, useEffect } from 'react';
import HospitalSearch from './components/HospitalSearch';

function App() {
  const [isOnLoadScreen, setIsOnLoadScreen] = useState(true);

  console.log(isOnLoadScreen)

  // it wasn't working before because I had imported setTimeout but that is not something you should import to make this work...
  useEffect(()=>{
    setTimeout(()=>{
      setIsOnLoadScreen(false)
    }, 1000)
  }, [])
  console.log(isOnLoadScreen)
  // this is throwing an error
  // const loading = isOnLoadScreen ? (
  //   <>
  //     <h1>
  //       Welcome to Our App!
  //     </h1>
  //   </>
  // ) : 
  //   null

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
        <MapView />
      </>
    )
  }

  // return (
  //   // { loading }

  //   // <>
  //   // <MapView />
  //   // </>
  // );
}
export default App;
