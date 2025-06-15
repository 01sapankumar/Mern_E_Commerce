import { User } from "../Models/User.js";
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

//user register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user)
            return res.json({ message: "User Already exit", success: false });
        const hashPass = await bycrypt.hash(password, 10)


        user = await User.create({ name, email, password: hashPass });
        res.json({ message: "User register succesfully ...!", user, success: true })
    }
    catch (error) {
        res.json({ message: error.message })

    }
}

//user login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) return res.json({ message: "User not found", success: false });
        const vaildPassword = await bycrypt.compare(password, user.password);
        if (!vaildPassword)return res.json({ message: "Invalid credential", success: false });

        const token = jwt.sign({userId:user._Id},"!@#&*$()",{
            expiresIn:'365d'
        })
        res.json({ message: `Welcome ${user.name}`, token, success: true, });
    } catch (error) {
        res.json({ message: error.message })
    }
}

//get all user
export const users = async (req, res) => {
    try {
        let users = await User.find().sort({ createdAt: -1 });
        res.json(users)

    } catch (error) {
        res.json(error.message);
    }
}


// get profile 
export const profile = async (req, res) =>{
    res.json({user:req.User})
}