import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import moment from 'moment/moment';
import React, { memo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { bookingServices } from '../../../services/bookingServiecs';

const MovieSearch = () => {

    const [cinemaSystem, setCinemaSystem] = useState(null);
    const [lichChieu, setLichChieu] = useState({});
    const [maLich, setMaLich] = useState(0)
    const movieList = useSelector(state => state.bookingSlice.movies);

    return (
        <div >
            <div className='z-10 container lg:px-40 hidden md:block absolute -top-8 text-center' style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <form className='bg-white rounded-md py-8 shadow-xl'>
                    <Select
                        
                        labelInValue
                        onChange={(e) => {
                            bookingServices.getCinemaSystemSelect(e.value).then(res => {
                                setCinemaSystem(res.data.content);
                            })
                        }}
                        placeholder='Phim'
                        style={{
                            width: "25%",
                        }}
                        options={movieList?.map(item => {
                            return {
                                value: item.maPhim,
                                label: item.tenPhim,
                            }
                        })}
                    />

                    <span className='text-lg font-extralight text-gray-400'> | </span>

                    <Select
                        onChange={(e) => {
                            cinemaSystem?.heThongRapChieu.forEach(heThongRap => {
                                const lich = heThongRap.cumRapChieu.filter(ele => ele.maCumRap === e);
                                setLichChieu(lich);
                            })
                        }}
                        style={{
                            width: "25%",
                        }}
                        placeholder='Rap'>
                        {cinemaSystem?.heThongRapChieu.map(heThongRap => {
                            return heThongRap.cumRapChieu.map((rap) => {
                                return (
                                    <Select.Option
                                        key={rap.maCumRap} value={rap.maCumRap} >{rap.tenCumRap}</Select.Option>
                                )
                            })
                        })}
                    </Select>

                    <span className='text-lg font-extralight text-gray-400'> | </span>

                    <Select
                        onChange={(e) => {
                            setMaLich(e);  
                        }}
                        style={{
                            width: "25%",
                        }}
                        placeholder='Ngày Giờ Chiếu'
                        options={lichChieu[0]?.lichChieuPhim.map(ele => {
                            return {
                                value: ele.maLichChieu,
                                label: moment(ele.ngayChieuGioChieu).format('DD/MM/YYYY ~ h:mm'),
                            }
                        })}
                    />

                    <NavLink to={`/ticketroom/${maLich}`}>
                        <button className='bg-orange-500 hover:bg-orange-700 text-white border-none py-3 px-6 ml-5 cursor-pointer transition-all' >Mua Vé Ngay</button>
                    </NavLink>
                </form>
            </div>

        </div>
    )
}

export default memo(MovieSearch)