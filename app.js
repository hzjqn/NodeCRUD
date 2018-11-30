'use strict';

const express = require('express');
const fs = require('fs');
const _ = require('lodash')
const DB = require('./classes/DB/index.js');
const Validation = require('./classes/Validation/index.js')
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const pug = require('pug');
const app = express();
const port = 3000;

app.use(formidable({type: 'multipart'}));
app.use(express.static('public'));
app.locals.pretty = true; // Deberia borrarse en production
app.set('views', './views');
app.set('view engine', 'pug');

console.log(DB.File());

// Index
app.get('/', (req, res) => {

    let params = {
        title: "Index",
        view: pug.compileFile('./views/index.pug')(
            {
                results: JSON.parse(DB.all())
            
            }
        )
    };
    
    return res.render('app', params);
});



// View services

app.get('/api/restore', (req, res) => {
    let apiReturn = JSON.parse(DB.all())
    let params = {
        status: apiReturn.status,
        data:   apiReturn.data,
        view:   {
            title:  "Index",
            html:   pug.compileFile('./views/index.pug')({results: apiReturn.data})
        }
    };
    
    return res.send(JSON.stringify(params));
});
app.get('/api/search/:search', (req, res) => {

    let apiReturn = JSON.parse(DB.findSearch(req.params.search));
    console.log("SEARCH !!!!!!!!!!!!!!!!!!!!!!!!!!!", apiReturn)
    let params = {
        status: apiReturn.status,
        data: apiReturn.data,
        view: {
            title: "Busqueda",
            html: pug.compileFile('./views/search.pug')({results: apiReturn.data})
        }
    };
    return res.send(JSON.stringify(params));
});


app.get('/api/persona/index', (req, res) => {
    let apiReturn = JSON.parse(DB.all());
    console.log('index ======', apiReturn.data)
    let params = {
        view: {
            title: "Todas las personas",
            html: pug.compileFile('./views/index_personas.pug')({results: apiReturn.data})
        }
    };
    return res.send(JSON.stringify(params));
})

app.get('/api/persona/new', (req, res) => {
    let params = {
        status: "ok",
        data: null,
        view: {
            title: "Nueva Persona",
            html: pug.compileFile('./views/insert.pug')({old: null, errors: null})
        }
    };

    return res.send(JSON.stringify(params));
});


app.get('/api/persona/:id/edit', (req, res) => {
    let apiReturn = JSON.parse(DB.find(req.params.id))
    let params = {
        view: {
            title: "Nueva Persona",
            html: pug.compileFile('./views/edit.pug')({
                old: {
                    nombre: apiReturn.data.nombre,
                    apellido: apiReturn.data.apellido,
                    email: apiReturn.data.email
                },
                errors: apiReturn.data.errors
            })
        } 
    };

    return res.send(JSON.stringify(params));
});



// Data services

app.post('/api/persona/new', (req, res) => {
    console.log(req.fields)
    let persona = {nombre: req.fields.nombre, apellido: req.fields.apellido, email: req.fields.email}
    let errors = Validation.validateNewPersona(persona);
    let apiReturn = errors;
    if(!errors){    
        let apiReturn = DB.create(persona);
    }
    let response = {
        errors: errors,
        old: persona,
        view: {
            title: "Nueva Persona",
            html: pug.compileFile('./views/insert.pug')({old: persona, errors})}
    }
    return res.send(response)
})

app.get('/api/persona/all', (req, res) => {
    return res.send(DB.all());
})


app.get('/api/persona/:id', (req, res) => {
    let persona = JSON.parse(DB.find(req.params.id));
    console.log(persona)
    let params = {
        view: {
            title: persona.data.found.nombre+" "+persona.data.found.apellido,
            html: pug.compileFile('./views/show.pug')({
            result: persona.data
            })
        }
    };

    return res.send(JSON.stringify(params));
})

app.delete('/api/persona/:id', (req, res) => {
    
    DB.delete(req.params.id)
    
    let params = {
        title: "Todas las personas",
        view: pug.compileFile('./views/index_personas.pug')({
            results: JSON.parse(DB.all())
        })
    };
    return res.send(JSON.stringify(params));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));