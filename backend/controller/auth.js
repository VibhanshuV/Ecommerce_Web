import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const login = async (req,res) => {
    try {
        const {username, password} = req.body;
        const currUser = await User.findOne({username});
        const isPasswordCorrect = bcrypt.compare(password, currUser?.password || "");
        if(!currUser || !isPasswordCorrect) return res.status(400).json({error: "Invalid Username or Password!"});
        generateTokenAndSetCookie(currUser._id, res);
        return res.status(201).json({
            _id: currUser._id, 
            username: currUser.username, 
            email: currUser.email, 
        });
    } catch (e) {
        console.log("Error in login controller", e.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const register = async (req,res) => {
    try {
        const {username, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//pattern matching email
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid Email Format!"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser) return res.status(400).json({error: "Username already taken!"});

        const existingEmail = await User.findOne({email});
        if(existingEmail) return res.status(400).json({error: "User with tha same email already exists!"});

        if(password.length<6) return res.status(400).json({error: "Password must be at least 6 characters long."});

        //Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({email, password: hashedPassword, username});
        if(newUser) {
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id, 
                userName: newUser.username, 
                email: newUser.email, 
            });
        } else {
            return res.status(400).json({error: "Invalid User Data!"});
        }
    } catch (e) {
        console.log("Error in register controller", e.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = async (req,res) => {
    try{
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (e) {
        console.log("Error in loout controller", e.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

