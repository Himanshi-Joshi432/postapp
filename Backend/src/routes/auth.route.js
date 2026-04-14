const express = require('express');
const registerController = require('../controllers/register.controller')
const router = express.Router();

router.post('/register',registerController.register)

router.get('/test',(req,res)=>{
    res.json({
        message:"test route",
        cookies:req.cookies
    })
})

module.exports = router;