const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', [check('email').isEmail().withMessage("please enter a valid email..."),
    check('password').isLength({min: 5}).withMessage("password must be at least 5 characters long"),
    check('confirmPassword').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error("Passwords have to match");
        }
        return true;
    })
], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
