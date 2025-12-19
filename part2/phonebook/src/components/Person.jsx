const Person = props => {
    return (
        <div>
            {props.name} {props.number} <button onClick={props.remove}>delete</button>
        </div>
    )
}

export default Person