const db = require('../db');
const {generateToken} = require('../utils/tokenUtils');
const {isEmail} = require("validator");
const {comparePassword, hashPassword, isValidPassword } = require("../utils/passwordUtils");


const login = async (req, res) => {
    const {email, password, role} = req.body;
    if(!role){
        return res.status(400).json({error:"Please add role"})
    }
    if(!email || !password){
        return res.status(400).json({error:"Please add email and password"})
    }
    if(!isEmail(email)){
        return res.status(400).json({error:"Invalid email"})
    }
    try{
        switch(role){
            case "user":
                const [user] = await db.execute(
                    `SELECT * FROM user WHERE email = ?`,
                    [email]
                );
                if (user.length === 0) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                if(comparePassword(password, user[0].passwordHash) === false){
                    return res.status(400).json({error:"Wrong email or password"})
                }
                const [userView] = await db.execute(
                    `SELECT * FROM userView WHERE email = ?`,
                    [email]
                );
                token = generateToken({user :userView[0], role : "user"});
                return res.status(200).json({
                    message: "Login successful",
                    user: userView[0],
                    token: token,
                    role: "user"
                });
            case "admin":
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
    
                token = generateToken({admin :adminView[0], role : "admin"});
                return res.status(200).json({
                    message: "Login successful",
                    user: adminView[0],
                    token: token,
                    role: "admin"
                });
            case "coach":
                const [coach] = await db.execute(
                    `SELECT * FROM coach WHERE email = ?`,
                    [email]
                );
                if (coach.length === 0) {
                    return res.status(404).json({
                        message: "Coach not found"
                    });
                }
                if(comparePassword(password, coach[0].passwordHash) === false){
                    return res.status(400).json({error:"Wrong email or password"})
                }
                const [coachView] = await db.execute(
                    `SELECT * FROM coachView WHERE email = ?`,
                    [email]
                );
                token = generateToken({coach :coachView[0], role : "coach"});
                return res.status(200).json({
                    message: "Login successful",
                    user: coachView[0],
                    token: token,
                    role: "coach"
                });
            default:
                return res.status(400).json({error:"Invalid role"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }


}


const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if(!role){
            return res.status(400).json({error:"Please add role"})
        }
        if(!email || !password){
            return res.status(400).json({error:"Please add email and password"})
        }
        if(!isEmail(email)){
            return res.status(400).json({error:"Invalid email"})
        }       
        if(!isValidPassword(password)){
            return res.status(400).json({error:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number"})
        }
        switch(role){
            case "user":
                const [user] = await db.execute(
                    `SELECT * FROM user WHERE email = ?`,
                    [email]
                );
                if (user.length > 0) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }
                hashedPassword = await hashPassword(password)
                now = new Date();
                await db.execute(
                    `INSERT INTO user (email, passwordHash, joinedAt) VALUES (?, ?, ?)`,
                    [email, hashedPassword, now]
                );
                const [newUser] = await db.execute(
                    `SELECT * FROM userView WHERE email = ?`,
                    [email]
                );
                return res.status(201).json({
                    message: "User created",
                    user: newUser[0],
                    token : generateToken(newUser[0]),
                    role: "user"
                });
            case "coach":
                const { firstName, lastName, experience } = req.body;
                if(!firstName || !lastName || !experience){
                    return res.status(400).json({error:"Please add all fields"})
                }
                const [coach] = await db.execute(
                    `SELECT * FROM coach WHERE email = ?`,
                    [email]
                );
                if (coach.length > 0) {
                    return res.status(400).json({
                        message: "Coach already exists"
                    });
                }
                hashedPassword = await hashPassword(password);
                now = await new Date();
                await db.execute(
                    `INSERT INTO coach (email, passwordHash, firstName, lastName, experience, joinedAt, isApproved) VALUES (?, ?, ?, ?, ?, ?, 0)`,
                    [email, hashedPassword, firstName, lastName, experience, now]
                );
                const [newCoach] = await db.execute(
                    `SELECT * FROM coachView WHERE email = ?`,
                    [email]
                );
                token = generateToken({coach :newCoach[0], role : "coach"});
                return res.status(201).json({
                    message: "Coach created",
                    user: newCoach[0],
                    token : generateToken(newCoach[0]),
                    role: "coach"
                });
            default:
                return res.status(400).json({error:"Invalid role"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    login,
    register
}