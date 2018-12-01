'use strict';

const express = require('express');
const fs = require('fs');
const _ = require('lodash')
const opn = require('opn')
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

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
    opn('http://localhost:3000');
});
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
                    id: req.params.id,
                    nombre: apiReturn.data.found.nombre,
                    apellido: apiReturn.data.found.apellido,
                    email: apiReturn.data.found.email
                },
                errors: apiReturn.errors
            })
        } 
    };

    return res.send(JSON.stringify(params));
});



// Data services

app.post('/api/persona/new', (req, res) => {
    let persona = {nombre: req.fields.nombre, apellido: req.fields.apellido, email: req.fields.email}
    let errors = Validation.validateNewPersona(persona);
    let apiReturn = null
    if(JSON.stringify(errors) == JSON.stringify({})){
        errors = false;
    }
    if(!errors){
        apiReturn = DB.create(persona);
    }
    let response = {
        status: errors ? "ok" : "failed",
        errors: errors,
        view: {
            title: "Nueva Persona",
            html: pug.compileFile('./views/insert.pug')({old: persona, errors: errors})}
    }
    return res.send(response)
})


app.get('/api/persona/all', (req, res) => {
    return res.send(DB.all());
})

app.patch('/api/persona/:id/edit', (req, res) => {
    let oldPersona = JSON.parse(DB.find(req.params.id)).data.found
    let persona = {id: req.params.id, nombre: req.fields.nombre, apellido: req.fields.apellido, email: req.fields.email}
    let errors = Validation.validatePersonaEdition(persona, oldPersona);
    if(JSON.stringify(errors) == JSON.stringify({})){
        errors = false;
    }
    if(!errors){
        let apiReturn = DB.edit(persona, oldPersona);
    }
    
    let response = {
        status: errors ? "ok" : "failed",
        errors: errors,
        old: persona,
        view: {
            title: "Editando: " + oldPersona.nombre+" "+oldPersona.apellido,
            html: pug.compileFile('./views/edit.pug')({old: persona, errors: errors})
        }
    }
    return res.send(response)
})

app.get('/api/persona/:id', (req, res) => {
    let persona = JSON.parse(DB.find(req.params.id));
    let params = {
        result: persona.data,
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
    
    let status = DB.delete(req.params.id)
    
    let params = {
        status: status,
        view:{
            title: "Todas las personas",
            html: pug.compileFile('./views/index_personas.pug')({
                results: JSON.parse(DB.all())
            })
        }
    };

    return res.send(JSON.stringify(params));
})