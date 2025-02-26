import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
})

module.exports = mongoose.model('Category', categoriesSchema)