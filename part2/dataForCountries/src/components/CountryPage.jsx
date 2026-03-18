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
    </div>
  )
}

export default CountryPage