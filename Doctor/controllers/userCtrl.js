const userModel = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require("../models/doctor")


const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ success: false, message: "User already exists" })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({
            success: true,
            message: "Registered successfully"
        })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }

}



const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (!user)
            return res.status(200).send({ success: false, message: "User doesn't exists" })

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch)
            return res.status(200).send({ success: false, message: "Invalid email or password" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).send({ success: true, message: "Login Success", token })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }

}





const authcontroller = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userID })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Auth failed"
            })
        }
        user.password = undefined
        res.status(200).send({
            success: true,
            data: user

        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "auth error",
            error
        })
    }
}



const applyDoctorcontroller = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' })
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for new doctor position`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: "/admin/doctors"
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send({
            success: true,
            message: "Doctor account applied Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Failed to apply for doctor"
        })
    }
}

const getAllNotificationcontroller = async (req , res) =>{
    try{
        const user = await userModel.findOne({_id : req.body.userId})
        const seenNotification = user.seenNotification
        const notification = user.notification
        seenNotification.push(...notification)
        user.notification = []
        user.seenNotification = seenNotification
        const updateUser = await user.save()
        res.status(200).send({
            success : true,
            message : 'All notifications marked as read',
            data : updateUser
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error in notification',
            error
        })
    }
}


const deleteAllNotificationcontroller = async(req , res) =>{
    try{
        const user = await userModel.findOne({_id : req.body.userId})
        user.seenNotification =[]
        user.notification = []
        await user.save()
        res.status(200).send({
            success : true,
            message : 'All notifications deleted successfully',
            data : user
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error in deleting notification',
            error
        })
    }
}


module.exports = { loginController, registerController, authcontroller, applyDoctorcontroller , getAllNotificationcontroller , deleteAllNotificationcontroller }