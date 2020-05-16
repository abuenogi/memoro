
import React, { useState, useEffect } from "react";


//import { UserContext } from '../context/UserContext';

import Mapa from '../components/Mapa';

const Menu_container = ({ history }) => {

  //const user_context = useContext(UserContext);

  const url = 'https://eu1.locationiq.com/v1/search.php?key=c7392af2aaffbc&q=España,Valencia,Torrent,Montreal 76, 14B&format=json';

  var point = new Object();


 
//`/api/resource/${id}`



    fetch(url)
      .then(res => res.json())
      .then(data => {
          data.forEach(function (doc) {
      
              point = Object.assign(doc);
              console.log('Punto');
              console.log(point);

          })
      })
      .catch(error => {
          console.log(error);
      })

  

  function onClickUbicacion() {
  

  }



  return <Mapa
  punto1 = {point}
  altitud={point.lat}
  longitud = {point.lon}
  onClickUbicacion={onClickUbicacion}
    

  />

};
export default (Menu_container);