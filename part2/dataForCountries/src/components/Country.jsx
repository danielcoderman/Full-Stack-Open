const Country = ({ name, showDataView }) => {
  return (
    <div>
      {name} <button onClick={showDataView}>Show</button>
    </div>
  )
}

export default Country