const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filterText} onChange={props.handleFilterTextChange} />
    </div>
  )
}

export default Filter