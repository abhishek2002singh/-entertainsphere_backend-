const User = require('../models/auth');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('../utils/validation');

exports.login = async (req, res) => {    
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).send("Please provide email and password");
        }

        // Logic to authenticate user
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(401).send("Email is not present in database");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            
       
            const token = await user.getJWT();
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                expires: new Date(Date.now() + 8 * 3600000),
            });
            const userData = {
                user:user
            }
            if(userData.user.role="admin"){
                return res.status(200).json({ message: "admin Login successful", user, token });
            }
            else if(userData.user.role="user"){
                return res.status(200).json({ message: "user Login successful", user, token });
            }
            else if(userData.user.role="assistant"){
                return res.status(200).json({ message: "assistant Login successful", user, token });
            }
            
            return res.status(200).json({ message: "Login successful", user, token });
        }
        else {
            return res.status(401).send("Invalid password");
        }
    } catch (err) {
        res.status(500).send("Error: " + err.message);

    }
}

exports.signup = async (req, res) => {
    try{
        // Validate the request body
        validateSignUpData(req);

        const {firstName ,lastName , emailId , password,role} = req.body;
        if(!firstName || !lastName || !emailId || !password){
            return res.status(400).send("Please provide all required fields")
        }

        const existingUser = await User.findOne({emailId});
        if(existingUser){
            return res.status(409).send("User already exists")
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            role: role, // Default role is "user"
        }); 
        const saveUser = await newUser.save();
        const token = await saveUser.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            expires: new Date(Date.now() + 8 * 3600000)
        });

        res.status(201).json({message: "User created successfully", user: saveUser, token})

    }catch(err){
        res.status(500).send("Error: " + err.message)
    }
}; 

exports.logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        return res.status(500).send("Error: " + err.message);
    }
};
