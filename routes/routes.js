const express = require('express');
const routes = express.Router();

//Importar express-validator 
const {body} = require('express-validator');

//Importar los controladores
const {proyectoHome, formularioProyecto, nuevoProyecto, tareasPorUrl, formularioEditar, actualizarProyecto, eliminarProyecto} = require('../controllers/proyectoController');
const {agregarTarea, cambiarEstadoTarea, eliminarTarea} = require('../controllers/tareaController');
const { formCrearCuenta, crearCuenta, iniciarSesion, formReestablecer, confirmarCuenta } = require('../controllers/usuariosController');
const { autenticarUsuario, usuarioAutenticado, cerrarSesion, enviarToken, validarToken, actualizarPassword } = require('../controllers/authController');
const { Router } = require('express');

module.exports = function(){
    routes.get('/',usuarioAutenticado, proyectoHome);
    routes.get('/nuevo-proyecto', usuarioAutenticado, formularioProyecto);
    routes.post('/nuevo-proyecto',usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), nuevoProyecto);

    routes.get('/proyectos/:url', usuarioAutenticado, tareasPorUrl);
    routes.get('/proyectos/editar/:id', usuarioAutenticado, formularioEditar);
    routes.post('/nuevo-proyecto/:id', usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), actualizarProyecto);

    routes.delete('/proyectos/:url', usuarioAutenticado, eliminarProyecto);

    routes.post('/proyectos/:url', usuarioAutenticado, agregarTarea);

    routes.patch('/tareas/:id', usuarioAutenticado, cambiarEstadoTarea);

    routes.delete('/tareas/:id',usuarioAutenticado,  eliminarTarea);

    routes.get('/crear-cuenta',  formCrearCuenta);
    routes.post('/crear-cuenta', crearCuenta);
    routes.get('/confirmar/:correo', confirmarCuenta);

    routes.get('/iniciar-sesion', iniciarSesion);
    routes.post('/iniciar-sesion', autenticarUsuario);

    routes.get('/cerrar-sesion', cerrarSesion);

    routes.get('/reestablecer', formReestablecer);
    routes.post('/reestablecer', enviarToken);

    routes.get('/reestablecer/:token', validarToken);
    routes.post('/reestablecer/:token', actualizarPassword);

    return routes;
}