import { useEffect, useState } from 'react'
import FormCountries from './components/FormCountries'
import FullCountry from './components/FullCountry'
import BasicCountry from './components/BasicCountry'
import dataService from './services/data'


const App = () =>  {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState(null)
  const [weather, setWeather] = useState({
    temperature: null,
    wind: null
  })

  const weather_api_key = import.meta.env.VITE_SOME_KEY

  //Countries
  useEffect(() => {
    dataService
      .getAllCountries()
      .then(response => setAllCountries(response))
  }, [])

  //Weather
  useEffect(() => {
    if (countries.length === 1){
      dataService
        .getWeather(countries[0].latlng)
        .then(response => {
          const newWeather = {
            temperature: response.data_day.temperature_mean[0],
            wind: response.data_day.windspeed_mean[0]
          }
          setWeather(newWeather)
        })
    }
  }, [countries, weather_api_key])


  const handleCountryChange = event => {
    const updatedSearch = event.target.value 
    setSearch(updatedSearch)
    setCountries(allCountries.filter( country => {
      return country.name.common.toLowerCase().includes(updatedSearch.toLowerCase())
    }))
  }

  //RENDERING
  if (allCountries === null){
    return (
      <div>Connecting with server...</div>
    )
  }

  if (countries.length > 10){
    return (
      <>
        <FormCountries handlerInput={handleCountryChange}  valueInput={search}/>
        <div>Too many countries</div>
      </>
    )
  }

  if (countries.length === 1){
    const country = countries[0]
    const countryInfo = {
      name: country.name.common,
      capital: country.capital[0],
      area: country.area,
      languages: Object.values(country.languages),
      flagImg: country.flags.svg,
      flagAlt: country.flags.alt
    } 
    return (
      <>
        <FormCountries handlerInput={handleCountryChange} valueInput={search}/>
        <FullCountry country={countryInfo} weather={weather}/>
      </>
    )
  }
  return (
    <>
      <FormCountries handlerInput={handleCountryChange} valueInput={search}/>
        {countries.map((country, i) => {
          return (
            <BasicCountry
              key={i}
              country={country}
              handlerButton={() => setCountries([country])}
            />
          )
        })}
    </>
  )
}

export default App
