const db = require("../db")

const getAllWorkouts = async (req, res) => {
    const [workouts] = await db.execute(
        `SELECT * FROM workout WHERE userId = ?`,
        [req.user.id]
    );
    return res.status(200).json({
        message: "All workouts",
        workouts: workouts
    });
}

const getWorkoutById = async (req, res) => {
    const { id } = req.params;
    const [workout] = await db.execute(
        `SELECT * FROM workout WHERE id = ?`,
        [id]
    );
    if (workout.length === 0) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    if(workout[0].userId !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    return res.status(200).json({
        message: "Workout found",
        workout: workout[0]
    });
}

const createWorkout = async (req, res) => {
    const { name, notes } = req.body;
    const [workout] = await db.execute(
        `INSERT INTO workout (name, notes, userId) VALUES (?, ?, ?)`,
        [name, notes, req.user.id]
    );
    return res.status(201).json({
        message: "Workout created",
        workout: workout
    });
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { name, notes } = req.body;
    const [workout] = await db.execute(
        `SELECT * FROM workout WHERE id = ?`,
        [id]
    );
    if (workout.length === 0) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    if(workout[0].userId !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    await db.execute(
        `UPDATE workout SET name = ?, notes = ? WHERE id = ?`,
        [name, notes, id]
    );
    return res.status(200).json({
        message: "Workout updated"
    });
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    const [workout] = await db.execute(
        `SELECT * FROM workout WHERE id = ?`,
        [id]
    );
    if (workout.length === 0) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    if(workout[0].userId !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    await db.execute(
        `DELETE FROM workout WHERE id = ?`,
        [id]
    );
    return res.status(200).json({
        message: "Workout deleted"
    });
}

const addExerciseToWorkout = async (req, res) => {
    const { id } = req.params;
    const { exerciseId } = req.body;
    const [workout] = await db.execute(
        `SELECT * FROM workout WHERE id = ?`,
        [id]
    );
    if (workout.length === 0) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    if(workout[0].userId !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    await db.execute(
        `INSERT INTO workoutexercise (workoutId, exerciseId) VALUES (?, ?)`,
        [id, exerciseId]
    );
    return res.status(200).json({
        message: "Exercise added to workout"
    });
}

const removeExerciseFromWorkout = async (req, res) => {
    const { id, exerciseId } = req.params;
    const [workout] = await db.execute(
        `SELECT * FROM workout WHERE id = ?`,
        [id]
    );
    if (workout.length === 0) {
        return res.status(404).json({
            message: "Workout not found"
        });
    }
    if(workout[0].userId !== req.user.id) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    await db.execute(
        `DELETE FROM workoutexercise WHERE workoutId = ? AND exerciseId = ?`,
        [id, exerciseId]
    );
    return res.status(200).json({
        message: "Exercise removed from workout"
    });
}

const getWorkoutExercises = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const [exercises] = await db.execute(
            `SELECT * FROM workoutExerciseView WHERE workoutId = ?`,
            [workoutId]
        );
        return res.status(200).json({
            message: "All exercises for workout",
            exercises: exercises
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    getWorkoutExercises
}