const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language, i) => <li key={i}>{language}</li>)}
        </ul>
        <img src={country.flagImg} alt={country.alt} height='200px'/>
    </>
  )
}

export default Country