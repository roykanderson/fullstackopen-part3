const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(process.argv.length)
  console.log('Usage: node mongo.js <password> (name) (number)')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://phonebook:${password}@cluster0.il5bpkf.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Print all persons
if (process.argv.length === 3) {
  console.log('phonebook:')

  mongoose
    .connect(uri)
    .then(() => {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    })
    .catch(err => console.log(err))
}

// Add a person
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  mongoose
    .connect(uri)
    .then(() => {
      const person = new Person({
        name,
        number,
      })
      return person.save()
    })
    .then(() => {
      console.log(`Added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch(err => console.log(err))
}