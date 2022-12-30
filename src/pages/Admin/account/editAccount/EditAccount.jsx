

import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { useFormik } from 'formik';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import adminService from '../../../../services/adminService';
import { useDispatch } from 'react-redux';
import { isAlertActionERR, isAlertActionSuccess } from '../../../../redux/reducers/admin/movieManagerSlice';


const EditAccount = (props) => {

    const params = useParams();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const fetchApiAccountProfile = async (taiKhoan) => {
        try{
            const res = await adminService.getAccountProfile(taiKhoan);
            await setUser(res.data.content);
         }catch(err){
            console.log(err);
         }
     }

    useEffect(() => {
        fetchApiAccountProfile(params.taikhoan);
      
    }, [])
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: user?.taiKhoan,
            matKhau: user?.matKhau,
            hoTen: user?.hoTen,
            email: user?.email,
            soDT: user?.soDT,
            maNhom: 'GP00',
            maLoaiNguoiDung: user?.maLoaiNguoiDung,
        },
        onSubmit: async (values) => {
            try{
                const res = await adminService.updateAccount(values);
                dispatch(isAlertActionSuccess({message:'Cập nhật thành công!'}));
                await setTimeout(() => {
                    dispatch(isAlertActionSuccess(null));
                },500);

            }catch(err){
                dispatch(isAlertActionERR({message: err.response.data.content}));
                await setTimeout(() => {
                    dispatch(isAlertActionERR(null));
                },500)
            }finally{
                navigate('/admin/account');
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
                <h3 className='text-orange-600 mb-10'>Sửa Tài Khoản {params.taikhoan}</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Tài Khoản">
                    <Input name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
                </Form.Item>

                <Form.Item label="Mật Khẩu">
                    <Input.Password
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        onChange={formik.handleChange}
                        value={formik.values.matKhau}
                        name='matKhau'
                    />
                </Form.Item>

                <Form.Item label="Họ Tên">
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                </Form.Item>

                <Form.Item label="Email">
                    <Input type='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
                </Form.Item>

                <Form.Item label="Số Điện Thoại">
                    <Input name='soDT' onChange={formik.handleChange} value={formik.values.soDT} />
                </Form.Item>

                <Form.Item label="Loại Người Dùng">
                    <Select options={[{ value: 'KhachHang', label: 'Khách Hàng' }, { value: 'QuanTri', label: 'Quản Trị' }]}
                        onChange={handleChangeSelect}
                        value={formik.values.maLoaiNguoiDung}
                    />
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

export default EditAccount