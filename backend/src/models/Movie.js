/*
campos:
title,
description,
director,
genre,
year,
duration,
image
*/

import {Schema, model} from 'mongoose';

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps: true,
    strict: false,
  }
);

export default model('Movie', movieSchema);