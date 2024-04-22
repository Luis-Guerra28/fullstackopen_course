const BasicCountry = ({ country, handlerButton }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={handlerButton}>show</button>
    </div>
  )
}

export default BasicCountry