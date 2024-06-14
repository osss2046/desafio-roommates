const express = require('express');
const router = express.Router();
const { getAllGastos, addGasto, updateGasto, deleteGasto } = require('../controllers/gastoController');

// Ruta para devolver todos los gastos
router.get('/', async (req, res) => {
    try {
        const gastos = await getAllGastos();
        res.status(200).json({ gastos });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los gastos' });
    }
});

// Ruta para agregar un nuevo gasto
router.post('/', async (req, res) => {
    try {
        const gasto = await addGasto(req.body);
        res.status(201).json(gasto);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el gasto' });
    }
});

// Ruta para actualizar un gasto existente
router.put('/', async (req, res) => {
    try {
        const gasto = await updateGasto(req.query.id, req.body);
        res.status(200).json(gasto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el gasto' });
    }
});

// Ruta para eliminar un gasto
router.delete('/', async (req, res) => {
    try {
        await deleteGasto(req.query.id);
        res.status(200).json({ message: 'Gasto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el gasto' });
    }
});

module.exports = router;
