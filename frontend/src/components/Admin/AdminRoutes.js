import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminRoutes({children}) {
    const user=JSON.parse(localStorage.getItem("user"))
    const role=user?user.role:""
  
  return role == "admin"?children:<Navigate to="/"/>
}

export default AdminRoutes