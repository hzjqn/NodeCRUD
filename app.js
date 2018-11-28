const express = require('express');
const fs = require('fs');
const pug = require('pug');
const bodyParser = require('body-parser');
const DB = require('./classes/DB.js');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.locals.pretty = true; // Deberia borrarse en production
app.set('views', './views');
app.set('view engine', 'pug');


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
    let params = {
        title: "Index",
        view: pug.compileFile('./views/index.pug')(
            {
                results: JSON.parse(DB.all())
            
            }
        )
    };
    
    return res.send(JSON.stringify(params));
});
app.get('/api/search/:search', (req, res) => {

    let params = {
        title: "Busqueda",
        view: pug.compileFile('./views/search.pug')(
            {
                results: JSON.parse(DB.findSearch(req.params.search))
            
            }
        )
    };

    return res.send(JSON.stringify(params));
});


app.get('/api/persona/new', (req, res) => {

    let params = {
        title: "Nueva Persona",
        view: pug.compileFile('./views/insert.pug')({
            req: req,
            errors: errors
        })
    };

    return res.send(JSON.stringify(params));
});

app.get('/api/persona/index', (req, res) => {
    let params = {
        title: "Todas las personas",
        view: pug.compileFile('./views/index_personas.pug')({
            results: JSON.parse(DB.all())
        })
    };
    return res.send(JSON.stringify(params));
})



// Data services

app.get('/api/persona/all', (req, res) => {
    return res.send(DB.all());
})


app.get('/api/persona/:id', (req, res) => {
    let persona = JSON.parse(DB.find(req.params.id));
    let params = {
        title: persona.found.nombre+" "+persona.found.apellido,
        view: pug.compileFile('./views/show.pug')({
            result: persona
        })
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