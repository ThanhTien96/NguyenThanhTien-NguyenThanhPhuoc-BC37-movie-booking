import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AppRoute({ path, component: Comp,isPrivate, isAuth,isAdmin}) {

    const profile = useSelector(state => state.userSlice.userLogin);

    const token = localStorage.getItem('TOKEN');
    if(isPrivate){
      if(token) return <Comp />
      return <Navigate to='/user/login' replace />
    }
    
    if(isAuth) {
      if(!profile) return <Comp /> 
      return <Navigate to='/' replace />
    }

    if(isAdmin) {
      if(profile){
        if(profile.maLoaiNguoiDung === "QuanTri"){
          return <Comp />
        }else{
          return <Navigate to='/' replace />
        }
      }else{
        return <Navigate to='/user/login' replace />
      }
    }

    return <Comp />

}

export default AppRoute