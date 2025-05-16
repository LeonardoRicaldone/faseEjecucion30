import movieModel from "../models/Movie.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import cloudinaryConfig from "../utils/cloudinary.js";

//1- Configurar cloudinary con nuestra cuenta
cloudinary.config(cloudinaryConfig);

//Array de funciones vacío
const movieController = {};

//SELECT
movieController.getAllMovies = async (req, res) => {
    const movie = await movieModel.find();
    res.json(movie);
};


//INSERT
movieController.insertMovies = async (req, res) => {
    const { title,
        description,
        director,
        genre,
        year,
        duration } = req.body;
    let imageURL = ""

    //Subir la imagen a Cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )
        //Guardo en la variable la URL de donde se subió la imagen
        imageURL = result.secure_url
    }

    //Guardar todo en la base de datos
    const newMovie = new movieModel({
        title,
        description,
        director,
        genre,
        year,
        duration,
        image: imageURL
    })
    await newMovie.save();

    res.json({ message: "Movie saved" });
};

//UPDATE

movieController.updateMovies = async (req, res) => {
    const { id } = req.params;
    const { title,
        description,
        director,
        genre,
        year,
        duration } = req.body;

    //Subir la imagen a Cloudinary
    let imageURL = ""
    if (req.file) {
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )
        //Guardo en la variable la URL de donde se subió la imagen
        imageURL = result.secure_url
    }

    await movieModel.findByIdAndUpdate(id, {
        title,
        description,
        director,
        genre,
        year,
        duration,
        image: imageURL
    });

    res.json({ message: "Movie updated" });
}

//DELETE
movieController.deleteMovies = async (req, res) => {
    const { id } = req.params;
    await movieModel.findByIdAndDelete(id);
    res.json({ message: "Movie deleted" });
}

export default movieController;