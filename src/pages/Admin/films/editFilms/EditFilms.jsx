import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { editFilmApi, fetchApiFilmDetail } from '../../../../redux/reducers/admin/movieManagerSlice';
import { maNhom } from '../../../../util/apiPath';
import { useNavigate, useParams } from 'react-router-dom';

const EditFilms = (props) => {

    const { filmDetail } = useSelector(state => state.movieManagerSlice);

    const [imgSrc, setImgSrc] = useState('');

    const params = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const id = params.id;
        dispatch(fetchApiFilmDetail(id));
    }, [params]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: filmDetail?.maPhim,
            tenPhim: filmDetail?.tenPhim,
            trailer: filmDetail?.trailer,
            moTa: filmDetail?.moTa,
            maNhom: maNhom.NHOM,
            ngayKhoiChieu: filmDetail?.ngayKhoiChieu,
            sapChieu: filmDetail?.sapChieu,
            dangChieu: filmDetail?.dangChieu,
            hot: filmDetail?.hot,
            danhGia: filmDetail?.danhGia,
            hinhAnh: null,

        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            try {

                await dispatch(editFilmApi(formData));
                
                navigate('/admin');
            } catch (err) {
                console.log(err);
            }

        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value?.$d).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    };

    // hàm tạo giá trị cho radio 
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };

    //hàm lấy giá trị đánh giá
    const handleChangeInputNumber = (name) => {
        return (value) => { formik.setFieldValue('danhGia', value) };
    };

    // hàm thêm hình ảnh
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        // luu vao formik
        await formik.setFieldValue('hinhAnh', file);
        if (file.type === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
        };

    }

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 className='text-orange-600 mb-10'>Thêm Phim</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên Phim">
                    <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>

                <Form.Item label="Mô Tả">
                    <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>

                <Form.Item label="Ngày Khởi Chiếu">
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} defaultValue={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>

                <Form.Item label="Sắp Chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.ngayKhoiChieu} />
                </Form.Item>

                <Form.Item label="Đang Chiếu">
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.ngayKhoiChieu} />
                </Form.Item>

                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.ngayKhoiChieu} />
                </Form.Item>

                <Form.Item label="Đánh Giá">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hình Ảnh">
                    <input type='file' onChange={handleChangeFile} accept="image/png, image/jpg, image/jpeg, image/gif" />

                    <img className='mt-5' src={imgSrc === '' ? filmDetail?.hinhAnh : imgSrc} alt="..." style={{ width: '200px' }} />

                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <button className='px-5 py-2 bg-orange-500 border-transparent text-white cursor-pointer rounded-md' type='submit'>Cập Nhật</button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditFilms