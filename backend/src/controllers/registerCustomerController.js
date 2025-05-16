//Importamos todas las librerias
import jsonwebtoken from "jsonwebtoken"; //Generar Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientsModel from "../models/Customer.js";
import { config } from "../config.js";

//Array de funciones
const registerClientsController = {};

registerClientsController.registerClient = async (req, res) => {
    // 1- Pedimos las cosas que vamos a guardar
    const {
        name,
        email,
        password,
        telephone,
        address,
        dui,
    } = req.body;

    try {
        //Verificar si el usuario ya existe
        const existClient = await clientsModel.findOne({ email });
        if (existClient) {
            return res.json({ message: "Client already exist" });
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        //Guardamos en la base de datos
        const newClient = new clientsModel({
            name,
            email,
            password: passwordHash,
            telephone,
            address,
            dui: dui || null,
        });
        await newClient.save();
         //token
         jsonwebtoken.sign(
            //1- que voy a guardar
            { id: newClient._id },
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            { expiresIn: config.JWT.expiresIn },
            //4- Funcion flecha
            (error, token) => {
                if (error) console.log("error" + error)

                res.cookie("authToken", token)
                res.json({ message: "client saved" })
            }
        )

    } catch (error) {
        res.json({ message: "Error" + error });
    }
};


export default registerClientsController;