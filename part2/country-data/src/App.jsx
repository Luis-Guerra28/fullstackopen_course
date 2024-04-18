import axios from 'axios'
import { useEffect, useState } from 'react'
import FormCountries from './components/FormCountries'
import Country from './components/Country'


const App = () =>  {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState(null)

  useEffect( () => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setAllCountries(response.data))
  }, [])


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
        <Country country={countryInfo}/>
      </>
    )
  }
  return (
    <>
      <FormCountries handlerInput={handleCountryChange} valueInput={search}/>
        {countries.map((country, i) => <div key={i}>{country.name.common}</div>)}
    </>
  )
}

export default App
