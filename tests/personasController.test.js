'use strict';

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const personasController = require('../controllers/personasController'); 
const PersonaFactory = require('../factories/PersonaFactory');

const app = express();
app.use(bodyParser.json()); 


app.get('/personas/get', personasController.getAll);
app.get('/personas/get/:id', personasController.getById); /
app.post('/personas/create', personasController.create); 
app.put('/personas/update/:id', personasController.update); 
app.delete('/personas/delete/:id', personasController.delete);


jest.mock('../factories/PersonaFactory');

describe('Pruebas unitarias para el controlador de personas', () => {
    

    test('GET /personas/get debe devolver todas las personas', async () => {
        PersonaFactory.findAllPersonas.mockResolvedValue([{ id: 1, nombre: 'Juan' }]);
        
        const response = await request(app).get('/personas/get');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 1, nombre: 'Juan' }]);
    });


    test('GET /personas/get/:id debe devolver una persona', async () => {
        const personaMock = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
        PersonaFactory.findPersonaById.mockResolvedValue(personaMock);
        
        const response = await request(app).get('/personas/get/1');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(personaMock);
    });

 
    test('GET /personas/get/:id debe devolver 404 si la persona no existe', async () => {
        PersonaFactory.findPersonaById.mockResolvedValue(null);
        
        const response = await request(app).get('/personas/get/999'); 
        
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Persona no encontrada.' });
    });


    test('POST /personas/create debe crear una nueva persona', async () => {
        const nuevaPersona = {
            nombre: 'Juan',
            apellido: 'Pérez',
            edad: 30,
            profesion: 'Ingeniero',
            universidad: 'Universidad X',
            carrera: 'Ingeniería Civil',
            trabajo: 'Empresa Y',
            vehiculo: 'Auto',
            estado: 'Activo'
        };

        PersonaFactory.createPersona.mockResolvedValue(nuevaPersona);
        
        const response = await request(app)
            .post('/personas/create')
            .send(nuevaPersona);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(nuevaPersona);
    });


    test('POST /personas/create debe devolver 400 si falta información', async () => {
        const personaIncompleta = { nombre: 'Juan' }; // Falta apellido y edad
        
        const response = await request(app)
            .post('/personas/create')
            .send(personaIncompleta);
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: 'Datos incompletos para crear la persona.' });
    });


    test('PUT /personas/update/:id debe actualizar la persona existente', async () => {
        const personaActualizada = {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            edad: 31,
            profesion: 'Ingeniero',
            universidad: 'Universidad X',
            carrera: 'Ingeniería Civil',
            trabajo: 'Empresa Y',
            vehiculo: 'Auto',
            estado: 'Activo'
        };

        PersonaFactory.updatePersona.mockResolvedValue(personaActualizada);
        
        const response = await request(app)
            .put('/personas/update/1')
            .send(personaActualizada);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(personaActualizada);
    });

    test('PUT /personas/update/:id debe devolver 404 si la persona no existe', async () => {
        PersonaFactory.updatePersona.mockResolvedValue(null);
        
        const response = await request(app)
            .put('/personas/update/999')
            .send({ nombre: 'Juan', apellido: 'Pérez' }); 
        
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Persona no encontrada.' });
    });

    test('PUT /personas/update/:id debe devolver 400 si falta información', async () => {
        const personaIncompleta = { nombre: 'Juan' }; 
        
        const response = await request(app)
            .put('/personas/update/1')
            .send(personaIncompleta);
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: 'Datos incompletos para actualizar la persona.' });
    });

    test('DELETE /personas/delete/:id debe eliminar la persona existente', async () => {
        const personaMock = { id: 1, nombre: 'Juan', apellido: 'Pérez' };

        PersonaFactory.deletePersona.mockResolvedValue(personaMock);
        
        const response = await request(app).delete('/personas/delete/1');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Persona eliminada correctamente.' });
    });

    test('DELETE /personas/delete/:id debe devolver 404 si la persona no existe', async () => {
        PersonaFactory.deletePersona.mockResolvedValue(null);
        
        const response = await request(app).delete('/personas/delete/999');
        
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Persona no encontrada.' });
    });
});
