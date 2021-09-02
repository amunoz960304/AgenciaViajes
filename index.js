// version commonjs const express = require('express');
import express, { request } from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' })

const app = express();

//conectar BD
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//habilitar PUG
app.set('view engine', 'pug');

//Obtener año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

//agregar body parser para leer datos
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta publica (Estilos e imagenes)
app.use(express.static('public'));

//agregar router
app.use('/', router);

/** Puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 80;


app.listen(port, host, () => {
    console.log('Servidor funcionando');
});