import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import { useEffect } from 'react'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({text: null, isError: false})


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const reference = persons.findIndex((person => person.name === newPerson.name))

    if (reference !== -1){
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        personService
          .updateObject(persons[reference].id, newPerson)
          .then(response => {
            setPersons(persons.filter((_, i) => i !== reference).concat(response))
            setNotification({text: `${newPerson.name} number has been changed`, isError: false})
          })
          .catch(() => {
            setNotification({
              text: `Information of ${newPerson.name} has already been removed from server`,
              isError: true
            })
            setPersons(persons.filter((_, i) => i !== reference))
          })
        
      }
    }else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification({text: `Added ${newPerson.name}`, isError: false})
        })
        .catch(error => {
          setNotification({text: error.response.data.error, isError: true})
        })
    }


    setTimeout(() => {
      setNotification({text: null, type: null})
    }, 2000);

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (personDeleted) => {
    if (window.confirm(`Delete ${personDeleted.name}?`)){
      personService
        .deleteObject(personDeleted.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personDeleted.id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notification.text} isError={notification.isError}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {personsToShow.map(person => {
        return (
          <Person
            key={person.id}
            person={person}
            handleDeleteButton={() => deletePerson(person)}
          />
        )
      })}
    </div>
  )
}

export default App
