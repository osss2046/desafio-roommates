const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { updateRoommateBalances } = require('./roommateController');

const getAllGastos = async () => {
    try {
        const filePath = path.join(__dirname, '..', 'gastos.json');
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los gastos');
    }
};

const addGasto = async (gasto) => {
    try {
        const filePath = path.join(__dirname, '..', 'gastos.json');
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
        const gastos = JSON.parse(data);

        const newGasto = { id: uuidv4(), ...gasto };
        gastos.push(newGasto);

        await fs.writeFile(filePath, JSON.stringify(gastos, null, 2));

        // Recalcular cuentas de roommates
        await updateRoommateBalances();

        return newGasto;
    } catch (error) {
        console.error(error);
        throw new Error('Error al agregar el gasto');
    }
};

const updateGasto = async (id, updatedGasto) => {
    try {
        const filePath = path.join(__dirname, '..', 'gastos.json');
        const data = await fs.readFile(filePath, 'utf8');
        const gastos = JSON.parse(data);

        const gastoIndex = gastos.findIndex(g => g.id === id);
        if (gastoIndex === -1) {
            throw new Error('Gasto no encontrado');
        }

        gastos[gastoIndex] = { ...gastos[gastoIndex], ...updatedGasto };

        await fs.writeFile(filePath, JSON.stringify(gastos, null, 2));

        // Recalcular cuentas de roommates
        await updateRoommateBalances();

        return gastos[gastoIndex];
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el gasto');
    }
};

const deleteGasto = async (id) => {
    try {
        const filePath = path.join(__dirname, '..', 'gastos.json');
        const data = await fs.readFile(filePath, 'utf8');
        const gastos = JSON.parse(data);

        const newGastos = gastos.filter(g => g.id !== id);

        await fs.writeFile(filePath, JSON.stringify(newGastos, null, 2));

        // Recalcular cuentas de roommates
        await updateRoommateBalances();
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el gasto');
    }
};

module.exports = { getAllGastos, addGasto, updateGasto, deleteGasto };
