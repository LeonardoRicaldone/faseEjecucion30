/*
campos:
name,
email,
password,
telephone,
address,
position,
hiringDate,
salary,
DUI
*/ 

import {Schema, model} from 'mongoose';

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    hiringDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    dui:{
        type:String,
        required:true
    }
},{
    timestamps: true,
    strict: false,
  }
);

export default model('Employee', employeeSchema);