import { useState, useEffect } from 'react'

import CountrySearchForm from './components/CountrySearchForm'
import CountriesList from './components/CountriesList'
import Notification from './components/Notification'
import CountryPage from './components/CountryPage'

import restCountriesService from './services/restcountries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [countriesToDisplay, setCountriesToDisplay] = useState([])
  const [countryDataToDisplay, setCountryDataToDisplay] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  // Load the country names
  useEffect(() => {
    restCountriesService
      .getAll()
      .then(data => {
        console.log(data)
        setCountries(data.map(d => d.name.common))
      })
  }, [])

  const handleQueryChange = (event) => {
    console.log(event.target)
    const latestQuery = event.target.value
    setQuery(latestQuery)

    const matchingCountries = countries.filter(c => c.toLowerCase().includes(latestQuery.toLowerCase()))
    console.log(`The length of matchingCountries is: ${matchingCountries.length}`)
    if (matchingCountries.length > 10) {
      // Prompt the user to make their query more specific
      console.log('Too many matches, specify another filter')
      setNotificationMessage('Too many matches, specify another filter')
      setCountriesToDisplay([])
      setCountryDataToDisplay(null)
    } else if (matchingCountries.length > 1) {
      console.log(`The matching countries are: ${matchingCountries}`)
      setCountriesToDisplay(matchingCountries)
      setCountryDataToDisplay(null)
      setNotificationMessage(null)
    } else if (matchingCountries.length === 1) {
      // There is only one country matching the query
      console.log(`The only matching country: ${matchingCountries[0]}`)
      restCountriesService
        .get(matchingCountries[0])
        .then(data => {
          const relevantCountryData = {
            name: matchingCountries[0],
            capital: data.capital[0],
            area: data.area,
            flag: data.flags.png,
            languages: Object.values(data.languages)
          }
          setCountryDataToDisplay(relevantCountryData)
          setCountriesToDisplay([])
          setNotificationMessage(null)
        })
    } else {
      // No matching countries found
      console.log('No matching countries')
      setCountriesToDisplay([])
      setCountryDataToDisplay(null)
      setNotificationMessage(null)
    }
  }

  return (
    <div>
      <CountrySearchForm query={query} handleQueryChange={handleQueryChange} />
      {notificationMessage ? <Notification message={notificationMessage} /> : null}
      {countriesToDisplay ? <CountriesList countries={countriesToDisplay} /> : null}
      {countryDataToDisplay ? <CountryPage data={countryDataToDisplay} /> : null}
    </div>
  )
}

export default App