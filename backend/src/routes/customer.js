import express from "express";
import clientsController from "../controllers/customerController.js"; //llamamos el controlador
// Router() nos ayuda a colocar los metodos que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientsController.getClients)

router
  .route("/:id")
  .put(clientsController.updatedClients)
  .delete(clientsController.deleteClients);

export default router;