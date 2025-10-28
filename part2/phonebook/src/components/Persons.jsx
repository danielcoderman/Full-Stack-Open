import Person from './Person'

const Persons = ({ displayedPeople }) => {
  return (
    <div>
      {displayedPeople.map((person) =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default Persons