import employeeModel from "../models/Employee.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"

//creamos un array de funciones

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
    //pedir todos los datos que vamos a guardar
    const { name,
        email,
        password,
        telephone,
        address,
        position,
        hiringDate,
        salary,
        dui } = req.body;

    try {
        //1- verificamos si el empleado ya existe
        const existEmployee = await employeeModel.findOne({ email })
        if (existEmployee) {
            return res.json({ message: "Employee already exist" })
        }

        //2- encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //3- Guardar el usuario en la base de datos

        const newEmployee = new employeeModel({
            name,
            email,
            password: passwordHash,
            telephone,
            address,
            position,
            hiringDate,
            salary,
            dui: dui || null,
        })

        await newEmployee.save();
        //token
        jsonwebtoken.sign(
            //1- que voy a guardar
            { id: newEmployee._id },
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            { expiresIn: config.JWT.expiresIn },
            //4- Funcion flecha
            (error, token) => {
                if (error) console.log("error" + error)

                res.cookie("authToken", token)
                res.json({ message: "Employees saved" })
            }
        )

    } catch (error) {
        console.log("error" + error)
        res.json({ message: "Error saving employee" })
    }
}

export default registerEmployeeController;