
import { useState } from 'react'
import './Admin.css'

import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'
import AdminHome from './AdminHome'
import { Route, Routes } from 'react-router-dom'

import User from '../Admin/User'
// import Order from './Order'
import TotalProducts from './TotalProducts'
import TotalParts from './TotalParts'
import TotalOrders from './TotalOrders'
function AdminApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      {/* <AdminNavbar OpenSidebar={OpenSidebar} /> */}


      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Routes>


       
        <Route path='/admin/totalproducts' element={<TotalProducts />} />
       
        <Route path='/admin/totalparts' element={<TotalParts />} />
        <Route path='/admin/totalorders' element={<TotalOrders />} />


      </Routes>

      <AdminHome />
    </div>
  )
}

export default AdminApp