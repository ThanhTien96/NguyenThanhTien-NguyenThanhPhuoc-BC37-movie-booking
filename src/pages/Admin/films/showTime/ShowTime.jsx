import React, { useEffect, useState } from 'react';
import { Form, DatePicker, InputNumber, Select } from 'antd';
import adminService from '../../../../services/adminService';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { fetchApiMoviesList } from '../../../../redux/reducers/admin/movieManagerSlice';
import * as Yup from 'yup';


const ShowTime = (props) => {

    const params = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            maPhim: params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        validationSchema: Yup.object({
            ngayChieuGioChieu: Yup.string().required('* Vui lòng chọn ngày khởi chiếu !'),
            maRap: Yup.string().required('* Vui lòng chọn rạp !'),
            giaVe: Yup.string().required('* Vui lòng nhập giá vé !'),
        }),
        onSubmit: async (value) => {
            try{
                dispatch(fetchApiMoviesList());

                await adminService.createScheduleApi(value);
                
                navigate('/admin');
                
            }catch(err){
                console.log(err);
            }
        }
    })

    const [state, setState] = useState({
        cinemaSystem: [],
        cinemaSchedule: [],
    });

    

    const fetchApiCinemaSystem = async () => {
        try {
            const res = await adminService.getApiCinemaSystem();
            

            setState({
                ...state,
                cinemaSystem: res.data.content,
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect( () => {
        fetchApiCinemaSystem();
    }, [])

    

    const handleChangeCinemaSystem = async (value) => {
        try{
            const res = await adminService.getApiCinemaSchedule(value);
            setState({
                ...state,
                cinemaSchedule: res.data.content
            });
        }catch(err){
            console.log(err);
        }
    };

    const handleChangeCinemaSchedule = (value) => {
        formik.setFieldValue('maRap', value)
    };

    const onOk = (value) => {
        let date = moment(value?.$d).format('DD/MM/YYYY hh:mm:ss');
        formik.setFieldValue('ngayChieuGioChieu', date);
    };

    const onChangeDatePicker = (value) => {
        let date = moment(value?.$d).format('DD/MM/YYYY hh:mm:ss');
        formik.setFieldValue('ngayChieuGioChieu', date);
    };

    const onchangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value);
    }

    let imgSrc = '';

    if(localStorage.getItem('filmParams')){
        imgSrc = localStorage.getItem('filmParams');
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                initialValues={{
                    remember: true,
                }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className='text-orange-600 text-xl mb-5 md:mb-10'>Tạo lịch chiếu phim - <span className='text-green-700'>{params.tenphim}</span></h3>
                
                <img className='mb-5' src={imgSrc} alt="..." width={200} />
                
                <Form.Item label="Hệ Thống Rạp">
                    <Select options={state.cinemaSystem?.map((cinema, index) =>({label:cinema.tenHeThongRap, value:cinema.maHeThongRap}))} 
                    onChange={handleChangeCinemaSystem} 
                    placeholder="Chọn Hệ Thống Rạp" />
                </Form.Item>

                <Form.Item label="Cụm Rạp">
                    <Select options={state.cinemaSchedule?.map((cinema, index) =>({label:cinema.tenCumRap, value:cinema.maCumRap}))}
                    onChange={handleChangeCinemaSchedule}  
                    placeholder="Chọn Cụm Rạp" />
                    {formik.errors.maRap && formik.touched.maRap && (<p className='text-red-700 mt-1'>{formik.errors.maRap}</p>)}
                </Form.Item>

                <Form.Item label="Ngày Giờ Chiếu">
                    <DatePicker format='DD/MM/YY hh:mm:ss' showTime onChange={onChangeDatePicker} onOk={onOk} />
                    {formik.errors.ngayChieuGioChieu && formik.touched.ngayChieuGioChieu && (<p className='text-red-700 mt-1'>{formik.errors.ngayChieuGioChieu}</p>)}
                </Form.Item>

                <Form.Item label="Giá Vé">
                    <InputNumber onChange={onchangeInputNumber} min={75000} max={150000} />
                    {formik.errors.giaVe && formik.touched.giaVe && (<p className='text-red-700 mt-1'>{formik.errors.giaVe}</p>)}
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <button className='hover:bg-orange-800 transition duration-300 px-5 py-2 bg-orange-500 border-transparent text-white cursor-pointer rounded-md' type='submit'>Thêm Phim</button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ShowTime