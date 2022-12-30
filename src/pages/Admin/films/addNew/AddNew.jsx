import React, { useState } from 'react';
import {

    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AddMovieApi } from '../../../../redux/reducers/admin/movieManagerSlice';
import { maNhom } from '../../../../util/apiPath';
import { useNavigate } from 'react-router-dom';

const AddNew = (props) => {

    const [imgSrc, setImgSrc] = useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            maNhom: maNhom.NHOM,
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},

        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }

            try{
                await dispatch(AddMovieApi(formData));

                navigate('/admin');

            } catch(err) {
                console.log(err);
            }

        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
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
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
        };
        // luu vao formik
        formik.setFieldValue('hinhAnh', file);
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
                    <Input name='tenPhim' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Mô Tả">
                    <Input name='moTa' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Ngày Khởi Chiếu">
                    <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
                </Form.Item>

                <Form.Item label="Sắp Chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>

                <Form.Item label="Đang Chiếu">
                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>

                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} />
                </Form.Item>

                <Form.Item label="Đánh Giá">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                </Form.Item>

                <Form.Item label="Hình Ảnh">
                    <input type='file' onChange={handleChangeFile} accept="image/png, image/jpg, image/jpeg, image/gif" />

                    {imgSrc && <img className='mt-5' src={imgSrc} alt="..." style={{ width: '200px' }} />}

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
    );
}

export default AddNew