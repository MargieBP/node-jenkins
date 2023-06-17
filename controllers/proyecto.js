const Proyecto = require('../models/proyectos')


const { request, response} = require('express')
const Cliente = require('../models/clientes')
const Etapa = require('../models/etapas')
const TipoProyecto = require('../models/tipoProyectos')
const Universidad = require('../models/universidades')
// crear
const createProyecto = async (req = request, 
    res = response) => {
    try{

        const numero = req.body.numero
            ? req.body.numero.toUpperCase()
            : ''
        const proyectoBD = await Proyecto.findOne({numero})//select * from tipoEquipo where nombre=?

        if(proyectoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }

        const titulo = req.body.titulo
        const fechaEntrega = req.body.fechaEntrega
        const valor = req.body.valor

        const data = {
            ...req.body,
            titulo,
            fechaEntrega,
            valor
        }
        
       
        console.log(data)
        const { cliente, etapa, tipoProyecto, universidad } = data;

        const clienteBD = Cliente.findOne({
            _id: cliente._id,
            estado: true
        })

        if(!clienteBD){
            return res.status(400).json({
                msg: `Cliente no existe`
            })
        }

        const etapaBD = Etapa.findOne({
            _id: etapa._id,
            estado: true
        })

        if(!etapaBD){
            return res.status(400).json({
                msg: `Etapa no existe`
            })
        }

        const tipoProyectoBD = TipoProyecto.findOne({
            _id: tipoProyecto._id,
            estado: true
        })

        if(!tipoProyectoBD){
            return res.status(400).json({
                msg: `Tipo de proyecto no existe`
            })
        }

        const universidadBD = Universidad.findOne({
            _id: universidad._id,
            estado: true
        })

        if(!universidadBD){
            return res.status(400).json({
                msg: `Universidad no existe`
            })
        }

    
        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyecto = async (req = request, 
    res = response) => {
        try{
            console.log('Petición')
            const proyectoBd = await Proyecto.find()//select * from inventarios
            return res.json(proyectoBd)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar inventario
const updateProyecto = async (req = request, 
    res = response) => {

    try{
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        console.log(data)
        const proyectoBd  = await Proyecto.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(proyectoBd)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}


module.exports = { createProyecto, getProyecto, updateProyecto }
