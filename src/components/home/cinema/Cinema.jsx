import { Col, Row, Tabs, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bookingServices } from '../../../services/bookingServiecs';
import { truncateText } from '../../../util';
import './Cinema.css';


const Cinema = () => {

    const movieSchedule = useSelector(state => state.bookingSlice.cinemaSystem);
    const [listSchedule, setListSchedule] = useState([]);


    useEffect(() => {

        bookingServices.getScheduleMovieCinema('BHDStar').then(res => {
            setListSchedule(res.data.content[0]);
        });

    }, []);

    return (
        <div id='cumRap' className='container mx-auto px-0 md:px-5 lg:px-40 pt-10 md:pt-32'>
            <Tabs className='border border-solid border-gray-300'
                onChange={(key) => {

                    bookingServices.getScheduleMovieCinema(key).then(res => {
                        setListSchedule(res.data.content[0])
                    })
                }}
                tabPosition='left'
                items={movieSchedule?.map((heThongRap) => {
                    return (
                        {
                            label: <div className='logoRap'><img className="w-10 " src={heThongRap.logo} alt='...' /></div>,
                            key: heThongRap.maHeThongRap,
                            children: <Tabs className='tabScrollbar'

                                tabPosition='left'
                                items={listSchedule.lstCumRap?.map(rap => {
                                    return {
                                        label: <div className='cinemaName'>
                                            <h3 className='font-medium p-0 text-green-700'>{truncateText(rap.tenCumRap, 30)}</h3>
                                            <p className='font-medium text-gray-500 mb-2'>{truncateText(rap.diaChi, 35)}</p>
                                            <Tag color='red' > xem chi tiết</Tag>
                                        </div>,
                                        key: rap.maCumRap,
                                        children: <div className='ml-1 lg:ml-5'>
                                            {rap.danhSachPhim?.map(dsPhim => {
                                                return (
                                                    <Row key={dsPhim.maPhim} className='lichChieuPhim w-40 lg:w-full'>
                                                        <Col span={24} sm={24} lg={6} className="w-20 lg:w-40">
                                                            <img className='w-full object-cover block' src={dsPhim.hinhAnh} alt="..."
                                                                onError={() => { }}
                                                            />
                                                        </Col>
                                                        <Col span={24} sm={24} lg={17} className='ml-3 mt-3 md:mt-0'>
                                                            <div className="lg:flex lg:items-center">
                                                                <span className='hidden md:block mr-3 px-3 py-1 rounded-md font-semibold bg-orange-600 text-white'>C18</span>
                                                                <p className='text-sm lg:text-lg font-semibold'>{dsPhim.tenPhim}</p>
                                                            </div>
                                                            {dsPhim.lstLichChieuTheoPhim.splice(0, 4).map((lichChieu, index) => {
                                                                /// tạm thời chỉ render 6 element do api chung

                                                                return (
                                                                    <div key={index} className='inline-block w-48'>
                                                                        <NavLink to={`/ticketroom/${lichChieu.maLichChieu}`}>
                                                                            <button className='py-4 px-4 border border-solid border-gray-300 rounded-md cursor-pointer hover:border-gray-500 hover:bg-slate-200 transition-all mt-4 mr-4' >
                                                                                <span className='font-semibold text-green-700 text-md'>{moment(lichChieu.ngayChieuGioChieu).format('DD-MM-YYYY')}</span> ~ <span className='text-orange-500 font-semibold text-md'>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm a')}</span>
                                                                            </button>
                                                                        </NavLink>
                                                                    </div>
                                                                )

                                                            })}
                                                        </Col>
                                                    </Row>
                                                )
                                            })}
                                        </div>
                                    }
                                })}

                            />
                        }
                    )
                })} />
        </div>
    )
}

export default Cinema









