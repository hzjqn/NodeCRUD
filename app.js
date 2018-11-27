const express = require('express');
const fs = require('fs');
const pug = require('pug');
const Persona = require('./classes/persona.js');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'pug')


// APP/Frontend Routes
app.get('/', (req, res) => {

    let vars = {
        title: "Titulo",
        view: pug.renderFile('./views/index.pug')
    };

    console.log(vars);
    return res.render('app', vars);
});


// API/Service Routes
app.get('api/users/all', (req, res) => {
    return res.send(Persona.all());
})


app.get('api/users/:id', (req, res) => {
    let persona = Persona.find(req.params.id);
    console.log(persona)
    console.log(req.params.id)
    return res.send(persona ? persona : 'No existe esa persona');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))