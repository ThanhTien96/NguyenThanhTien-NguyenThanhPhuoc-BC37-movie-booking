import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChairList from '../../components/ticketRoom/ChairList';
import Result from '../../components/ticketRoom/Result';
import { fetchApiTicketRoom } from '../../redux/reducers/booking/bookingSlice';
import styles from './TicketRoom.module.css'

const TicketRoom = (props) => {
    // dùng hook use params để lấy id từ url
    const params = useParams();

    // tạo hook use dispatch để dispatch action
    const dispatch = useDispatch();

    //call api với mảng dependencies để theo dõi thay đổi của useParams
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        const action = fetchApiTicketRoom(params.id);
        dispatch(action)
    }, [params]);

    //get dữ liệu từ store về
    const { thongTinPhim, danhSachGhe } = useSelector(state => state.bookingSlice.ticketRoom);

    return (
        <div className={styles.ticketRoom}>
            <div className='container mx-auto'>
                <Row>
                    <Col className='margin-auto' span={24} lg={14}>
                        <h5 className='text-white text-center text-2xl font-semibold'>screen</h5>
                        <div className={styles.screen}></div>

                        <ChairList chair={danhSachGhe} />
                    </Col>

                    <Col className='mt-10' span={24} lg={9}>
                        <Result params={params} item={thongTinPhim} />
                    </Col>
                </Row>


            </div>
        </div>
    )
}

export default TicketRoom