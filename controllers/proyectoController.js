const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectoHome = async(req, res)=>{

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    })

    res.render('index', {
        nombrePagina: 'Proyecto UpTask',
        proyectos
    });
}

exports.formularioProyecto = async(req, res)=>{

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    })

    res.render('nuevoProyecto',{
        nombrePagina: 'Proyecto UpTask',
        proyectos
    })
}

exports.nuevoProyecto = async(req, res)=>{
    //Enviar a la consola lo que el usuario escriba
    //console.log(req.body);

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    })

    //Validar que tenemos algo en el input
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores = [...errores, {texto: 'Agrega un nombre al proyecto'}];
    }

    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevos proyectos',
            errores,
            proyectos
        })
    }else{
        //No hay errores
        //Insertar en la base de datos
        await Proyectos.create({nombre, usuarioId});
        res.redirect('/');
    }
}

exports.tareasPorUrl = async(req, res, next)=>{
    const proyecto = await Proyectos.findOne({
        where:{
            url: req.params.url
        }
    })

    if(!proyecto){
        return next();
    }

    const proyectos = await Proyectos.findAll();

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    });

    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyectos,
        proyecto,
        tareas
    })
}

exports.formularioEditar = async(req, res)=>{

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    })

    const proyecto = await Proyectos.findOne({
        where:{
            id: req.params.id
        }
    })

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async(req, res)=>{
    //Enviar a la consola lo que el usuario escriba
    //console.log(req.body);

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    })

    //Validar que tenemos algo en el input
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores = [...errores, {texto: 'Agrega un nombre al proyecto'}];
    }

    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevos proyectos',
            errores,
            proyectos
        })
    }else{
        //No hay errores
        //Insertar en la base de datos
        await Proyectos.update({nombre}, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/');
    }
}

exports.eliminarProyecto = async(req, res)=>{
    const {proyectoUrl} = req.query;
    
    const respuesta = await Proyectos.destroy({
        where: {
            url: proyectoUrl
        }
    })

    if(!respuesta){
        return next();
    }

    res.send('Proyecto eliminado correctamente')
}