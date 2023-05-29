const doctorModel = require('../models/doctor')


const getDoctorInfoController = async(req , res) => {
    try{
        const doctor = await doctorModel.findOne({userId  : req.body.userId})
        res.status(200).send({
            success : true,
            message : "Data fetched successfully",
            data : doctor
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in getting data"
        })
    }
}


const updateProfileController = async(req , res) => {
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId : req.body.userId} , req.body)
        res.status(201).send({
            success  :true,
            message : 'Updated data successfully',
            data : doctor
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in updating  data"
        })
    }
}



const getDoctorByIdController = async(req , res) => {
    try{
        const doctor = await doctorModel.findOne({_id : req.body.doctorId})
        res.status(200).send({
            success  :true,
            message : ' data  fetched successfully',
            data : doctor
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in fetching data"
        })
    }
}

module.exports = {getDoctorInfoController , updateProfileController , getDoctorByIdController}