import { Alert, Space } from 'antd';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'


const UserTemplate = () => {
    const mesSuccess = useSelector(state => state.movieManagerSlice.isAlertSuccess);
    const mesERR = useSelector(state => state.movieManagerSlice.isAlertERR);
    useEffect(() => {
        window.scrollTo(0, 0);
      })
      
    return (
        <>
            <Header/>
            <div >
                <Outlet />
                {mesSuccess || mesERR ? <Space
                direction="vertical"
                style={{
                  position: 'fixed',
                  top: 10,
                  left: '50%',
                  zIndex: 1000,
                  transform: 'translateX(-50%)',
                  width: '30%',
                }}
              >
                {mesSuccess && <Alert message={mesSuccess?.message} type="success" showIcon />}
                {mesERR && <Alert message={mesERR?.message} type="error" showIcon />}
              </Space> : ''}
            </div>

        </>
    )
}

export default UserTemplate