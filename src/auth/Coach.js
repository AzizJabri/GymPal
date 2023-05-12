const db = require('../db');
const {generateToken} = require('../utils/tokenUtils');
const {isEmail} = require("validator");
const {comparePassword, hashPassword, isValidPassword } = require("../utils/passwordUtils");

const coachLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please add email and password"})
        }
        if(!isEmail(email)){
            return res.status(400).json({error:"Invalid email"})
        }
        const [coach] = await db.execute(
            `SELECT * FROM coach WHERE email = ?`,
            [email]
        );
        if (coach.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if(comparePassword(password, coach[0].passwordHash) === false){
            return res.status(400).json({error:"Wrong email or password"})
        }
        const [coachView] = await db.execute(
            `SELECT * FROM coachView WHERE email = ?`,
            [email]
        );
        const token = generateToken({user : coachView[0], role : "coach"});
        return res.status(200).json({
            message: "Login successful",
            coach: coachView[0],
            token: token,
            role: "coach"

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const coachRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password, experience } = req.body;
        if(!firstName || !lastName || !email || !password || !experience){
            return res.status(400).json({error:"Please add all fields"})
        }
        if(!isEmail(email)){
            return res.status(400).json({error:"Invalid email"})
        }
        if(!isValidPassword(password)){
            return res.status(400).json({error:"Password must be at least 8 characters long and contain at least one number"})
        }
        const [coach] = await db.execute(
            `SELECT * FROM coach WHERE email = ?`,
            [email]
        );
        if (coach.length > 0) {
            return res.status(400).json({
                message: "Coach with this email already exists"
            });
        }
        const hashedPassword = await hashPassword(password);
        await db.execute(
            `INSERT INTO coach (firstName, lastName, email, passwordHash, experience, isApproved, joinedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, email, hashedPassword, experience, 0, new Date]
        );
        return res.status(201).json({
            message: "Coach created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    coachLogin,
    coachRegister
}

