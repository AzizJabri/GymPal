const router = require("express").Router()
const {userLogin, userRegister} = require("../auth/User")

router.post("/login",userLogin)
router.post("/register", userRegister)

module.exports = router
