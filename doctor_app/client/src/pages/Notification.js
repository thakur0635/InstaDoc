import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useSelector , useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { showloading , hideloading} from '../redux/features/alertSlice'
import axios from 'axios'



const Notification = () => {



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)




    const handleMarkAllRead = async() =>{
        try{
            dispatch(showloading())
        const res = await axios.post('/api/v1/user/get-all-notification' , {
            userId : user._id
        },{
            headers:{
                Authorization : `Bearer ${localStorage.getItem("token")} `
            }
        })
        dispatch(hideloading())
        if(res.data.success){
            message.success(res.data.message)
            window.location.reload()
        }
        else{
            message.error(res.data.message)
        }
    }
        catch(error){
            dispatch(hideloading())
            message.error('Something went wrong')
        }
    }




    const handleDeleteAllRead = async() =>{
        try{
            dispatch(showloading())
            const res = await axios.post('/api/v1/user/delete-all-notification', {
                userId : user._id
            },{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")} `
                }
            })
            dispatch(hideloading())
        if(res.data.success){
            message.success(res.data.message)
            window.location.reload()
        }
        else{
            message.error(res.data.message)
        }
        }
        catch(error){
            dispatch(hideloading())
            message.error('Something Went wrong')
        }
    }



  return (
    <Layout>
        <h2 className='p-3 text-center'>Notification</h2>
        <Tabs>
            <Tabs.TabPane tab = 'unRead' key={0}>
                <div className="d-flex justify-content-end"  >
                    <h5 className='p-2 text-primary' onClick={handleMarkAllRead} style={{cursor : 'pointer'}}>Mark as read</h5>
                </div>
                {
                    user?.notification.map(notificationMsg => (
                        <div className="card"  style={{cursor : 'pointer'}} >
                            <div className="card-text">
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab = 'Read' key={1}>
                <div className="d-flex justify-content-end">
                    <h5 className='p-2 text-primary' onClick={handleDeleteAllRead} style={{cursor : 'pointer'}}>Delete all read</h5>
                    
                </div>
                {
                    user?.seenNotification.map(notificationMsg => (
                        <div className="card"  style={{cursor : 'pointer'}} >
                            <div className="card-text">
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            
        </Tabs>
    </Layout>
    
  )
}

export default Notification