import clsx from 'clsx';
import React from 'react';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector} from 'react-redux';
import { setChairSelectedListAction } from '../../redux/reducers/booking/bookingSlice';
import './Chair.css';

const Chair = (props) => {
    
    const dispatch = useDispatch()
    const chairSelectedList = useSelector(state => state.bookingSlice.chairSelectedList)

    const { chairItem } = props;
    return (
        <button
            onClick={() => {
                dispatch(setChairSelectedListAction(chairItem))
            }}
            disabled={chairItem.daDat}
            className={clsx('chair', {
                booked: chairItem.daDat,
                chairVip: chairItem.loaiGhe === 'Vip',
                booking: chairSelectedList.find(ele => ele.tenGhe === chairItem.tenGhe),

            })}
        >{chairItem.daDat ? <UserOutlined /> : chairItem?.tenGhe 
        && chairSelectedList.find(ele => ele.tenGhe === chairItem.tenGhe) 
        ? <SmileOutlined style={{fontSize: '18px', color: 'white'}} /> : chairItem?.tenGhe 
        && chairItem.loaiGhe === 'Vip' ? 'Vip'  : chairItem?.tenGhe
        }</button>
    )
}

export default Chair