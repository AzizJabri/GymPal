const router = require("express").Router()
const {login, register} = require("../auth")
const {adminRegister} = require("../auth/Admin")

router.post("/login",login)
router.post("/register", register)


//ENABLE ON FIRST RUN
//router.post("/admin/register", adminRegister)


module.exports = router