const db = require("../db");

const getAllExercises = async (req, res) => {
    try {
        const [exercises] = await db.execute(
            `SELECT * FROM exercise`
        );
        return res.status(200).json({
            message: "All exercises",
            exercises: exercises
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getExerciseById = async (req, res) => {
    try {
        const exerciseId = req.params.id;
        const [exercise] = await db.execute(
            `SELECT * FROM exercise WHERE id = ?`,
            [exerciseId]
        );
        if (exercise.length === 0) {
            return res.status(404).json({
                message: "Exercise not found"
            });
        }
        return res.status(200).json({
            message: "Exercise found",
            exercise: exercise[0]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const searchExercises = async (req, res) => {
    try {
        const { name } = req.query;
        const [exercises] = await db.execute(
            `SELECT * FROM exercise WHERE name LIKE ?`,
            [`%${name}%`]
        );
        return res.status(200).json({
            message: "All exercises",
            exercises: exercises
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

