import axios from 'axios'

const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const baseUrl = `https://api.openweathermap.org/data/3.0/onecall?appid=${api_key}&exclude=minutely,hourly,daily,alerts&units=imperial`

const getCapitalWeather = (lat, long) => {
  return axios
    .get(`${baseUrl}&lat=${lat}&lon=${long}`)
    .then(response => {
      return response.data
    })
}

export default { getCapitalWeather }