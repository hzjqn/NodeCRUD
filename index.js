const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let persona = Persona({
        name = 'Hola'
    });
    return res.send(persona.name);
})
/* app.get('/', (req, res) => {
    return res.send()
})
app.get('/', (req, res) => {
    return res.send()
})
app.get('/', (req, res) => {
    return res.send()
})
app.get('/', (req, res) => {
    return res.send()
}) */

app.listen(port, () => console.log(`Example app listening on port ${port}!`))