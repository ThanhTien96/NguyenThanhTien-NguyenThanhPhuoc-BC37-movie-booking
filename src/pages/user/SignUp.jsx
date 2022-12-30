import { useFormik } from 'formik';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchApiRegister } from '../../redux/reducers/user/UserLogin';
import { useDispatch } from 'react-redux';
import { maNhom } from '../../util/apiPath';

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
    onSubmit: async (value) => {
      try {
        console.log(value)
        await dispatch(fetchApiRegister(value))

        navigate('/user/login')
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
              type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500" placeholder="Tài Khoản" />
          </div>
          <div className='mt-8 relative'>
            <p className='mb-2'>Mật khẩu</p>
            <input name='matKhau' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} className="focus:outline-orange-600 border rounded-lg border-b w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-8" placeholder="Mật Khẩu" />
            <div
              style={{ position: 'absolute', top: '40%', right: '10px', cursor: 'pointer' }}>
              {showPassword ? <EyeInvisibleOutlined onClick={() => setShowPassword(false)} /> : <EyeOutlined onClick={() => setShowPassword(true)} />}
            </div>
          </div>

          <div className='relative'>
            <p className='mb-2'>Nhập lại mật khẩu</p>
            <input name='nhapLaiMK' type={showPassword ? 'text' : 'password'} className="focus:outline-orange-600 border rounded-lg border-b w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-8" placeholder="Nhập lại mật khẩu" />
            <div
              style={{ position: 'absolute', top: '40%', right: '10px', cursor: 'pointer' }}>
              {showPassword ? <EyeInvisibleOutlined onClick={() => setShowPassword(false)} /> : <EyeOutlined onClick={() => setShowPassword(true)} />}
            </div>
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name='email'
              type="email" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-8" placeholder="Email" />
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name='soDT'
              type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-8" placeholder="Số Điện Thoại " />
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name='hoTen'
              type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-8" placeholder="Họ Và Tên " />
          </div>

          <div className="flex">
            <input type="checkbox" className="border-sky-400 " defaultValue />
            <div className="px-3 text-gray-500">
              Tôi Đồng ý &amp; Chấp nhận
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button className=" cursor-pointer hover:border-sky-400  transition-all duration-500 rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-orange-600  to-orange-300 text-white text-lg font-semibold ">
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