import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// Hash password before saving 
userSchema.pre("save", async function(next){
    if (!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch(err){
        next(err)
    }
})

// method to compare password

userSchema.methods.comparePassword = async (candidatePassword) =>{
    return await bcrypt.compare(this.password, candidatePassword)
}
export const User = mongoose.model("User", userSchema);