'use strict';
const fs = require('fs')

class DB {
    // Acceso al contenido de personas.json
    static File(){
        return fs.readFileSync('./personas.json', 'utf-8');
    }

    // Traer todas las personas
    static all(){
        let personas = JSON.parse(this.File()).personas;

        if(!personas){
            response = {
                status: "fail",
                data: personas
            }
        }
        let response = {
            status: "ok",
            data: personas
        }

        return JSON.stringify(response);
    }

    // Traer una sola persona por id
    static findSearch(search){
        let personas = JSON.parse(this.File()).personas;
        let foundPersonas = [];
        for(let i = 0; i < personas.length; i++){
            if(personas[i].nombre.search(new RegExp(search, "i")) != -1 || personas[i].apellido.search(new RegExp(search, "i")) != -1 || personas[i].email.search(new RegExp(search, "i")) != -1){
                foundPersonas.push({
                    searched: search,
                    found: personas[i]
                });
            }
        }
        let response = {
            status: "ok",
            data: foundPersonas
        }
        if(!foundPersonas){
            response = {
                status: "not found",
                data: foundPersonas
            }
        }
        return JSON.stringify(response);
    }

    // Traer una sola persona por id
    static find(personId){
        let personas = JSON.parse(this.File()).personas;
        let foundPersona = null;
        for(let i = 0; i < personas.length; i++){
            if(personas[i].id == personId){
                foundPersona = {
                    searched: personId,
                    found: personas[i]
                };
            }
        }
        let response = {
            status: "ok",
            data: foundPersona
        }
        if(!foundPersona){
            response = {
                status: "not found",
                data: foundPersona
            }
        }
        return JSON.stringify(response);
    }

    // Salvar un objeto en personas
    static create(object){
        let personas = JSON.parse(this.File()).personas;
        let newId = personas[personas.length-1].id + 1
        let newPersona = {
            id: newId,
            nombre: object.nombre,
            apellido: object.apellido,
            confirmado: false,
            email: object.email
        }
        personas.push(newPersona);
        fs.writeFileSync('./personas.json', JSON.stringify({personas: personas}, null, 2), function(err){
            return 'ERROR!: '+err;
        });
        return this.find(newPersona.id);
    }

    // Salvar un objeto en personas
    static edit(persona, oldPersona){
        console.log('editando', persona, oldPersona)
        let personas = JSON.parse(this.File()).personas;
        let newPersona = {
            id: oldPersona.id,
            nombre: persona.nombre,
            apellido: persona.apellido,
            confirmado: false,
            email: persona.email
        }
        personas[oldPersona.id] = newPersona;
        fs.writeFileSync('./personas.json', JSON.stringify({personas: personas}, null, 2), function(err){
            return 'ERROR!: '+err;
        });
        return this.find(newPersona.id);
    }

    // Borrar una persona del json
    static delete(id){
        let initialPersonas = JSON.parse(this.File()).personas;
        let personas = JSON.parse(this.File()).personas;
        for(let i = 0; i < personas.length; i++){
            if(personas[i].id == id){
                personas.splice(i, 1);
                let toReturn = fs.writeFileSync('./personas.json', JSON.stringify({personas:personas}, null, 2), function(err){
                    return 'ERROR!: '+err;
                });
            }
        }

        let response = {
            status: "ok",
            data: personas
        }
        
        if(initialPersonas == personas){
            response = {
                status: "fail",
                data: personas
            }
        }

        return JSON.stringify(response);
    }
}

module.exports = DB;