const FormCountries = ({ handlerInput, valueInput }) => {
  return(
    <>
    <form>
      find countries <input onChange={handlerInput} value={valueInput}/>
    </form>
    </>
  )
}

export default FormCountries