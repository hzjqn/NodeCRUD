'use strict';

const _ = require('lodash');
const DB = require('./../DB');
console.log('Validation loaded');

const messages = {
    email: {
        unique: "Ya existe una persona en la base de datos con este email.",
        format: "el email debe tener el formato correspondiente (x@y.z)"
    },
    id: {
        unique: "Ya existe una persona en la base de datos con este id." 
    },
    nombre: {
        length: "El nombre debe tener mas de 1 caracter"
    },
    apellido: {
        length: "El apellido debe tener mas de 1 caracter"
    }
}


class Validation
{
    static validateUniquePersona(object) {
        let errors = null
        let personas = JSON.parse(DB.File()).personas
        
        for (let i = 0; i < personas.length; i++) {
            const persona = personas[i];
            if(this.objectsHaveSame('email', persona, object)){
                errors['email'] = messages.email.unique
            }
            if(this.objectsHaveSame('id')){
                errors['id'] = messages.id.unique
            }
        }
        
        return errors
    }
    
    static objectsHaveSame(property,x, y, string = false) {
        var objectsAreSame = true;
        if(x[property] !== (string ? y : y[property])) {
            objectsAreSame = false;
        }
        return objectsAreSame;
    }
    
    static validateNombre(string) {
        let error = null
        if(string.length < 2){
            error = messages.nombre.length
        }

        return error
    }

    static validateApellido(string) {
        let error = null
        if(string.length < 1){
            error = messages.apellido.length
        }

        return error
    }

    static validateEmail(string) {
        console.log('validating email')
        let error = null
        let uniqueEmail = () => {
            let personas = JSON.parse(DB.File()).personas;
            for (let i = 0; i < personas.length; i++) {
                const persona = personas[i];
                if(this.objectsHaveSame('email', persona, string, true)){
                    return true
                } else {
                    return false
                }
            }
        }
        if(!string.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)){
            error = messages.email.format
        } else if (!uniqueEmail(string)) {
            error = messages.email.unique
        }
        return error
    }

    static validateNewPersona(object) {
        console.log(object.nombre)
        let errors = {}
        if(_.has(object, 'nombre')){
            let error = this.validateNombre(object.nombre);
            if(error)
                errors['nombre'] = error;
        } else {
            error['nombre'] = 'null'
        }
        if(_.has(object, 'apellido')){
            let error = this.validateApellido(object.apellido);
            if(error)
                errors['apellido'] = error;
        } else {
            error['apellido'] = 'null'
        }
        if(_.has(object, 'email')){
            let error = this.validateEmail(object.email);
            if(error)
                errors['email'] = error;
        } else {
            error['email'] = 'null'
        }
        return errors;
    }

    static validatePersonaEdition(object) {
        errors = null
        validateUniquePersona(object)

        if(_.has(object, 'id')){
            let error = this.validateId(object.email);
            if(error)
                errors['email'] = error;
        } else {
            error['email'] = 'null'
        }
        if(_.has(object, 'nombre')){
            let error = this.validateNombre(object.nombre);
            if(error)
                errors['nombre'] = error;
        } else {
            error['nombre'] = 'null'
        }
        if(_.has(object, 'apellido')){
            let error = this.validateApellido(object.apellido);
            if(error)
                errors['apellido'] = error;
        } else {
            error['apellido'] = 'null'
        }
        if(_.has(object, 'email')){
            let error = this.validateEmail(object.email);
            if(error)
                errors['email'] = error;
        } else {
            error['email'] = 'null'
        }
    }
}

module.exports = Validation