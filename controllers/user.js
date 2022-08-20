import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const signin = async(req,res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if(!existingUser) res.status(404).json({ message: 'User does not exits!!'});

        const isPasswordCoorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCoorrect) res.status(400).json({ message: 'Invalid credentials!!'});

        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h'});

        res.status(200).json({ result: existingUser, token});
    } catch(err){
        res.status(500).json({message: 'something went wrong!!'})
    }
}

export const signup = async(req,res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if(existingUser) res.status(400).json({ message: 'User already exits!!'});

        if(password !== confirmPassword) res.status(400).json({ message: 'Password dont match!!'});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword});

        const token = jwt.sign({email:result.email, id: result._id}, 'test', { expiresIn: '1h'});

        res.status(200).json({ result: result, token});
    } catch(err){
        res.status(500).json({message: 'something went wrong!!'})
    }
}