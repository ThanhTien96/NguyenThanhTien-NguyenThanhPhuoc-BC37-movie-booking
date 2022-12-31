
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchApiUserLogin } from '../../redux/reducers/user/UserLogin';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import * as yup from 'yup';

const Login = (props) => {
  const [message, setMessage] = useState('');
  const [saveAccount, setSaveAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: 'thanhtien1',
      matKhau: 'thanhtien1',
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required('* Vui lòng nhập tài khoản !'),
      matKhau: yup.string().required('* Vui lòng nhập mật khẩu !'),
    }),
    onSubmit: async (value) => {
      try {
        const action = fetchApiUserLogin(value);
        await dispatch(action);
        if (saveAccount) {
          localStorage.setItem('ACCOUNT', JSON.stringify(value))
        }      
        
      } catch (err) {
        setMessage(err.response.data.content);
      }

    },
  });



  

  return (
    <div className = "w-full py-28 block bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
      <form onSubmit={formik.handleSubmit}
        className="bg-white py-6 px-10 sm:max-w-md w-full shadow-lg">
        <div className="sm:text-3xl text-2xl font-semibold text-center text-orange-600 mb-12">
          Đăng Nhập
        </div>
        {message && <p className='text-sm text-red-600 mb-5'>{message}</p>}
        <div >
          <div>
            <p>Tài Khoản</p>
            <input value={formik.values.taiKhoan} name='taiKhoan' onChange={formik.handleChange} type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-4" placeholder="Tài Khoản" />
            {formik.errors.taiKhoan && formik.touched.taiKhoan && (<p className='text-red-700 mb-5'>{formik.errors.taiKhoan}</p>)}
          </div>


          <div className='relative'>
            <p className='mb-1'>Mật Khẩu</p>
            <input value={formik.values.matKhau} name='matKhau' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} className="focus:outline-orange-600 border rounded-lg border-b w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-3" placeholder="Mật Khẩu" />
            {formik.errors.matKhau && formik.touched.matKhau && (<p className='text-red-700 mb-5'>{formik.errors.matKhau}</p>)}
            <div
              style={{ position: 'absolute', top: '47%', right: '10px', cursor: 'pointer' }}>
              {showPassword ? <EyeInvisibleOutlined onClick={() => setShowPassword(false)} /> : <EyeOutlined onClick={() => setShowPassword(true)} />}
            </div>
          </div>
          <div className="flex">
            <input type="checkbox" className="border-orange-400 cursor-pointer" onClick={() => setSaveAccount(!saveAccount)} defaultValue={saveAccount} />
            <div className="px-3 text-gray-500 ">
              lưu mật khẩu
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button type='submit' className=" cursor-pointer hover:border-sky-400  transition-all duration-500 rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-orange-600  to-orange-300 text-white text-lg font-semibold ">
              Đăng Nhập
            </button>
          </div>
          <div className="flex justify-center ">
            <p className="text-gray-500">Chưa có tài khoản </p>
            <NavLink to={'signup'} className="text-sky-600 pl-2"> Đăng Ký</NavLink>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Login