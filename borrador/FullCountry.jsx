const FullCountry = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {country.languages.map((language, i) => <li key={i}>{language}</li>)}
        </ul>
        <img src={country.flagImg} alt={country.alt} height='200px' />
        <h2>Weather in {country.capital}</h2>
        <div>temperature: {weather.temperature}</div>
        <div>wind: {weather.wind}</div>  
    </>
  )
}

export default FullCountry