const express = require('express')
const auth = require('../middlewares/auth')
const { getAllUsersController, getAllDoctorsController  , changeAccountStatusController} = require('../controllers/adminCtrl')


const router = express.Router()



router.get('/getAllUsers' , auth , getAllUsersController)

router.get('/getAllDoctors' , auth , getAllDoctorsController)


router.post('/changeAccountStatus' , auth , changeAccountStatusController)

module.exports = router