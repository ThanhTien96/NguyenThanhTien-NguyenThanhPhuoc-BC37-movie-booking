
import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import adminService from '../../../../services/adminService';
import { useDispatch } from 'react-redux';
import { isAlertActionERR, isAlertActionSuccess } from '../../../../redux/reducers/admin/movieManagerSlice';


const CreateAccount = (props) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDT: '',
            maNhom: 'GP00',
            maLoaiNguoiDung: '',
        },
        onSubmit: async (values) => {
            try {
                await adminService.addAccount(values);
                dispatch(isAlertActionSuccess({ message: 'Thêm Tài Khoản Thành Công!' }));
                await setTimeout(() => {
                    dispatch(isAlertActionSuccess(null));
                }, 500);
                navigate('/admin/account')
            } catch (err) {
                dispatch(isAlertActionERR({ message: err.response.data.content }));
                await setTimeout(() => {
                    dispatch(isAlertActionERR(null));
                }, 1000)
            }
        }
    })


    const handleChangeSelect = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    };

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
                <h3 className='text-orange-600 mb-10'>Thêm Tài Khoản</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Tài Khoản">
                    <Input name='taiKhoan' onChange={formik.handleChange} placeholder='Nhập tài khoản' />
                </Form.Item>

                <Form.Item label="Mật Khẩu">
                    <Input.Password
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        onChange={formik.handleChange}
                        placeholder = 'Nhập mật khẩu'
                        name='matKhau'
                    />
                </Form.Item>

                <Form.Item label="Họ Tên">
                    <Input name='hoTen' onChange={formik.handleChange} placeholder='Nhập họ tên'/>
                </Form.Item>

                <Form.Item label="Email">
                    <Input type='email' name='email' onChange={formik.handleChange} placeholder='Nhập Email' />
                </Form.Item>

                <Form.Item label="Số Điện Thoại">
                    <Input name='soDT' onChange={formik.handleChange} placeholder='Nhập số điện thoại' />
                </Form.Item>

                <Form.Item label="Loại Người Dùng">
                    <Select options={[{ value: 'KhachHang', label: 'Khách Hàng' }, { value: 'QuanTri', label: 'Quản Trị' }]}
                        onChange={handleChangeSelect}
                        placeholder='Chọn loại người dùng'
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <button className='px-5 py-2 bg-orange-500 border-transparent text-white cursor-pointer rounded-md' type='submit'>Tạo Tài Khoản</button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateAccount;