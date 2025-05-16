import nodemailer from "nodemailer"; //Enviar correo
import {config} from "../config.js";

//configurar el transporter
//¿Quien envia el correo?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

//Quien lo envia
const sendEmail = async (to, subject, body, html) => {
    try {
        const info = await transporter.sendMail({
            from: "mrpardod871@gmail.com", // sender address
            to, // list of receivers
            subject, // Subject line
            body, // plain text body
            html, // html body
        });

        return info;

    } catch (error) {
        console.error("Error al enviar el correo:", error);
        
    }
}

const HTMLRecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña - Cinemark</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .content strong {
            font-size: 18px;
            color: #d32f2f;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button {
            background-color: #d32f2f;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://www.cinemark.com/logo.png" alt="Cinemark Logo">
        </div>
        <div class="content">
            Hola,<br><br>
            Hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código para completar el proceso de recuperación:
            <br><br>
            <strong>${code}</strong>
            <br><br>
            Si no solicitaste este cambio, puedes ignorar este correo.
        </div>
        <div class="button-container">
            <a href="https://cinemark.com/reset-password?code=${code}" class="button">Restablecer Contraseña</a>
        </div>
        <div class="footer">
            Si tienes algún problema, por favor contáctanos.<br>
            &copy; 2025 Cinemark. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>
    `;
};

export {sendEmail, HTMLRecoveryEmail};