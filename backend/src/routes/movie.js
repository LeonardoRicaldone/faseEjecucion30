import express from "express";
import movieController from "../controllers/movieController.js";
import multer from "multer";
//Router() nos ayuda a colocar los métodos que tendrá mi ruta
const router = express.Router();

//Configurar una carpeta local que guarde el registro de las imagenes subidas
const upload = multer({dest: "public/"})

router.route("/")
.get(movieController.getAllMovies)
.post(upload.single("image"), movieController.insertMovies)

router.route("/:id")
.put(upload.single("image"), movieController.updateMovies)
.delete(movieController.deleteMovies);

export default router;