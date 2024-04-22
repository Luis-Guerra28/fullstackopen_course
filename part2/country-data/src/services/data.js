import axios from 'axios'

const weather_api_key = import.meta.env.VITE_SOME_KEY
const urlWeather = `http://my.meteoblue.com/packages/basic-day`
const urlCountries = `https://studies.cs.helsinki.fi/restcountries/api/all`

const getWeather = (latlng) => {
  const [lat, lon] = latlng
  const url = `${urlWeather}?lat=${lat}&lon=${lon}&apikey=${weather_api_key}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const getAllCountries = () => {
  const request = axios.get(urlCountries)
  return request.then(response => response.data)
}



export default {getWeather, getAllCountries}