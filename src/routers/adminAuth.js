const router = require("express").Router()
const {adminLogin, adminRegister,} = require("../auth/Admin")

router.post("/login",adminLogin)
router.post("/register", adminRegister)

module.exports = router
