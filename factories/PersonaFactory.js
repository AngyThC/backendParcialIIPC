// PersonaFactory.js
'use strict';
const db = require('../models');
const Personas = db.personas; // Asegúrate de que 'personas' esté definido en tus modelos

class PersonaFactory {
    // Crear una nueva persona
    static createPersona(data) {
        return Personas.create(data);
    }

    // Obtener todas las personas
    static findAllPersonas() {
        return Personas.findAll()
            .catch(error => {
                console.error('Error en findAllPersonas:', error);
                throw error;
            });
    }

    // Obtener una persona por su ID
    static findPersonaById(id) {
        return Personas.findByPk(id);
    }

    // Actualizar una persona existente
    static updatePersona(id, data) {
        return Personas.update(data, {
            where: { idPersona: id } // Cambia 'idPersona' si el nombre de la clave primaria es diferente
        });
    }

    // Eliminar una persona por su ID
    static deletePersona(id) {
        return Personas.destroy({
            where: { idPersona: id } // Cambia 'idPersona' si el nombre de la clave primaria es diferente
        });
    }
}

module.exports = PersonaFactory;
