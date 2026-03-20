const CountryPage = ({ data }) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <div>Capital {data.capital}</div>
      <div>Area {data.area}</div>
      <h2>Languages</h2>
      <ul>
        {data.languages.map((l) =>
          <li key={l}>{l}</li>
        )}
      </ul>
      <img src={data.flag} />
      <h2>Weather in {data.capital}</h2>
      <div>Temperature {data.temperature} Fahrenheit</div>
      <img src={data.temp_icon} />
      <div>Wind {data.wind_speed} mph</div>
    </div>
  )
}

export default CountryPage