import React ,{useState , useEffect}from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import moment from 'moment'
import {useDispatch , useSelector} from 'react-redux'
import { showloading , hideloading} from '../redux/features/alertSlice'




const Bookingpage = () => {
    const [doctor, setDoctor] = useState([])
    const [date , setDate] = useState()
    const [time ,setTime] = useState()
    const [isAvailable , setIsAvailable] = useState()
    const params = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)

    const getDoctorDetails = async () => {
        try{
            const res = await axios.post("/api/v1/doctor/getDoctorById" , {doctorId : params.doctorId} , {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token"),
                },
            })
            if( res.data.success){
                setDoctor( res.data.data)
            }
        }
        catch(error){
            console.log(error)
        }
    }

  





    const handleBooking = async () => {
        try{
            setIsAvailable(true)
            if(!date && ! time)
                return alert("Date & time are required")
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/book-appointment' , {
                doctorId : params.doctorId,
                userId : user._id,
                doctorInfo : doctor,
                userInfo : user,
                date : date,
                time: time
            },
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideloading())
            if(res.data.success){
                message.success(res.data.message)
            }
        }
        catch(error){
            dispatch(hideloading())
            message.error('Something went wrong')
            console.log(error)
        }
    }



    const handleAvailability = async() => {
        try{
           
            if(!date && ! time)
                return alert("Date & time are required")
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/booking-availability' , 
            {doctorId : params.doctorId , date , time},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideloading())
            if(res.data.success)
            {
                setIsAvailable(true)
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
        }
        catch(error){
            dispatch(hideloading())
            message.error("Something went wrong")
            console.log(error)
        }
    }




    useEffect(() =>{
        getDoctorDetails()
    } , [])





  return (
    <Layout>
        <h2>Booking Page</h2>
        <div className="container m-2">
            {
                doctor && (
                    <div>
                        <h5>
                            Dr. {doctor.firstName} {doctor.lastName}
                        </h5>
                        <h5>
                            Fees : {doctor.feesPerConsultation}
                        </h5>
                        
                        <h5>
                            {
                                doctor.timings && (
                                    <h5>
                                        TImings : {doctor.timings[0]} - {doctor?.timings[1]}
                                    </h5>
                                )
                            }
                        </h5>
                            
                        
                        <div className="d-flex flex-column w-50">
                            <DatePicker
                            className='m-2'
                            format= "DD-MM-YYYY"
                            onChange={(value) => { 
                                setDate(moment(value).format("DD-MM-YYYY"))}}
                            />
                            <TimePicker className='m-2'
                            format= "HH:mm" onChange={(value) => {
                                setTime(moment(value).format("HH:mm"))}}
                            />
                            <button className="btn btn-primary mt-2" onClick={handleAvailability}>
                                Check Availabilty
                            </button>
                            {
                                (
                                    <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                Book Now
                            </button>
                                )
                            }
                            
                        </div>
                    </div>
                )
            }
        </div>
    </Layout>
  )
}

export default Bookingpage