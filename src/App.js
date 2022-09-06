import React, { useState } from 'react'
import axios from 'axios'


function App() {

  const [data, setData] = useState({})
  
  const [location, setLocation] = useState('')

// connexion à l'api openweathermap pour l'accès aux informations 
//units=metric permet de passen en mode °C des temperatures
// lang=fr permet de mettre toutes les informations de la météo en français
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=fr&units=metric&appid=537e20a924c67bc04de2d6e29ac2aa16`
 


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
          axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })

      setLocation('')

    }

  }

  return (
    <div className="app">

{/* creation de la barre de recherche */}
      <div className='recherche'>
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Entrez la ville'
        type="text"/>
      </div>

      <div className='container'>

        <h2 className='date'>aujourd'hui</h2>

        <div className='top'>
            <div className='location'>
{/* recupération des données dans le fichier JSON envoyé par l'API */}
              <p>{data.name}</p>
            </div>

            <div className='temp'>
              {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}

            </div>
            <div className='description'>
              {data.weather ? <p>{data.weather[0].description}</p> : null}
              
            </div>
        </div>

{/* permet d'enlever la barre d'information lorsque aucune ville n'est recherché */}
{data.name !== undefined &&
     <div className='bottom'>
          <div className='ressenti'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Ressentie</p>
          </div>

          <div className='humidité'>
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidité</p>
          </div>

          <div className='vent'>
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} km/h</p> : null}
            <p>Vitesse vent</p>
          </div>

        </div>
}
      </div>
    </div>
  );
}
   


export default App;
