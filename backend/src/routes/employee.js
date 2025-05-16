
import express from "express";
import employeesController from "../controllers/employeeController.js";
// Router() nos ayuda a colocar los metodos que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(employeesController.getEmployees)

router
  .route("/:id")
  .put(employeesController.updatedEmployees)
  .delete(employeesController.deleteEmployees);

export default router;
