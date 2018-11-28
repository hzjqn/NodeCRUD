'use strict';
const fs = require('fs')

module.exports = class DB {

    // Acceso al contenido de personas.json
    static File(){
        return fs.readFileSync('./personas.json', 'utf-8');
    }

    // Traer todas las personas
    static all(){
        console.log(this.File());
        let personas = JSON.parse(this.File()).personas;
        let foundPersonas = [];
        for(let i = 0; i < personas.length; i++){
            foundPersonas.push({
                searched: 'all',
                found: personas[i]
            });
        }
        return JSON.stringify(foundPersonas);
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
        return JSON.stringify(foundPersonas);
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
        return JSON.stringify(foundPersona);
    }

    // Salvar un objeto en personas
    static save(object){
        let personas = JSON.parse(this.File()).personas;
        let newPersona = {
            id: personas.length,
            nombre: object.nombre,
            apellido: object.apellido,
            confirmado: false,
            email: object.email
        }
        personas.push(newPersona);
        fs.writeFile('./personas.json', JSON.stringify({personas: personas}, null, 2), function(err){
            return 'ERROR!: '+err;
        });
        return JSON.stringify({
            message: "ok"
        });
    }

    // Borrar una persona del json
    static delete(id){
        let personas = JSON.parse(this.File()).personas;
        for(let i = 0; i < personas.length; i++){
            if(personas[i].id == id){
                personas.splice(i, 1);
                let toReturn = fs.writeFileSync('./personas.json', JSON.stringify({personas:personas}, null, 2), function(err){
                    return 'ERROR!: '+err;
                });
                return JSON.parse(this.File()).personas
            }
        }
    }
}