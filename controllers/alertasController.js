'use strict';
const express = require('express');
const db = require("../models");
const Alertas = db.alertas;

module.exports = {

    // Obtener todas las alertas activas
    find(req, res) {
        return Alertas.findAll()
        .then(alertas => {
            return res.status(200).send(alertas);
        })
        .catch(error => {
            return res.status(500).send({
                message: 'Ocurrió un error al recuperar los datos de alertas.'
            });
        });
    },

    // Obtener una alerta por su ID
    findById(req, res) {
        const id = req.params.id;
        return Alertas.findByPk(id)
            .then(alerta => {
                if (!alerta) {
                    return res.status(404).send({
                        message: 'Alerta no encontrada.'
                    });
                }
                return res.status(200).send(alerta);
            })
            .catch(error => {
                return res.status(500).send({
                    message: 'Ocurrió un error al intentar recuperar el registro.'
                });
            });
    },

    // Crear una nueva alerta
    create(req, res) {
        let datos = req.body;
        const datos_ingreso = { 
            idProyecto: datos.idProyecto,
            Descripcion: datos.Descripcion
        };

        Alertas.create(datos_ingreso)
        .then(alerta => {
            res.status(201).send(alerta);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al insertar alerta' });
        });
    },

    // Actualizar una alerta existente
    update(req, res) {
        const datos = req.body;
        const id = req.params.id;

        const camposActualizados = {};
    
        if (datos.Descripcion !== undefined) camposActualizados.Descripcion = datos.Descripcion;
        if (datos.idProyecto !== undefined) camposActualizados.idProyecto = datos.idProyecto; 

        return Alertas.update(
            camposActualizados,
            {
                where: { idAlerta: id } 
            }
        )
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                return res.status(404).send({ message: 'Alerta no encontrada' });
            }
            return res.status(200).send('La alerta ha sido actualizada');
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al actualizar alerta' });
        });
    },    

    // Eliminar una alerta por su ID
    async delete(req, res) {
        const id = req.params.id; 
    
        try {
            const alerta = await Alertas.findByPk(id);
    
            if (!alerta) {
                return res.status(404).json({ error: 'Alerta no encontrada' });
            }
        
                await alerta.destroy();
            return res.json({ message: 'Alerta eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar alerta:', error);
            return res.status(500).json({ error: 'Error al eliminar alerta' });
        }
    },

    async checkIfSevenDaysLeft(req, res) {
        const idProyecto = req.params.idProyecto;
        console.log(`Verificando proyecto con ID: ${idProyecto}`); 
    
        // Verificación de que se ha proporcionado un ID de proyecto válido
        if (!idProyecto || isNaN(Number(idProyecto)) || idProyecto.trim() === '') {
            console.log('ID del proyecto no proporcionado, inválido o vacío');  
            return res.status(400).send({ message: 'Project ID is required and must be valid' });
        }
    
        try {
            // Buscar el proyecto por su ID
            const proyecto = await db.proyectos.findByPk(idProyecto);
            console.log('Proyecto encontrado:', proyecto);  
    
            if (!proyecto) {
                console.log('Proyecto no encontrado');  
                return res.status(404).send({ message: 'Proyecto no encontrado.' });
            }
    
            // Calcular los días restantes
            const fechaHoy = new Date();
            const fechaFinal = new Date(proyecto.fechaFin);
            const diasRestantes = Math.ceil((fechaFinal - fechaHoy) / (1000 * 60 * 60 * 24));
            console.log(`Días restantes para el proyecto "${proyecto.nombre}": ${diasRestantes}`);  
    
            if (diasRestantes >= 6 && diasRestantes <= 7) {  // Flexibilidad para 6 o 7 días
                console.log('Faltan 6 o 7 días, creando alerta...');
    
                // Crear la alerta en la base de datos
                try {
                    const nuevaAlerta = await db.alertas.create({
                        idProyecto: proyecto.idProyecto,
                        Descripcion: `Faltan ${diasRestantes} días para la fecha final del proyecto "${proyecto.nombre}".`
                    });
    
                    console.log('Alerta creada exitosamente:', nuevaAlerta);  
    
                    return res.status(200).send({
                        message: `Faltan ${diasRestantes} días para la fecha final del proyecto.`,
                        alertaCreada: true,
                        alerta: nuevaAlerta  // Incluye la alerta creada en la respuesta
                    });
                } catch (error) {
                    console.error('Error al crear la alerta:', error);
                    return res.status(500).send({ message: 'Error al crear la alerta.' });
                }
            } else {
                console.log(`No se creó la alerta. Faltan ${diasRestantes} días.`);  
                return res.status(200).send({
                    message: `Faltan ${diasRestantes} días para la fecha final del proyecto.`,
                    alertaCreada: false
                });
            }
        } catch (error) {
            console.error('Error al verificar la fecha del proyecto:', error);  
            return res.status(500).json({ error: 'Error al verificar la fecha del proyecto.' });
        }
    }
    

    
    
};
