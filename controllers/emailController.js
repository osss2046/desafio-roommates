const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

const sendEmailToRoommates = async (newGasto) => {
    try {
        const roommatesPath = path.join(__dirname, '..', 'roommates.json');
        const roommatesData = await fs.readFile(roommatesPath, 'utf8');
        const roommates = JSON.parse(roommatesData);

        // Configura el transportador de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puedes usar cualquier otro servicio de correo electrónico
            auth: {
                user: 'tuemail@gmail.com', // Cambia esto a tu dirección de correo electrónico
                pass: 'tucontraseña' // Cambia esto a tu contraseña de correo electrónico
            }
        });

        // Crear una lista de destinatarios
        const recipients = roommates.map(roommate => roommate.email).join(',');

        const mailOptions = {
            from: 'tuemail@gmail.com', // Cambia esto a tu dirección de correo electrónico
            to: recipients,
            subject: 'Nuevo gasto registrado',
            text: `Se ha registrado un nuevo gasto:\n\nRoommate: ${newGasto.roommate}\nDescripción: ${newGasto.descripcion}\nMonto: $${newGasto.monto}`
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw new Error('Error al enviar el correo electrónico');
    }
};

module.exports = { sendEmailToRoommates };
