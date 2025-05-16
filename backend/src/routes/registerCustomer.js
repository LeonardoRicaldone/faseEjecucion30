import express from "express";
import registerClientController from "../controllers/registerCustomerController.js";

// Router() nos ayuda a colocar los metodos que tendra mi ruta
const router = express.Router();

router.route("/").post(registerClientController.registerClient);

export default router;