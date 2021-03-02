const Proyectos = require("../models/Proyectos")
const Tareas = require("../models/Tareas")

exports.agregarTarea = async(req, res, next)=>{
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })

    const {tarea} = req.body;
    const proyectoId = proyecto.id;
    const estado = 0;

    const resultado = await Tareas.create({tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async(req, res, next)=>{
    const {id} = req.params;
    const tarea = await Tareas.findOne({
        where : {
            id
        }
    })

    if(tarea.estado === 0){
        tarea.estado = 1;
    }else{
        tarea.estado = 0;
    }

    const resultado = await tarea.save();

    if(!resultado){
        return next();
    }

    res.send('Actualizado');
}

exports.eliminarTarea = (req, res, next)=>{
    const {id} = req.params;
    
    const resultado = Tareas.destroy({
        where: {
            id
        }
    })

    if(!resultado){
        return next();
    }

    res.send('Tarea eliminada correctamente');
}