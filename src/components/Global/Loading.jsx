import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Loading.module.css'

const Loading = () => {

    let isLoading = useSelector(state => state.bookingSlice.isLoading)

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <img src={require('../../assets/image/loadingImg/Colorful-Circle-Preloader.gif')} alt="" />
            </div>
        )
    }else{
        return '';
    }
}

export default Loading