import { ErrorMessage, useFormik } from 'formik';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchApiRegister } from '../../redux/reducers/user/UserLogin';
import { useDispatch } from 'react-redux';
import { maNhom } from '../../util/apiPath';
import * as yup from 'yup';
import Swal from 'sweetalert2';



const SignUp = (props) => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  let [validMess, setValidMess] = useState('');

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDT: '',
      maNhom: maNhom.NHOM,
      hoTen: '',
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required('* Tài Khoản không được bỏ trống !'),
      matKhau: yup.string().required('* Mật khẩu không được bỏ trống !'),
      email: yup.string().required('* Email không được bỏ trống !').email('* Không phải định dạng Email'),
      soDT: yup.string().matches(/^[0-9]+$/, '* Số điện thoại chỉ nhập số 0-9').required('* Số điện thoại không được bỏ trống !'),
      hoTen: yup.string().required('* Họ tên không được bỏ trống !'),
    }),
    onSubmit: async (value) => {
      try {
        await dispatch(fetchApiRegister(value));

        Swal.fire({
          title: 'Đăng ký thành công',
          icon: 'success',
          showCancelButton: false,
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/user/login')
          } 
    
        })

        
      } catch (err) {
        setValidMess(err.response.data.content)
        console.log(err.response)
      }

    },
  });



  return (
    <div className="w-full py-28 block bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white py-6 mt-20 px-10 sm:max-w-md w-full ">
        <div className="sm:text-3xl text-2xl font-semibold text-center text-orange-600 mb-12">
          Đăng Ký Tài Khoản

        </div>
        <div >
          {validMess && <p className='text-red-900 mb-5 bg-red-200 p-2'>{validMess}</p>}
          <div>
            <p className='mb-2'>Tài khoản</p>
            <input
              onChange={formik.handleChange}
              name='taiKhoan'
              type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Tài Khoản" />
            {formik.errors.taiKhoan && formik.touched.taiKhoan && (<p className='text-red-700 mb-3'>{formik.errors.taiKhoan}</p>)}
          </div>
          <div className='relative'>
            <p className='mb-2'>Mật khẩu</p>
            <input name='matKhau' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} className="focus:outline-orange-600 border rounded-lg border-b w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Mật Khẩu" />
            {formik.errors.matKhau && formik.touched.matKhau && (<p className='text-red-700 mb-3'>{formik.errors.matKhau}</p>)}
            <div
              style={{ position: 'absolute', top: '40%', right: '10px', cursor: 'pointer' }}>
              {showPassword ? <EyeInvisibleOutlined onClick={() => setShowPassword(false)} /> : <EyeOutlined onClick={() => setShowPassword(true)} />}
            </div>
            
          </div>

          <div className='relative'>
            <p className='mb-2'>Nhập lại mật khẩu</p>
            <input name='nhapLaiMK' type={showPassword ? 'text' : 'password'} className="focus:outline-orange-600 border rounded-lg border-b w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Nhập lại mật khẩu" />
            <div
              style={{ position: 'absolute', top: '40%', right: '10px', cursor: 'pointer' }}>
              {showPassword ? <EyeInvisibleOutlined onClick={() => setShowPassword(false)} /> : <EyeOutlined onClick={() => setShowPassword(true)} />}
            </div>
          </div>

          <div>
            <p className='mb-2'>Email</p>
            <input
              onChange={formik.handleChange}
              name='email'
              type="email" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Email" />
            {formik.errors.email && formik.touched.email && (<p className='text-red-700 mb-3'>{formik.errors.email}</p>)}
          </div>

          <div>
            <p className='mb-2'>Số điện thoại</p>
            <input
              onChange={formik.handleChange}
              name='soDT'
              type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Số Điện Thoại " />
            {formik.errors.soDT && formik.touched.soDT && (<p className=' text-red-700 mb-3'>{formik.errors.soDT}</p>)}
          </div>

          <div>
            <p className='mb-2'>Họ và tên</p>
            <input
              onChange={formik.handleChange}
              name='hoTen'
              type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Họ Và Tên " />
            {formik.errors.hoTen && formik.touched.hoTen && (<p className='text-red-700 mb-3'>{formik.errors.hoTen}</p>)}
          </div>

          <div className="flex">
            <input type="checkbox" className="border-sky-400 " defaultValue />
            <div className="px-3 text-gray-500">
              Tôi Đồng ý &amp; Chấp nhận
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button type='submit' className=" cursor-pointer hover:border-sky-400  transition-all duration-500 rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-orange-600  to-orange-300 text-white text-lg font-semibold ">
              Tạo Tài Khoản
            </button>
          </div>
          <div className="flex justify-center ">
            <p className="text-gray-500">lưu tài khoản </p>
            <NavLink to={'user/login'} className="text-sky-600 pl-2"> Đăng Nhập</NavLink>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp