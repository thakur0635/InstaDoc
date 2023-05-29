import React , { useState , useEffect}from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Table, message } from 'antd'
import moment from 'moment'









const Appointment = () => {
    const {user} = useSelector(state => state.user)
    const [appointment , setAppointment] = useState([])

    const getAppointments = async () => {
        try{
            const res = await axios.post('/api/v1/user/user-appointments' , {userId : user?._id},{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setAppointment(res.data.data)
            }
        }
        catch(error){
            message.error("Something went wrong")
            console.log(error)
        }
        
    }
    useEffect(()=>{
        getAppointments()
    },[])

    const columns = [
        
        // {
        //     title  :"Name",
        //     dataIndex : "name",
        //     reder: (text , record) => (
        //         <span>
        //             {record.doctorId.firstName} {record.doctorId.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title  :"Phone",
        //     dataIndex : "phone",
        //     reder: (text , record) => (
        //         <span>
        //             {record.doctorInfo.phone}
        //         </span>
        //     )
        // },
        {
            title  :"Date&Time",
            dataIndex : "date",
            reder: (text , record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title : "Status",
            dataIndex : "status"
        },
    ]






  return (
    <Layout>
        <h1> Appointments</h1>
        <Table columns={columns} dataSource={appointment} />
    </Layout>
  )
}

export default Appointment