const db = require('../db');
const {generateToken} = require('../utils/tokenUtils');
const {isEmail} = require("validator");
const {comparePassword,hashPassword, isValidPassword} = require("../utils/passwordUtils");


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please add email and password"})
        }
        if(!isEmail(email)){
            return res.status(400).json({error:"Invalid email"})
        }
        const [admin] = await db.execute(
            `SELECT * FROM admin WHERE email = ?`,
            [email]
        );
        if (admin.length === 0) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }
        if(comparePassword(password, admin[0].passwordHash) === false){
            return res.status(400).json({error:"Wrong email or password"})
        }
        const [adminView] = await db.execute(
            `SELECT * FROM adminView WHERE email = ?`,
            [email]
        );
        const token = generateToken({user: adminView[0], role : "admin"});
        return res.status(200).json({
            message: "Login successful",
            user: adminView[0],
            token: token,
            role: "admin"

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const adminRegister = async (req, res) => {
    try {
        const {email, password, name } = req.body;
        if(!email || !password || !name){
            return res.status(400).json({error:"Please add all fields"})
        }
        if(!isEmail(email)){
            return res.status(400).json({error:"Invalid email"})
        }
        if(!isValidPassword(password)){
            return res.status(400).json({error:"Password must be at least 8 characters long and contain at least one number"})
        }
        const [admin] = await db.execute(
            `SELECT * FROM admin WHERE email = ?`,
            [email]
        );
        if (admin.length > 0) {
            return res.status(400).json({
                message: "Admin with this email already exists"
            });
        }
        const hashedPassword = await hashPassword(password);
        await db.execute(
            `INSERT INTO admin (email, passwordHash, name) VALUES (?, ?, ?)`,
            [email, hashedPassword, name]
        );
        return res.status(201).json({
            message: "Admin created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    adminLogin,
    adminRegister
}