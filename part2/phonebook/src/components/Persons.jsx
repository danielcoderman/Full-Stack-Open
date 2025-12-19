import Person from './Person'

const Persons = ({ displayedPeople, removePerson }) => {
  return (
    <div>
      {displayedPeople.map((person) =>
        <Person 
          key={person.name} 
          name={person.name} 
          number={person.number} 
          remove={() => removePerson(person)}
        />
      )}
    </div>
  )
}

export default Persons