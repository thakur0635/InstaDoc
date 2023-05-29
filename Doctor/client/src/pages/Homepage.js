import React ,{useEffect , useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row} from 'antd'
import DoctorList from '../components/DoctorList'




const Homepage = () => {
    const [doctors, setDoctors] = useState([])
    const getUserData = async () => {
        try{
            const res = await axios.post("/api/v1/user/getAllDoctors" , {} , {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token"),
                },
            })
            if( res.data.success){
                setDoctors( res.data.data)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getUserData()
    } , [])
    return (
        <div>
            <Layout>
            <h1 className='text-center'>HomePage</h1>
            <Row>
                {
                    doctors && doctors.map( doctor => (
                        <DoctorList doctor = {doctor} />
                    )

                    )
                }
            </Row>
            </Layout>
            
        </div>
    )
}

export default Homepage