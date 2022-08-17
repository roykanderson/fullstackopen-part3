import { useEffect, useState } from 'react'
import personService from './services/personService'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }, [])

  const flashNotification = (message, color) => {
    setMessage(message)
    setColor(color)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} color={color} />

      <Filter value={filter} setFilter={setFilter}/>

      <h2>Add a new person</h2>

      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        flashNotification={flashNotification}
      />

      <h2>Numbers</h2>

      <People persons={persons} filter={filter} setPersons={setPersons} flashNotification={flashNotification}/>
    </div>
  )
}

export default App