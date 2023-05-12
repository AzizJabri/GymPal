const db = require("../db");

const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute(
            `SELECT * FROM userView`
        );
        return res.status(200).json({
            message: "All users",
            users: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;
        const [profile] = await db.execute(
            `SELECT * FROM profile WHERE userId = ?`, [id]
        );
        if (profile.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        await db.execute(
            `UPDATE user SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`, [firstName, lastName, email, password, id]
        );
        return res.status(200).json({
            message: "User info updated"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const [profile] = await db.execute(
            `SELECT * FROM profile WHERE userId = ?`, [id]
        );
        if (profile.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        await db.execute(
            `DELETE FROM user WHERE id = ?`, [id]
        );
        return res.status(200).json({
            message: "User deleted"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}