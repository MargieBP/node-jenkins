const { Router } = require('express')
const { createProyecto, getProyecto , updateProyecto} =
 require('../controllers/proyecto')

const router = Router()

// crear
router.post('/', createProyecto)

// consultar todos
router.get('/', getProyecto)

// actualizar por id
router.put('/:id', updateProyecto)

module.exports = router;