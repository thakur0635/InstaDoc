import React, { useState, useEffect } from 'react'
import Layout from './../../components/Layout'
import { useParams , useNavigate } from 'react-router-dom'
import { Form, Input, Row, Col ,TimePicker, message } from 'antd'
import { useDispatch  , useSelector} from 'react-redux'
import {showloading , hideloading} from './../../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'




const Profile = () => {
    const { user } = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFinish =async (values) => {
        try{
            dispatch(showloading())
            const res = await axios.post('/api/v1/doctor/updateProfile',{...values ,
                userId:user._id ,
                timings :[
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm")
                ]
                
            } , {
                headers :{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if(res.data.success)
            {
                message.success("Updated successfully")
                navigate("/")
            }
            
        }catch(error){
            dispatch(hideloading())
            console.log(error)
            message.error("Something went wrong")
        }
    }




    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo', {
                userId: params.id,

            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setDoctor(res.data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDoctorInfo()
    }, [])
    return (
        <Layout>
            <h1>Manage Profile</h1>
            {
                doctor && (
                    <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
                        ...doctor,
                        timings:[
                            moment(doctor.timings[0] , "HH:mm"),
                            moment(doctor.timings[1] , "HH:mm")
                        ]
                    }}>
                        <h4>Personal details :</h4>
                        <Row gutter={20}>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="First Name"
                                    name="firstName"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='First Name' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Last Name"
                                    name="lastName"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Last Name' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Phone"
                                    name="phone"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Phone no.' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Email"
                                    name="email"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Email' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Website"
                                    name="website"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Website' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Address"
                                    name="address"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Address' />
                                </Form.Item>
                            </Col>


                        </Row>
                        <h4>Professional details :</h4>
                        <Row gutter={20}>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Specialization"
                                    name="specialization"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Specialization' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Experience"
                                    name="experience"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Experience' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="FeesPerConsultation"
                                    name="feesPerConsultation"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <Input type='text' placeholder='Your fees.' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Timings"
                                    name="timings"
                                    required
                                    rules={[{
                                        required: true
                                    }]}>
                                    <TimePicker.RangePicker format="HH:mm" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <button className='btn btn-primary' type='submit' >Update</button>
                        </div>
                    </Form>
                )
            }
        </Layout>

    )
}

export default Profile