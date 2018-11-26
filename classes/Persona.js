'use strict';
const fs = require('fs')

module.exports = class Persona {
    
    static File(){
        return JSON.parse(fs.readFileSync('./personas.json', 'utf-8'));
    }

    static all(){
        console.log('all')
        return JSON.stringify(this.File());
    }

    static find(userId){
        console.log(userId);
        let personas = this.File().personas;
        console.log(personas)
        console.log(personas.length)
        for(let i = 0; i < personas.length; i++){
            if(personas[i].id == userId){
                return JSON.stringify(personas[i]);
            }
        }
        return null;
    }

    constructor(object) {
        this.setName(object.name);
        this.setLastname(object.lastname);
        this.setEmail(object.email);
    }

    save(){
        this.id = Personas().length
        Personas.push(this);
        fs.writeFile('./personas.json', JSON.stringify(Personas()), function(err){
            console.log('ERROR!: '+err);
        });
    }

    getName(){
        return this.name;
    }

    getLastname(){
        return this.lastname;
    }

    getEmail(){
        return this.email;
    }    
    
    setName(name){
        this.name = name;
        return this;
    }

    setLastname(lastname){
        this.lastname = lastname;
        return this;
    }

    setEmail(email){
        this.email = email;
        return this;
    }
}