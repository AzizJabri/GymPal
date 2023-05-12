const db = require("../db");
const { verifyToken } = require("../utils/tokenUtils");


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        const decoded = verifyToken(token);
        const role = decoded.role
        if(role === "admin"){
            const [admin] = await db.execute(
                `SELECT * FROM adminView WHERE id = ?`,
                [decoded.user.id]
            );
            if (admin.length === 0) {
                throw new Error();
            }
            req.user = admin[0];
        }else if (role === "coach"){
            const [coach] = await db.execute(
                `SELECT * FROM coachView WHERE id = ?`,
                [decoded.user.id]
            );
            if (coach.length === 0) {
                throw new Error();
            }
            req.user = coach[0];
        }else if (role === "user"){
            const [user] = await db.execute(
                `SELECT * FROM userView WHERE id = ?`,
                [decoded.user.id]
            );
            if (user.length === 0) {
                throw new Error();
            }
            req.user = user[0];
        }else{
            throw new Error()
        }
        req.role = role
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Not authorized to access this resource"
        });
    }
}

module.exports = {isAuthenticated};