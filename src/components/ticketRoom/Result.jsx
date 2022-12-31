import React from 'react';
import styles from './Result.module.css';
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiBookingTickets, setChairSelectedListAction} from '../../redux/reducers/booking/bookingSlice';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { ThongTinDatVe } from '../../util/thongTinDatVe';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Result = (props) => {

    // use selector lay du lieu tu store
    const chairSelectedList = useSelector(state => state.bookingSlice.chairSelectedList);
    const navigate = useNavigate();
    // use dispath hook
    const dispatch = useDispatch();


    const { item } = props;

    return (
        <div>
            <div className={styles.result}>
                <h1 className='text-center text-red-500 py-3 font-semibold text-1xl'>{
                    chairSelectedList.length > (12 / 12 - 1) ?
                        chairSelectedList.reduce((tt, item) => {
                            return tt += item.giaVe;
                        }, 0).toLocaleString() + ' VNĐ' : null
                } </h1>
                <div className='flex py-3' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                    <h3 className='md:text-lg font-normal'>Tên Phim:</h3>
                    <h3 className='text-green-400 ml-5 md:text-lg'>{item?.tenPhim}</h3>
                </div>
                <div className='flex py-3' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                    <h3 className='md:text-lg font-normal'>Cụm Rạp:</h3>
                    <h3 className='text-green-400 ml-5 md:text-lg'>{item?.tenCumRap}</h3>
                </div>

                <div className='flex py-3' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                    <h3 className='md:text-lg font-normal'>Địa chỉ:</h3>
                    <h3 className='text-green-400 ml-5 md:text-lg'>{item?.diaChi}</h3>
                </div>

                <div className='flex py-3' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                    <h3 className='md:text-lg font-normal'>Rạp:</h3>
                    <h3 className='text-green-400 ml-5 md:text-lg'>{item?.tenRap}</h3>
                </div>

                <div className='flex py-3' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                    <h3 className='md:text-lg font-normal'>Ngày giờ chiếu:</h3>
                    <h3 className='text-green-400 ml-5 md:text-lg'>{item?.gioChieu} ~ {item?.ngayChieu}</h3>
                </div>
                <div className='pt-2'>
                    <h3 className='md:text-lg font-normal mb-3'>Danh sách ghế đã chọn: </h3>
                    {chairSelectedList.map((chair) => {
                        return (
                            <button key={chair.maGhe} className='md:m-2 md:px-4 px-2 py-1'>
                                <span className={styles.selectedChair}>Ghế: {chair.tenGhe}
                                    <RiCloseFill
                                        onClick={() => {
                                            dispatch(setChairSelectedListAction(chair))
                                        }}
                                        className={styles.removeChair} /></span>
                                <span>Mã: {chair.maGhe}</span>
                                <p>Giá: {(chair.giaVe).toLocaleString()} VNĐ</p>
                            </button>
                        )
                    })}
                </div>

            </div>

            <div className='text-center md:ml-10'>
                <button
                    onClick={async () => {
                        try {
                            const thongTinVe = new ThongTinDatVe();
                            thongTinVe.maLichChieu = props.params.id;
                            thongTinVe.danhSachVe = chairSelectedList;

                            await dispatch(fetchApiBookingTickets(thongTinVe));

                            Swal.fire({
                                title: 'Đặt Vé Thành Công',
                                text: "Kiểm tra lịch sử đặt vé",
                                icon: 'success',
                                confirmButtonText: 'Đồng Ý'
                            }).then(result => {
                                navigate('/user');
                            })

                        } catch (err) {
                            console.log(err);
                        }

                    }}
                    className={styles.resultPay}>Thanh Toán</button>
            </div>

            <div className='flex justify-around mt-5 lg:mt-10'>

                <div>
                    <button className={styles.chair}></button>
                    <p>Ghế Trống</p>
                </div>
                <div>
                    <button className={clsx(styles.chair, styles.chairVip)}>Vip</button>
                    <p>Ghế Vip</p>
                </div>
                <div>
                    <button className={clsx(styles.chair, styles.booking)}><SmileOutlined style={{ fontSize: '18px', color: 'white' }} /></button>
                    <p>Ghế Đang Chọn</p>
                </div>
                <div>
                    <button className={clsx(styles.chair, styles.booked)}> <UserOutlined /></button>
                    <p>Ghế Đã Đặt</p>
                </div>

            </div>
        </div>
    )
}

export default Result