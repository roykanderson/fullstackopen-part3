import personService from '../services/personService'

const PersonForm = ({ 
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  flashNotification
}) => {
  
  const handleNameChange = event => setNewName(event.target.value)
  
  const handleNumberChange = event => setNewNumber(event.target.value)

  const submitPerson = event => {

    event.preventDefault()

    const newPerson = { 
      name: newName, 
      number: newNumber,
      id: 1 + persons.reduce((result, item) => (
        item.id > result
          ? item.id
          : result
      ), 1)
    }

    // alert if person is already saved, otherwise add to phonebook
    personExists(newPerson.name)
      ? confirmPersonUpdate({ ...newPerson, id: getId(newPerson.name) })
      : personService
        .create(newPerson)
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(() => flashNotification(`Added ${newPerson.name}`, 'green'))

    clearForm()
  }

  const confirmPersonUpdate = newPerson => {
    if (window.confirm(`${newPerson.name} is already added to phonebook. Replace the old number with a new one?`))
    {
      personService
        .update(newPerson)
        .then(updatedPerson => 
          setPersons(persons.map(person => 
            person.id !== updatedPerson.id ? person : updatedPerson
          ))
        )
        .then(() => flashNotification(`Updated ${newPerson.name}`, 'green'))
        .catch(error => {
          flashNotification(`Information of ${newPerson.name} has already been removed from the server.`, 'red')
          setPersons(persons.filter(person => person.name !== newPerson.name))
        })
    }
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }
  
  const personExists = (name) => {
    return persons.filter(person => person.name === name).length > 0
  }

  const getId = name => {
    return persons.find(person => person.name === name).id
  }

  return (
    <form onSubmit={submitPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm