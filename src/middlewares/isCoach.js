const isCoach = (req, res, next) => {
    if (req.user.role === "coach") {
        next();
    } else {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
};