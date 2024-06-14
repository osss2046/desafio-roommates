const express = require('express');
const router = express.Router();
const { getAllRoommates, getRandomRoommate } = require('../controllers/roommateController');

// Ruta para devolver todos los roommates
router.get('/', async (req, res) => {
    try {
        const roommates = await getAllRoommates();
        res.status(200).json({ roommates });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roommates' });
    }
});

// Ruta para agregar un nuevo roommate
router.post('/', async (req, res) => {
    try {
        const roommate = await getRandomRoommate();
        res.status(201).json(roommate);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar un nuevo roommate' });
    }
});

module.exports = router;
