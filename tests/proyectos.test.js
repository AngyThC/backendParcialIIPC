const request = require('supertest');
const app = require('../app');
const db = require('../models');

describe('Controlador de Alertas', () => {

    // Antes de ejecutar las pruebas se autentica la conexión a la base de datos
    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    // Después de ejecutar las pruebas se cierra la conexión a la base de datos
    afterAll(async () => {
        await db.sequelize.close();
    });

    it('should return 7 days left for the project and create an alert', async () => {
        const fechaFinExacta = new Date();
        fechaFinExacta.setDate(fechaFinExacta.getDate() + 7);  // Asegura que sean 7 días desde ahora
        
        const proyectoTest = await db.proyectos.create({
            nombre: 'Proyecto Test',
            fechaInicio: new Date('2024-08-01'),
            fechaFin: fechaFinExacta,
            porcentaje: 50
        });

        // Realizar la solicitud GET para verificar los días restantes
        const res = await request(app).get(`/alertas/proyecto/${proyectoTest.idProyecto}/checkIfSevenDaysLeft`);
    
        // Asegurar que la respuesta tiene los datos correctos y no nulos
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Faltan (6|7) días para la fecha final del proyecto./); // Flexibilidad para 6 o 7 días
        expect(res.body.alertaCreada).toBe(true);
    
        // Verificar que la alerta se haya creado en la base de datos
        const alerta = await db.alertas.findOne({ where: { idProyecto: proyectoTest.idProyecto } });
        expect(alerta).not.toBeNull();
        expect(alerta.Descripcion).toMatch(/Faltan (6|7) días para la fecha final del proyecto "Proyecto Test"./); // Flexibilidad en días
    
        // Asegurar que no hay datos nulos en la alerta
        expect(alerta.idAlerta).toBeDefined();
        expect(alerta.idProyecto).toBeDefined();
        expect(alerta.Descripcion).not.toBeNull();
    });

    it('should manually create an alert via POST', async () => {
        // Primero, crea un proyecto para asociar la alerta
        const proyectoTest = await db.proyectos.create({
            nombre: 'Proyecto para Alerta Manual',
            fechaInicio: new Date('2024-08-01'),
            fechaFin: new Date('2024-09-01'),
            porcentaje: 50
        });
    
        // Luego, usa el id del proyecto recién creado para crear la alerta
        const nuevaAlerta = {
            Descripcion: 'Alerta manual de prueba',
            idProyecto: proyectoTest.idProyecto // Asegúrate de que este ID existe
        };
        
        const response = await request(app).post('/alertas/create').send(nuevaAlerta);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('idAlerta'); // Asegúrate de que la propiedad idAlerta es correcta
    });
    

    it('should return the number of days left when not 7 and not create an alert', async () => {
        const fechaFinExacta = new Date();
        fechaFinExacta.setDate(fechaFinExacta.getDate() + 10);  // 10 días desde ahora
        
        const proyectoConDiezDias = await db.proyectos.create({
            nombre: 'Proyecto Test 10 días',
            fechaInicio: new Date('2024-08-01'),
            fechaFin: fechaFinExacta,
            porcentaje: 50
        });

        const res = await request(app).get(`/alertas/proyecto/${proyectoConDiezDias.idProyecto}/checkIfSevenDaysLeft`);

        // Verificar que el código de estado sea 200 y que el mensaje sea correcto
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Faltan (9|10) días para la fecha final del proyecto./); // Flexibilidad en días
        expect(res.body.alertaCreada).toBe(false);

        // Verificar que no se creó ninguna alerta en la base de datos
        const alerta = await db.alertas.findOne({ where: { idProyecto: proyectoConDiezDias.idProyecto } });
        expect(alerta).toBeNull();
    });

    it('should return an error when the project ID is not provided', async () => {
        const res = await request(app).get('/alertas/proyecto/ /checkIfSevenDaysLeft');  
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Project ID is required and must be valid');
    });
    
    it('should return an error when the database is not accessible', async () => {
        const originalFindOne = db.proyectos.findByPk;
        db.proyectos.findByPk = jest.fn(() => {
            throw new Error('Database not accessible');
        });
    
        const res = await request(app).get(`/alertas/proyecto/170/checkIfSevenDaysLeft`);
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Error al verificar la fecha del proyecto.');

        db.proyectos.findByPk = originalFindOne;
    });
});
