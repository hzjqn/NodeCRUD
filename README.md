Para iniciar la aplicacion correr:

```
npm install
```

```
node app.js
```

# API
## Routes
### GET: "/api/personas/all"
Retorna un JSON con todas las personas en personas.json

#### Formato:
```
{
"status": "ok",
"data": [Personas, ...]
}

```

### GET: "/api/personas/#id"
Retorna un JSON con los datos de la persona con id = #id
#### Formato:
```
{
"status": "ok",
"data": {
        "searched": "id",
        "found": Objeto Persona
    }
}
```

### GET: "/api/search/#"
Retorna un JSON con los datos de la o las personas con nombre, apellido y/o email coincidiendo con #
#### Formato:
```
{
"status": "ok",
"data": {
        "searched": "#",
        "found": Objeto Persona
    }
}
```

### POST: "/api/persona/new"
Espera un formulario tipo multipart/form-data con los campos *"nombre"*, *"apellido"* y *"email"*.

Retorna un JSON con los datos de la operacion.
#### Formato
```
{
	"status": "ok",
	"data": [Personas, ...],
	"errors": {
			"input": // Mensaje de error
	},
	"old": {
		"nombre": "nombre enviado",
		"apellido": "apellido enivado",
		"email": "email enviado"
	},
	// Adicionalmente retorna una vista
	"view": {
		"title": "Titulo de una vista",
		"html": "html de la vista"
	}
}
```
### PATCH: "/api/persona/#id/edit"

Edita un objeto persona con id = #id en personas.json.

Espera un formulario tipo multipart/form-data con los campos *"nombre"*, *"apellido"* y *"email"*.

Retorna un JSON con los datos de la operacion.
#### Formato
```
{
	"status": "ok",
	"data": [Personas, ...],
	"errors": {
			"input": mensaje de error,
			...
	},
	"old": {
        "id": "id enviado (#id)",
		"nombre": "nombre enviado",
		"apellido": "apellido enivado",
		"email": "email enviado"
	},
	// Adicionalmente retorna una vista
	"view": {
		"title": "Titulo de una vista",
		"html": "html de la vista"
	}
}
```
### DELETE: "/api/persona/#id"

Borra el objeto persona con id = #id de personas.json.
Retorna los datos de la operacion y todas las personas restantes.

#### Formato
```
{
	"status": "ok",
	"data": [Personas, ...]
}
```


