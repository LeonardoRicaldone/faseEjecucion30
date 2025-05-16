//array de metodos (C R U D)
const clientsController = {};
import { json } from "express";
import clientsModel from "../models/Customer.js"; //llamamos el modelo

// SELECT
clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients);
};

// DELETE
clientsController.deleteClients = async (req, res) => {
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "client deleted" });
};

// UPDATE
clientsController.updatedClients = async (req, res) => {
    //solicito todos los valores
    const {
        name,
        email,
        password,
        telephone,
        address,
        dui,
    } = req.body;

    await clientsModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            password,
            telephone,
            address,
            dui,
        },
        { new: true }
    );

    res, json({ message: "client updated" });
};

export default clientsController;