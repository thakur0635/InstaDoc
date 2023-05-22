
import React from 'react'
import Layout from '../components/Layout'
import { Form, Input, Row, Col ,TimePicker, message } from 'antd'
import { useDispatch  , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {showloading , hideloading} from '../redux/features/alertSlice'
import axios from 'axios'


const ApplyDoctor = () => {
    const {user}  = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish =async (values) => {
        try{
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id} , {
                headers :{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideloading())
            if(res.data.success)
            {
                message.success("Applied successfully")
                navigate("/")
            }
            else{
                message.error(res.data.message)
                navigate("/login")
            }
        }catch(error){
            dispatch(hideloading())
            console.log(error)
            message.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <h1 className='tex-center'>ApplyDoctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
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
                            <TimePicker.RangePicker format= "HH:mm"/>
                        </Form.Item>
                    </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className='btn btn-primary' type='submit' >Submit</button>
                    </div>
            </Form>
        </Layout>



    )
}

export default ApplyDoctor