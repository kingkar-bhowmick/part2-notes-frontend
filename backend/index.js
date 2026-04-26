console.log('hello world')

//Importing express module and creating an instance of it
const express = require('express')
const app = express()

// Middleware to
//  parse incoming 
// JSON data in request body
app.use(express.json())

//Dummy data for notes , hardcoded DB
let notes = [
   {
    id: "1",
    content: "HTML is easy and a3s6 n6t Eaz",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

//Root route
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//notes GET fetches all notes
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

//notes/X GET fetches Single note with id X
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  //If note with given id is found, send it as JSON response
  if (note) {
    response.json(note)
  } else {
    //If note with given id is not found, 
    // send 404 status code with message
    response.statusMessage = "Note not found with id " +id
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}


app.post('/api/notes',(request, response) => {

  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

 const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }


  notes = notes.concat(note)

  console.log(note)

  response.json(note)
})



//Setting up the server to listen on port 3001
const PORT = 3001

//Starting the server and logging a message to the console
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})