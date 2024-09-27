'use strict';
const db = require("../models");
const Proyectos = db.proyectos;
const ProyectoFactory = require('../factories/ProyectoFactory');

module.exports = {

    find(req, res) {
        ProyectoFactory.findAllProyectos()
            .then(proyectos => {
                return res.status(200).send(proyectos);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al recuperar los datos.'
                });
            });
    },

    findById(req, res) {
        const id = req.params.id;
        ProyectoFactory.findProyectoById(id)
            .then(proyecto => {
                if (!proyecto) {
                    return res.status(404).send({
                        message: 'Proyecto no encontrado.'
                    });
                }
                return res.status(200).send(proyecto);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    create(req, res) {
        const datos_ingreso = { 
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            porcentaje: req.body.porcentaje || 0 
        };

        ProyectoFactory.createProyecto(datos_ingreso)
        .then(proyecto => {
            res.status(201).send(proyecto);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar proyecto' });
        });
    },

    update(req, res) {
        const id = req.params.id;
        const camposActualizados = req.body;

        ProyectoFactory.updateProyecto(id, camposActualizados)
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Proyecto no encontrado o no se pudo actualizar.' });
            }
            return res.status(200).send('El proyecto ha sido actualizado');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar proyecto' });
        });
    },

    async delete(req, res) {
        const id = req.params.id; 

        try {
            const proyecto = await ProyectoFactory.findProyectoById(id);

            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            await ProyectoFactory.deleteProyecto(id);
            return res.json({ message: 'Proyecto eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
            return res.status(500).json({ error: 'Error al eliminar proyecto' });
        }
    }
};

