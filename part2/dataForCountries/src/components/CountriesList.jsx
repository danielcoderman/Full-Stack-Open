import Country from './Country'

const CountriesList = ({ countries, showCountryDataView }) => {
  return (
    <div>
      {countries.map((c) =>
        <Country key={c} name={c} showDataView={() => showCountryDataView(c)} />
      )}
    </div>
  )
}

export default CountriesList