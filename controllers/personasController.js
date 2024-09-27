'use strict';
const db = require("../models");
const PersonaFactory = require('../factories/PersonaFactory');

module.exports = {
    // Obtener todas las personas
    find(req, res) {
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
    findById(req, res) {
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
        const datosIngreso = { 
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            profesion: req.body.profesion,
            universidad: req.body.universidad,
            carrera: req.body.carrera,
            trabajo: req.body.trabajo,
            vehiculo: req.body.vehiculo,
            estado: req.body.estado
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
        const camposActualizados = req.body;

        PersonaFactory.updatePersona(id, camposActualizados)
            .then(([rowsUpdated]) => {
                if (rowsUpdated === 0) {
                    return res.status(404).send({ message: 'Persona no encontrada o no se pudo actualizar.' });
                }
                return res.status(200).send('La persona ha sido actualizada');
            })
            .catch(error => {
                console.error('Error al actualizar persona:', error);
                return res.status(500).json({ error: 'Error al actualizar persona' });
            });
    },

    // Eliminar una persona por su ID
    async delete(req, res) {
        const id = req.params.id; 

        try {
            const persona = await PersonaFactory.findPersonaById(id);

            if (!persona) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }

            await PersonaFactory.deletePersona(id);
            return res.json({ message: 'Persona eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar persona:', error);
            return res.status(500).json({ error: 'Error al eliminar persona' });
        }
    }
};
