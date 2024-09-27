// ProyectoFactory.js
'use strict';
const db = require('../models');
const Proyectos = db.proyectos;

class ProyectoFactory {
    static createProyecto(data) {
        return Proyectos.create(data);
    }

    static findAllProyectos() {
        console.log(Proyectos); // Verifica si Proyectos está correctamente importado
        return Proyectos.findAll()
            .catch(error => {
                console.error('Error en findAllProyectos:', error);
                throw error;
            });
    }

    static findProyectoById(id) {
        return Proyectos.findByPk(id);
    }

    static updateProyecto(id, data) {
        return Proyectos.update(data, {
            where: { idProyecto: id }
        });
    }

    static deleteProyecto(id) {
        return Proyectos.destroy({
            where: { idProyecto: id }
        });
    }
}

module.exports = ProyectoFactory;
