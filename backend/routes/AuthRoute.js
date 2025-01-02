const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/AuthController")

router.post('/register',AuthController.registerUser)
router.post('/login',AuthController.loginUser)
router.post('/updatepass',AuthController.updatePassword)

module.exports = router