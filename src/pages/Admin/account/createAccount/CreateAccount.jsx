
import React, { useState } from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import adminService from '../../../../services/adminService';
import { useDispatch } from 'react-redux';
import { isAlertActionERR, isAlertActionSuccess } from '../../../../redux/reducers/admin/movieManagerSlice';
import * as Yup from 'yup';

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
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('* Vui lòng nhập tài khoản !'),
            matKhau: Yup.string().required('* Vui long nhập mật khẩu !'),
            hoTen: Yup.string().required('* Vui lòng nhập họ và tên !'),
            email: Yup.string().required('* Vui lòng nhập email !').email('* Không đúng định dạng email !'),
            soDT: Yup.string().required('* Vui lòng nhập số điện thoại !').matches(/^[0-9]+$/, '* Số điện thoại chỉ nhập số 0-9'),
            maLoaiNguoiDung: Yup.string().required('* Vui lòng chọn loại người dùng !'),
        }),
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
                    {formik.errors.taiKhoan && formik.touched.taiKhoan && (<p className='text-red-700 mt-1'>{formik.errors.taiKhoan}</p>)}
                </Form.Item>

                <Form.Item label="Mật Khẩu">
                    <Input.Password
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        onChange={formik.handleChange}
                        placeholder='Nhập mật khẩu'
                        name='matKhau'
                    />
                    {formik.errors.matKhau && formik.touched.matKhau && (<p className='text-red-700 mt-1'>{formik.errors.matKhau}</p>)}
                </Form.Item>

                <Form.Item label="Họ Tên">
                    <Input name='hoTen' onChange={formik.handleChange} placeholder='Nhập họ tên' />
                    {formik.errors.hoTen && formik.touched.hoTen && (<p className='text-red-700 mt-1'>{formik.errors.hoTen}</p>)}
                </Form.Item>

                <Form.Item label="Email">
                    <Input type='email' name='email' onChange={formik.handleChange} placeholder='Nhập Email' />
                    {formik.errors.email && formik.touched.email && (<p className='text-red-700 mt-1'>{formik.errors.email}</p>)}
                </Form.Item>

                <Form.Item label="Số Điện Thoại">
                    <Input name='soDT' onChange={formik.handleChange} placeholder='Nhập số điện thoại' />
                    {formik.errors.soDT && formik.touched.soDT && (<p className='text-red-700 mt-1'>{formik.errors.soDT}</p>)}
                </Form.Item>

                <Form.Item label="Loại Người Dùng">
                    <Select options={[{ value: 'KhachHang', label: 'Khách Hàng' }, { value: 'QuanTri', label: 'Quản Trị' }]}
                        onChange={handleChangeSelect}
                        placeholder='Chọn loại người dùng'
                    />
                    {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung && (<p className='text-red-700 mt-1'>{formik.errors.maLoaiNguoiDung}</p>)}
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