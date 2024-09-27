const { Router } = require('express');
const proyectosController = require('../controllers/proyectosController');
const empleadosController = require('../controllers/empleadosController');
const alertasController = require('../controllers/alertasController');
const personasController = require('../controllers/personasController');
const router = Router();

module.exports = (app) => {
    // Rutas de Proyectos
    router.get('/proyectos/get', proyectosController.find);
    router.get('/proyectos/:id', proyectosController.findById);
    router.post('/proyectos/create', proyectosController.create);
    router.put('/proyectos/update/:id', proyectosController.update);
    router.delete('/proyectos/delete/:id', proyectosController.delete);
    
    // Rutas de Empleados
    router.get('/empleados/get', empleadosController.find);
    router.get('/empleados/:id', empleadosController.findById);
    router.post('/empleados/create', empleadosController.create);
    router.put('/empleados/update/:id', empleadosController.update);
    router.delete('/empleados/delete/:id', empleadosController.delete);
    
    // Rutas de Alertas
    router.get('/alertas/get', alertasController.find);
    router.get('/alertas/:id', alertasController.findById);
    router.post('/alertas/create', alertasController.create);
    router.put('/alertas/update/:id', alertasController.update);
    router.delete('/alertas/delete/:id', alertasController.delete);
    router.get('/alertas/proyecto/:idProyecto/checkIfSevenDaysLeft', alertasController.checkIfSevenDaysLeft);
   
    // Rutas de Personas
    router.get('/personas/get', personasController.getAll); // Cambiado aquí
    router.get('/personas/get/:id', personasController.getById);
    router.post('/personas/create', personasController.create);
    router.put('/personas/update/:id', personasController.update);
    router.delete('/personas/delete/:id', personasController.delete);

  
    app.use('/', router);
};
