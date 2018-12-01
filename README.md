
# API
## Routes
### GET: "/api/personas/all"
Retorna un JSON con todas las personas en personas.json

#### Formato:
```json
{
"status": "ok", // o "fail"
"data": [Personas, ...]
}

```

### GET: "/api/personas/#id"
Retorna un JSON con los datos de la persona con id = #id
#### Formato:
```json
{
"status": "ok", // o "fail"
"data": Persona con id #id
}
```

### GET: "/api/personas/new"
#### Formato:
```json
{
	"status": "ok", // o "fail"
	"data": [Personas, ...]}
	"errors": {
            "input": // mensaje de error,
	},
	// Adicionalmente retorna una vista
	"view": {
		"title": "Titulo de una vista",
		"html": "html de la vista"
	}
}
```
### POST: "/api/persona/new"
Espera un formulario tipo multipart/form-data con los campos *"nombre"*, *"apellido"* y *"email"*.

Retorna un JSON con los datos de la operacion.
#### Formato
```json
{
	"status": "ok", // o "fail"
	"data": [Personas, ...]}
	"errors": {
			"input": // Mensaje de error
	},
	"old": {
		"nombre": "", // nombre enviado
		"apellido": "", // apellido enivado
		"email": "", // email enviado
	},
	// Adicionalmente retorna una vista
	"view": {
		"title": "Titulo de una vista",
		"html": "html de la vista"
	}
}
```
### PATCH: "/api/persona/#id/edit"

Edita un objeto persona con id = #id en personas.json

Espera un formulario tipo multipart/form-data con los campos *"nombre"*, *"apellido"* y *"email"*.

Retorna
#### Formato
```json
{
	"status": "ok", // o "fail"
	"data": [Personas, ...]}
	"errors": {
			"input": mensaje de error,
			...
	},
	"old": {
		"nombre": nombre enviado
		"apellido": apellido enivado
		"email": email enviado
	},
	// Adicionalmente retorna una vista
	"view": {
		"title": Titulo de una view,
		"html": html de la vista
	}
}
```
### DELETE: "/api/persona/#id"

Borra el objeto persona con id = #id de personas.json.
Retorna los datos de la operacion y todas las personas restantes.

#### Formato
```json
{
	"status": "ok", // o "fail"
	"data": [
        // ... Todas las personas restantes
    ]
}
```


