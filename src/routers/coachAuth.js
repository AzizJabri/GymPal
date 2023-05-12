const router = require("express").Router()
const {coachLogin, coachRegister} = require("../auth/Coach")

router.post("/login",coachLogin)
router.post("/register", coachRegister)

module.exports = router
