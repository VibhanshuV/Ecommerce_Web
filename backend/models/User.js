import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    role: {
        type: String,
        required: true,
        default: 'user'
    },

    // profileImg: {
    //     type: String,
    //     default: ""
    // },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;