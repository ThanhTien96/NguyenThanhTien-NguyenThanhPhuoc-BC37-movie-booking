import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EyeInvisibleOutlined, EyeOutlined, EditOutlined, CarryOutFilled, IdcardOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { setTabActiveKey } from '../../redux/reducers/booking/bookingSlice';
import { useFormik } from 'formik';
import adminService from '../../services/adminService';
import { isAlertActionERR, isAlertActionSuccess } from '../../redux/reducers/admin/movieManagerSlice';
import { fetchApiProfile } from '../../redux/reducers/user/UserLogin';



const BookingHistory = (props) => {

  const ticketHistory = useSelector(state => state.userSlice.userLogin);


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-5 md:mb-10 ">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-700">Lịch sử đặt vé khách hàng</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa điểm và thời gian để xem phim</p>
        </div>
        <div className="flex flex-wrap -m-2">
          {
            ticketHistory?.thongTinDatVe?.map((ele, index) => {
              return (

                <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex items-center  border border-solid border-gray-200 border p-4 rounded-lg">
                    <img src={ele.hinhAnh} alt="..." className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" />
                    <div className="flex-grow">
                      <h2 className="text-green-900 text-lg title-font font-medium">{ele.tenPhim}</h2>
                      <p className="text-gray-500">{ele.danhSachGhe[0].tenHeThongRap}</p>
                      <p className="text-gray-500">Ngày đặt: {moment(ele.ngayDat).format('DD-MM-YYYY ~ hh:mm:ss a')}</p>
                      <p className="text-gray-500">Thời Lượng Phim: {ele.thoiLuongPhim}</p>
                      <p>Tên Rạp: {ele.danhSachGhe[0].tenRap}</p>
                      <p className='text-orange-600 font-semibold'>Số ghế:
                        {ele.danhSachGhe.map((ghe) => {
                          return (
                            <button key={ghe.maGhe}
                              className="w-10 py-1 text-green-700 font-semibold border-orange-600 rounded-md bg-transparent m-0.5"
                              disabled> {ghe.tenGhe}</button>
                          )
                        })}
                      </p>

                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>

  )
}

const AccountUpdate = (props) => {

  let [disable, setDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const account = useSelector(state => state.userSlice.userLogin);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: account?.taiKhoan,
      matKhau: account?.matKhau,
      email: account?.email,
      soDT: account?.soDT,
      maNhom: 'GP00',
      hoTen: account?.hoTen,
      maLoaiNguoiDung: account.maLoaiNguoiDung,
    },
    onSubmit: async (values) => {
      try {
        const res = await adminService.updateAccount(values);
        dispatch(isAlertActionSuccess({ message: res.data.message }));
        await setTimeout(() => {
          dispatch(isAlertActionSuccess(null));
        }, 1000);
        if (localStorage.getItem('TOKEN')) {
          await dispatch(fetchApiProfile());
        }
        setDisable(true);
      } catch (err) {
        console.log(err);
        dispatch(isAlertActionERR({ message: err.response.data.content }));
        await setTimeout(() => {
          dispatch(isAlertActionERR(null));
        }, 1000)
      }
    }
  })

  return (
    <div className='text-center'>
      <div className="py-10  bg-opacity-50 h-screen">
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
          <div style={{ borderTop: '2px solid rgb(34 197 94)' }} className="bg-gray-100 p-4 bg-opacity-5 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img className="w-10 h-10 object-cover rounded-full" alt="User avatar" src="https://picsum.photos/150/150" />
                <h1 className="text-orange-600 font-semibold text-1xl">{account?.hoTen}</h1>
              </div>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto text-gray-500">Tài Khoản</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">

                <div className='mb-5'>
                  <label className="text-sm text-gray-400">Tài Khoản</label>
                  <div className="w-full inline-flex border items-center">
                    <div className="w-1/12 pt-2 bg-gray-100">
                      <svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      onChange={formik.handleChange}
                      name='taiKhoan'
                      disabled={disable}
                      type="text" className="w-11/12 focus:outline-orange-500 focus:text-gray-600 p-2"
                      value={formik.values?.taiKhoan}
                    />

                  </div>
                </div>

                <label className="text-sm text-gray-400">Email</label>
                <div className="w-full inline-flex border items-center">
                  <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    onChange={formik.handleChange}
                    name='email'
                    disabled={disable}
                    type="email" className="w-11/12 focus:outline-orange-500 focus:text-gray-600 p-2"
                    value={formik.values?.email}
                  />
                </div>

              </div>

            </div>
            <hr />
            <div className="md:inline-flex  space-y-1 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm text-gray-500">Thông Tin Cá Nhân</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-gray-400">Họ Tên</label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-gray-100">
                      <svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      onChange={formik.handleChange}
                      name='hoTen'
                      disabled={disable}
                      type="text" className="w-11/12 focus:outline-orange-500 focus:text-gray-600 p-2"
                      value={formik.values?.hoTen}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Số Điện Thoại</label>
                  <div className="w-full inline-flex border">
                    <div className="pt-2 w-1/12 bg-gray-100">
                      <svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      onChange={formik.handleChange}
                      name='soDT'
                      disabled={disable}
                      type="text" className="w-11/12 focus:outline-orange-500 focus:text-gray-600 p-2"
                      value={formik.values?.soDT}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex w-full p-8 text-gray-500 items-center">
              <h2 className="md:w-4/12 max-w-sm mx-auto text-gray-500">Bảo Mật</h2>
              <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
                <div className="w-full inline-flex border-b relative">
                  <div className="w-1/12 pt-2">
                    <svg fill="none" className="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div
                    style={{ position: 'absolute', top: '17%', right: '10px', cursor: 'pointer' }}>
                    {showPassword ? <EyeOutlined onClick={() => setShowPassword(false)} /> : <EyeInvisibleOutlined onClick={() => setShowPassword(true)} />}
                  </div>
                  <input
                    onChange={formik.handleChange}
                    name='matKhau'
                    disabled={disable}
                    type={showPassword ? 'text' : 'password'} className="w-11/12 focus:outline-orange-500 focus:text-gray-600 p-2 ml-4"
                    value={formik.values?.matKhau}
                  />
                </div>
              </div>
              <div className="md:w-3/12 text-center md:pl-6 mt-5 md:mt-0">

                {disable ? <span
                  onClick={() => {
                    setDisable(disable ? false : true)
                  }}
                  type='button'
                  className="text-white hover:bg-orange-800 transition-all cursor-pointer border-none md:w-full mx-auto max-w-sm rounded-md text-center bg-orange-500 py-3 px-4 inline-flex items-center focus:outline-none md:float-right">
                  <EditOutlined className='mr-2' />
                  Chỉnh Sửa
                </span>
                  : <button type='submit' className="text-white hover:bg-orange-800 transition-all cursor-pointer border-none md:w-full mx-auto max-w-sm rounded-md text-center bg-orange-500 py-3 px-4 inline-flex items-center focus:outline-none md:float-right">
                    <svg fill="none" className="w-4 text-white mr-2" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Cập Nhật
                  </button>
                }

              </div>
            </div>
          </form>
        </div>
      </div>


    </div>
  )
}


const Account = () => {

  const activeKey = useSelector(state => state.bookingSlice.tabActiveKey);
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto mt-28 px-5 lg:px-20 pb-20">
      <Tabs
        defaultActiveKey={activeKey}
        activeKey={activeKey}
        tabBarStyle={{ marginBottom: '0', fontWeight: 'bold' }}
        size='large'
        onTabClick={(e) => {
          dispatch(setTabActiveKey(e))
        }}
        items={[
          {
            label: <h3 className='text-sm md:text-lg'> <IdcardOutlined className='text-2xl text-green-600' />Thông Tin Tài Khoản</h3>,
            key: '1',
            children: <AccountUpdate />,
          },
          {
            label: <h3 className='text-sm md:text-lg'> <CarryOutFilled className='text-2xl text-green-600' />Lịch Sử Đặt Vé</h3>,
            key: '2',
            children: <BookingHistory />,
          },
        ]}
      />
    </div>
  )
}

export default Account


