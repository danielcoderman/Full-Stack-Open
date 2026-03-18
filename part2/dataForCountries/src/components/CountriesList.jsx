const CountriesList = ({ countries }) => {
  return (
    <div>
      {countries.map((c) =>
        <div key={c}>{c}</div>
      )}
    </div>
  )
}

export default CountriesList