import React from 'react'
import "../styles/LayoutStyles.css"
import { adminMenu, userMenu } from '../Data/Data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, message } from 'antd'
const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    



    const doctorMenu = [
        {
            name : "Home",
            path : "/",
            icon : "fa-sharp fa-solid fa-house"
        },
        {
            name : "Appointments",
            path : "/appointments",
            icon : "fa-solid fa-list"
        },
        
        {
            name : "Profile",
            path : `/doctor/profile/${user?._id}`,
            icon : "fa-solid fa-user"
        },
        
    ]





    const location = useLocation()

    const handleLogout = () => {
        localStorage.clear()
        message.success("Logged out successfully")
        navigate("/login")
    }
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Doc-App</h6>
                            <hr />
                        </div>
                        <div className="menu">{SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && 'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>

                                </>
                            )
                        })}</div>
                        <div className={`menu-item`} onClick={handleLogout} >
                            <i className="fa-solid fa-right-from-bracket"  ></i>
                            <Link to='/login'>Logout</Link>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content" >
                                <Badge count={user?.notification.length}>
                                <i className="fa-solid fa-bell"onClick= {() => {
                                navigate('/notification')
                            }} style={{cursor : 'pointer'}}></i>
                                </Badge>

                                <Link to='/profile'>{user?.name}</Link>
                            </div>

                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Layout