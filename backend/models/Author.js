import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    surname: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 255
    },

    dob: {
        type: Date,
        required: false,
    },
 avatar: {
        type: String,
    },


});

const Author = mongoose.model("Author", authorSchema);

export default Author;