import express from "express";
import registerEmployeesController from "../controllers/registerEmployeeController.js";
// Router() nos ayuda a colocar los metodos que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .post(registerEmployeesController.register);

  export default router;