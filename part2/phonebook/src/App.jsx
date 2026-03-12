import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [displayedPeople, setDisplayedPeople] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isSuccessNotification, setIsSuccessNotification] = useState(null)

  useEffect(() => {
    console.log('Effect running')
    personService
      .getAll()
      .then((response) => {
        console.log(response)
        const personsData = response.data
        setPersons(personsData)
        setDisplayedPeople(personsData)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    // Check if the name in the name input text-box already exists in the phonebook
    if (persons.find(person => person.name === newName)) {
      // Ask the user if they want to update the number of the existing person
      const isNumberUpdateConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (isNumberUpdateConfirmed) {
        // Update the number of the existing user
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }

        personService
          .update(personToUpdate.id, updatedPerson)
          .then((response) => {
            console.log(response)
            const returnedPerson = response.data
            setPersons(persons.map(person => person.id === personToUpdate.id ? returnedPerson : person))
            // Make sure the filtered people is up-to-date, just in case the updated person shows up in the filtered list
            setDisplayedPeople(displayedPeople.map(person => person.id === personToUpdate.id ? returnedPerson : person))
            // Reset the form fields
            setNewName('')
            setNewNumber('')

            setNotificationMessage(`${returnedPerson.name}'s number has been changed to ${returnedPerson.number}`)
            setIsSuccessNotification(true)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(`Information of ${personToUpdate.name} has already been removed from server`)
            setIsSuccessNotification(false)
            // Set the notification message to null after 5 seconds
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            // Update the list of people
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
            setDisplayedPeople(displayedPeople.filter(p => p.id !== personToUpdate.id))
            // Clear the input fields for adding a person (name and number)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          const newPersons = persons.concat(response.data)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          // Update the list of displayed people to take into account the recently added person
          const filteredPeople = newPersons.filter(person => person.name.toLowerCase().includes(filterText)) // Note that if the filterText is the empty string then the filterPeople array will basically be the same as the persons state array.
          setDisplayedPeople(filteredPeople)
          setNotificationMessage(`Added ${response.data.name}`)
          setIsSuccessNotification(true)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
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

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
          personService
            .remove(person)
            .then(response => {
              console.log('This is returned by axios.delete: ', response)
              let deletedPersonId = response.data.id
              let updatedPersons = persons.filter(person => person.id !== deletedPersonId)
              setPersons(updatedPersons)
              // Update the list of displayed people to take into account the recently removed person.
              let updatedDisplayedPeople = displayedPeople.filter(person => person.id !== deletedPersonId)
              setDisplayedPeople(updatedDisplayedPeople)
            })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isSuccess={isSuccessNotification} />
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
      <Persons 
        displayedPeople={displayedPeople}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App