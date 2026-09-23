const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
app.use(express.static('dist'))
const data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
morgan.token('number', (req) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
    return ''
})
app.use(cors())
app.use(morgan(':method :url :response-time :number'))

app.post("/api/persons", (req, res) => {
    const person = req.body
    const scale = 10000
    const id = Math.random() * scale 
    if (data.find(p => p.name === person.name)) {
        res.status(400).json({ error: 'name must be unique' })
        return
    }
    if (!person.name || !person.number){
        return res.status(400).json({ error: 'sb' })
    }
    const newPerson = {
        id: id,
        name: person.name,
        number: person.number
    }
    res.json(newPerson)
})

app.get("/api/persons", (req, res) => {
    res.json(data)
})

app.get("/info", (req, res) => {
    const page = `<p>Phonebook has info for ${data.length} people</p><p>${Date.now()}</p>`
    res.send(page)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = data.find(p => p.id === id)

    if (person){res.json(person)}
    else {
        res.status(404).send('Not Found')
    }
    
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = data.find(p => p.id === id)

    if (person){res.status(204).send()}
    else {
        res.status(404).send('Not Found')
    }
    
})

const PORT = process.env.PORT ||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})