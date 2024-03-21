import React from 'react';
// import { Link } from 'react-router-dom';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'



function AdminNavbar({OpenSidebar}) {
  return (
    <>
    
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>

        <a href="/" className='sec-btn'>
                   Back To Home
                </a>
   {/* <Link to='/'  >  <div className='header-right'>
        <button className='sec-btn' >Back to home</button> 
           
        </div>
        </Link>  */}
    </header>
    </>
  )
}

export default AdminNavbar