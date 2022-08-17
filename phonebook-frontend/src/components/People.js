import personService from "../services/personService"

const People = ({ persons, filter, setPersons, flashNotification }) => {
  const handleRemoval = event => {
    if (window.confirm(`Delete ${event.target.name}?`))
    {
      personService
        .remove(event.target.id)
        .then(() => 
          setPersons(persons.filter(person => 
            person.id !== Number(event.target.id)
          ))
        )
        .then(() => 
          flashNotification(`Deleted ${event.target.name}`, 'green')
        )
        .catch(error => {
          flashNotification(`Information of ${event.target.name} has already been removed from the server.`, 'red')
          setPersons(persons.filter(person => person.name !== event.target.name))
        })
    }
  }

  return (
    <>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter))
        .map(person => (
          <div key={person.id} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem'}}>
            <div style={{textAlign: 'right'}}>{person.name}</div>
            <div style={{textAlign: 'left'}}>{person.number}</div>
            <button onClick={handleRemoval} id={person.id} name={person.name}>Delete</button>
          </div>
      ))}
    </>
  )
}

export default People