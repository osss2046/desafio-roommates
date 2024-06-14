const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const getRandomRoommate = async () => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        const roommate = {
            id: uuidv4(),
            name: `${user.name.first} ${user.name.last}`,
            email: user.email
        };

        const filePath = path.join(__dirname, '..', 'roommates.json');
        let data;
        try {
            data = await fs.readFile(filePath, 'utf8');
        } catch (error) {
            if (error.code === 'ENOENT') {
                data = '[]';
            } else {
                throw error;
            }
        }
        const roommates = JSON.parse(data);

        // Verificar si el roommate ya existe basado en el email
        const existingRoommate = roommates.find(r => r.email === roommate.email);
        if (!existingRoommate) {
            roommates.push(roommate);
            await fs.writeFile(filePath, JSON.stringify(roommates, null, 2));
        }
        
        return roommate;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener un nuevo roommate');
    }
};

const getAllRoommates = async () => {
    try {
        const filePath = path.join(__dirname, '..', 'roommates.json');
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los roommates');
    }
};

module.exports = { getRandomRoommate, getAllRoommates };
