import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../feature/authslice/authSlice'

function Logoutbtn() {
    const dispatch = useDispatch();
    const handleLogoutClick = () => {
        authService.logOut().then(() => {
            dispatch(logout());
        }).catch(error=>console.log(error))
     }
  return (
      <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'onClick={handleLogoutClick}>
       Logout   
</button>
  )
}

export default Logoutbtn