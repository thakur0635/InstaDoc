const express = require('express')
const { loginController, registerController, authcontroller, applyDoctorcontroller, getAllNotificationcontroller, deleteAllNotificationcontroller, getALLDoctorsController, bookAppointmentController, bookingAvailabilityController,userAppointmentController } = require('../controllers/userCtrl')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/getUserData', auth, authcontroller)

router.post('/apply-doctor', auth, applyDoctorcontroller)

router.post('/get-all-notification', auth, getAllNotificationcontroller)

router.post('/delete-all-notification', auth, deleteAllNotificationcontroller)

router.post('/getAllDoctors', auth, getALLDoctorsController)

router.post('/book-appointment', auth, bookAppointmentController)

router.post('/booking-availability', auth, bookingAvailabilityController)

router.post('/user-appointments' ,auth , userAppointmentController)

module.exports = router