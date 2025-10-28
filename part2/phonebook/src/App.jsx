import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [displayedPeople, setDisplayedPeople] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    // Check if the name in the name input text-box already exists in the phonebook
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(personObject)
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      // Update the list of displayed people to take into account the recently added person
      const filteredPeople = newPersons.filter(person => person.name.toLowerCase().includes(filterText)) // Note that if the filterText is the empty string then the filterPeople array will basically be the same as the persons state array.
      setDisplayedPeople(filteredPeople)
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterTextChange = (event) => {
    const newFilterText = event.target.value
    setFilterText(newFilterText)

    const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(newFilterText)) // Note that if the filterText is the empty string then the filterPeople array will basically be the same as the persons state array.

    setDisplayedPeople(filteredPeople)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons displayedPeople={displayedPeople} />
    </div>
  )
}

export default App