//array de metodos (C R U D)
const employeeController = {};
import { json } from "express";
import employeesModel from "../models/Employee.js"; //llamamos el modelo

// SELECT
employeeController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees);
};

// DELETE
employeeController.deleteEmployees = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Employees deleted" });
};

// UPDATE
employeeController.updatedEmployees = async (req, res) => {
    //solicito todos los valores
    const {
        name,
        email,
        password,
        telephone,
        address,
        position,
        hiringDate,
        salary,
        DUI
    } = req.body;

    await employeesModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            password,
            telephone,
            address,
            position,
            hiringDate,
            salary,
            DUI
        },
        { new: true }
    );

    res, json({ message: "Employees updated" });
};

export default employeeController;