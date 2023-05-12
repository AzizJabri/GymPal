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

const getAllCoaches = async (req, res) => {
    try {
        const [coaches] = await db.execute(
            `SELECT * FROM coachView`
        );
        return res.status(200).json({
            message: "All coaches",
            coaches: coaches
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const [admins] = await db.execute(
            `SELECT * FROM adminView`
        );
        return res.status(200).json({
            message: "All admins",
            admins: admins
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getAllUsersByCoach = async (req, res) => {
    try {
        const coachId = req.params.id;
        const [users] = await db.execute(
            `SELECT * FROM CoachClient WHERE coachId = ?`,
            [coachId]
        );
        const usersInfo = [];
        for (let i = 0; i < users.length; i++) {
            const [user] = await db.execute(
                `SELECT * FROM userView WHERE userId = ?`,
                [users[i].userId]
            );
            usersInfo.push(user[0]);
        }
        return res.status(200).json({
            message: "All users by coach",
            users: usersInfo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getAllCoachesByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const [coaches] = await db.execute(
            `SELECT * FROM CoachClient WHERE userId = ?`,
            [userId]
        );
        const coachesInfo = [];
        for (let i = 0; i < coaches.length; i++) {
            const [coach] = await db.execute(
                `SELECT * FROM coachView WHERE coachId = ?`,
                [coaches[i].coachId]
            );
            coachesInfo.push(coach[0]);
        }
        return res.status(200).json({
            message: "All coaches by user",
            coaches: coachesInfo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getAllNonApprovedCoaches = async (req, res) => {
    try {
        const [coaches] = await db.execute(
            `SELECT * FROM coachView WHERE approved = 0`
        );
        return res.status(200).json({
            message: "All non approved coaches",
            coaches: coaches
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getAllApprovedCoaches = async (req, res) => {
    try {
        const [coaches] = await db.execute(
            `SELECT * FROM coachView WHERE approved = 1`
        );
        return res.status(200).json({
            message: "All approved coaches",
            coaches: coaches
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const approveCoach = async (req, res) => {
    try {
        const coachId = req.params.id;
        const [coach] = await db.execute(
            `SELECT * FROM coachView WHERE coachId = ?`,
            [coachId]
        );
        if (coach.length === 0) {
            return res.status(404).json({
                message: "Coach not found"
            });
        }
        await db.execute(
            `UPDATE coach SET approved = 1 WHERE coachId = ?`,
            [coachId]
        );
        return res.status(200).json({
            message: "Coach approved"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const deleteCoach = async (req, res) => {
    try {
        const coachId = req.params.id;
        const [coach] = await db.execute(
            `SELECT * FROM coachView WHERE coachId = ?`,
            [coachId]
        );
        if (coach.length === 0) {
            return res.status(404).json({
                message: "Coach not found"
            });
        }
        await db.execute(
            `DELETE FROM coach WHERE coachId = ?`,
            [coachId]
        );
        return res.status(200).json({
            message: "Coach deleted"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const updateCoach = async (req, res) => {
    try {
        const coachId = req.params.id;
        const [coach] = await db.execute(
            `SELECT * FROM coachView WHERE coachId = ?`,
            [coachId]
        );
        if (coach.length === 0) {
            return res.status(404).json({
                message: "Coach not found"
            });
        }
        const { firstName, lastName, email, experience, approved } = req.body;
        await db.execute(
            `UPDATE coach SET firstName = ?, lastName = ?, email = ?, experience = ?, approved = ? WHERE coachId = ?`,
            [firstName, lastName, email, experience, approved, coachId]
        );
        return res.status(200).json({
            message: "Coach updated"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getCoachById = async (req, res) => {
    try {
        const coachId = req.params.id;
        const [coach] = await db.execute(
            `SELECT * FROM coachView WHERE coachId = ?`,
            [coachId]
        );
        if (coach.length === 0) {
            return res.status(404).json({
                message: "Coach not found"
            });
        }
        return res.status(200).json({
            message: "Coach found",
            coach: coach[0]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



