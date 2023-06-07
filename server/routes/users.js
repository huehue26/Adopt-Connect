const express=require('express');
const passport=require('passport');
const router=express.Router();

const userController=require('../controllers/user_controller');

router.get('/signupadmin',userController.signupadmin);


router.get('/Sign-In',userController.signIn);
router.get('/sign-out',userController.DestroySession);
router.get('/admin/signin',userController.AdminSignIn);
// router.get('/users/Sign-In',userController.AdminsignIn);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
router.post('/update',userController.update);
router.get('/profile',userController.profile);
router.post('/createSession',passport.authenticate(
    'local',//local passport session is used
    {failureRedirect:'/users/Sign-In'},
),userController.createSession)


//get logged in user
router.get('/loggedin_user',userController.getLoggedInUser);

//get worker details
router.get('/getworker',userController.getWorkerbyId);
// router.get('/getmanager',userController.getManagerbyId);

module.exports=router;