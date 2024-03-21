import React from 'react'
import { Link } from 'react-router-dom'

import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> <a href='/'style={{color:"#f3f3f5"}}>Urunan</a>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
     
          
        <ul className='sidebar-list'>
            
            <li className='sidebar-list-item'style={{color:"#f3f3f5"}}>
                <a href="/admin/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'style={{color:"#f3f3f5"}}>
             
             <Link to='/admin/productform' > 
          <BsFillArchiveFill className='icon'/> Products Form
          </Link>
   
             </li>

            <li className='sidebar-list-item'style={{color:"#f3f3f5"}}>
             
            <Link to='/admin/productlist' > 
         <BsFillArchiveFill className='icon'/> Products List
         </Link>
  
            </li>
          

            
            <li className='sidebar-list-item'style={{color:"#f3f3f5"}}>
             <a href="/admin/parts">
                    <BsFillGrid3X3GapFill className='icon'/> Parts List
                </a>
            </li>
            <li className='sidebar-list-item'style={{color:"#f3f3f5"}}>
            <Link to='/admin/users' > 
                    <BsPeopleFill className='icon'/> Users
               </Link>
            </li>
            <li className='sidebar-list-item'style={{color:"#f3f3f5"}}>
                <a href="/admin/order">
                    <BsMenuButtonWideFill className='icon'/> Orders
                </a>

            </li>
            {/* <li className='sidebar-list-item'>
                <a href="/admin/payment">
                    <BsMenuButtonWideFill className='icon'/> payment
                </a>
            </li> */}
            
            
        </ul>
    </aside>
  )
}

export default Sidebar
