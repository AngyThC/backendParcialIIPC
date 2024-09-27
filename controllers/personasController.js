'use strict';
const db = require("../models");
const PersonaFactory = require('../factories/PersonaFactory');

module.exports = {
    // Obtener todas las personas
    getAll(req, res) {
        PersonaFactory.findAllPersonas()
            .then(personas => {
                return res.status(200).send(personas);
            })
            .catch(error => {
                console.error('Error al recuperar personas:', error);
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    // Obtener una persona por su ID
    getById(req, res) {
        const id = req.params.id;
        PersonaFactory.findPersonaById(id)
            .then(persona => {
                if (!persona) {
                    return res.status(404).send({
                        message: 'Persona no encontrada.'
                    });
                }
                return res.status(200).send(persona);
            })
            .catch(error => {
                console.error('Error al intentar recuperar la persona:', error);
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

  // Crear una nueva persona
create(req, res) {
    const { nombre, apellido, edad, profesion, universidad, carrera, trabajo, vehiculo, estado } = req.body;

    
    if (!nombre || !apellido || !edad) {
        return res.status(400).json({ message: 'Datos incompletos para crear la persona.' });
    }

    const datosIngreso = { 
        nombre,
        apellido,
        edad,
        profesion,
        universidad,
        carrera,
        trabajo,
        vehiculo,
        estado
    };

    PersonaFactory.createPersona(datosIngreso)
        .then(persona => {
            res.status(201).send(persona);
        })
        .catch(error => {
            console.error('Error al insertar persona:', error);
            return res.status(500).json({ error: 'Error al insertar persona' });
        });
},

    // Actualizar una persona existente
    update(req, res) {
        const id = req.params.id;
        const datosActualizados = req.body;
    
      
        if (!datosActualizados.nombre || !datosActualizados.apellido) {
            return res.status(400).json({ message: 'Datos incompletos para actualizar la persona.' });
        }
    
       
        PersonaFactory.updatePersona(id, datosActualizados)
            .then(personaActualizada => {
                if (!personaActualizada) {
                    return res.status(404).json({ message: 'Persona no encontrada.' });
                }
                return res.status(200).json(personaActualizada);
            })
            .catch(error => {
                console.error('Error al actualizar persona:', error);
                return res.status(500).json({ error: 'Error al actualizar persona' });
            });
    },
    

    // Eliminar una persona por su ID
    delete: async (req, res) => {
        const { id } = req.params;
        const personaEliminada = await PersonaFactory.deletePersona(id);
        if (personaEliminada) {
            return res.status(200).json({ message: 'Persona eliminada correctamente.' });
        }
        return res.status(404).json({ message: 'Persona no encontrada.' });
    }
    
};
