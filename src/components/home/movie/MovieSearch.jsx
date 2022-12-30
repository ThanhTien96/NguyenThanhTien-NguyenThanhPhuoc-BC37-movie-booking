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
            <div className="flex justify-center block md:hidden">
                <div className="mb-3 w-80">
                    <div className="input-group relative flex items-stretch w-full mb-4">
                        <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-400 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                        <button className="btn inline-block px-6 py-1 bg-orange-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default memo(MovieSearch)