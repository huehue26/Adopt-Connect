const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const adoptionFlowController=require('../controllers/adoption_controller');

//for major tasks
router.post('/major/create',adoptionFlowController.createMajorTask);
router.delete('/major/delete',adoptionFlowController.deleteMajorTask);
router.post('/major/update',adoptionFlowController.updateMajorTask);

// for minor tasks
router.post('/minor/create',adoptionFlowController.createMinorTask);
router.delete('/minor/delete',adoptionFlowController.deleteMinorTask);
router.post('/minor/update',adoptionFlowController.updateMinorTask);

module.exports=router;
