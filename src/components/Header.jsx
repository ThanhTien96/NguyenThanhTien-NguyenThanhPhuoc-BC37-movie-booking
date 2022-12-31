import React, { memo, useState } from 'react'
import Logo from '../assets/image/logo.svg';
import './Header.css';
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import clsx from 'clsx';
import { ExportOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiLoginAction } from '../redux/reducers/user/UserLogin';
import { setTabActiveKey } from '../redux/reducers/booking/bookingSlice';
import Swal from 'sweetalert2';



const Header = (props) => {
  // show navbar
  let [isShow, setIsShow] = useState(false);
  let [isShowAd, setIsShowAd] = useState(false);
  const [active, setActive] = useState({ cumRap: false, lichChieu: false, tinTuc: false, ungDung: false })
  // use dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // lấy dữ liệu user login từ store
  const profile = useSelector(state => state.userSlice.userLogin);

  // hàm đóng mở navbar
  const handleShow = (event) => {
    setIsShow(current => !current)
    if (isShowAd) {
      setIsShowAd(false);
    }
  }
  // hàm đóng mở navbar phần user
  const handleShowAd = (event) => {
    setIsShowAd(current => !current)

    if (isShowAd) {
      setIsShow(false)
    }
  }

  // đóng ứng dụng 
  document.onclick = function () {
    if (isShowAd) {
      setIsShow(false)
    };
  };

  // active
  const handleActive = () => (
    ({ isActive }) => isActive ? 'navLink text-orange-400' : 'navLink text-white hover:text-black md:hover:text-orange-400 transition-all'
  );
  const handleActiveAd = () => (
    ({ isActive }) => isActive ? 'adminLink text-orange-400 flex items-center' : 'adminLink text-white hover:text-black md:hover:text-orange-400 transition-all flex items-center'
  );
  //log out
  const handleLogOut = () => {

    Swal.fire({
      title: 'Bạn có muốn đăng xuất',
      icon: 'question',
      confirmButtonText: 'Đăng Xuất',
      showCancelButton: true,
      cancelButtonText: 'Hủy Bỏ',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(fetchApiLoginAction(null));
        localStorage.removeItem('TOKEN');
        navigate('/');
        Swal.fire('Đăn Xuất Thành Công !', '', 'success');
      } 

    })
  }

  //scroll to view
  const scrollToView = (id) => {
    let ele = document.getElementById(id);
    if (ele) {
      ele.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <header className="header">
      <div className="container md:flex justify-between h-14 mx-auto items-center">
        <NavLink to={'/'}><img className='w-42' src={Logo} alt="..." /></NavLink>

        <ul
          className={clsx('navBar',
            isShow ? 'block' : 'hidden'
          )}>
          <li className='navItem'>
            <NavLink to={'/'}
              onClick={() => {
                scrollToView('cumRap');
                handleShow();
                for (let key in active) {
                  if (active[key]) {
                    setActive(active[key] = false);
                  }

                }
                setActive({ ...active, cumRap: true })

              }}

              className={clsx('navLink text-white hover:text-black md:hover:text-orange-400 transition-all',
                { 'text-orange-400': active.cumRap }
              )}
            >Cụm Rạp</NavLink>
          </li>

          <li className='navItem'>
            <NavLink to={'/'}
              onClick={() => {
                scrollToView('lichChieu');
                handleShow();
                for (let key in active) {
                  if (active[key]) {
                    setActive(active[key] = false);
                  }

                };
                setActive({ ...active, lichChieu: true });
              }}
              className={clsx('navLink text-white hover:text-black md:hover:text-orange-400 transition-all',
                { 'text-orange-400': active.lichChieu }
              )}
            >Lịch Chiếu</NavLink>
          </li>

          <li className='navItem'>
            <NavLink to={''}
              onClick={() => {
                scrollToView('tinTuc24h');
                handleShow();
                for (let key in active) {
                  if (active[key]) {
                    setActive(active[key] = false);
                  }

                };
                setActive({ ...active, tinTuc: true });
              }}
              className={clsx('navLink text-white hover:text-black md:hover:text-orange-400 transition-all',
                { 'text-orange-400': active.tinTuc }
              )}
            >Tin Tức</NavLink>
          </li>

          <li className='navItem'>
            <NavLink to={''}
              onClick={() => {
                scrollToView('ungDung');
                handleShow();
                for (let key in active) {
                  if (active[key]) {
                    setActive(active[key] = false);
                  }

                };
                setActive({ ...active, ungDung: true });
              }}
              className={clsx('navLink text-white hover:text-black md:hover:text-orange-400 transition-all',
                { 'text-orange-400': active.ungDung }
              )}
            >Ứng Dụng</NavLink>
          </li>

          <li className='navItem'>
            <NavLink to={'/admin'}
              onClick={handleShow}
              className={handleActive()} href="">Quản Lý Phim</NavLink>
          </li>
        </ul>
        <div className="items-center md:flex">


          {profile ? <div
            className={clsx('admin',
              isShowAd ? 'block' : 'hidden',
            )}>
            <i className='mr-4 text-black md:text-white'>xin chào</i>
            <NavLink to={'/user'
            }
              className={handleActiveAd()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span onClick={() => {
                dispatch(setTabActiveKey('1'))
              }} className='font-semibold mr-2'>{profile.hoTen}</span>
              <img onClick={() => {
                dispatch(setTabActiveKey('1'))
              }} className='w-10 border border-solid border-white rounded-full' src="https://picsum.photos/150/150" alt="..." />
            </NavLink>
            <span className='md:mx-3 text-xl text-gray-400 hidden lg:inline-block'>|</span>
            <NavLink to={'/'}
              onClick={handleLogOut}
              className='adminLink text-white hover:text-black md:hover:text-orange-400 transition-all flex items-center'><ExportOutlined style={{ fontSize: '1.5rem', marginRight: '5px' }} /> Đăng Xuất</NavLink>
          </div>
            :
            <div
              className={clsx('admin',
                isShowAd ? 'block' : 'hidden'
              )}>

              <NavLink to={'user/login'}
                className={handleActiveAd()}> <BsFillPersonFill className='md:text-lg mr-1 hidden lg:inline-block' /> Đăng Nhập</NavLink>
              <span className='md:mx-3 text-xl text-gray-400 hidden lg:inline-block'>|</span>
              <NavLink to={'user/signup'}
                className={handleActiveAd()}> Đăng Ký</NavLink>
            </div>
          }




        </div>



      </div>
      <BsFillPersonFill
        onClick={handleShowAd}
        className='text-4xl mr-5 text-orange-300 ml-3 lg:hidden cursor-pointer' />
      <button
        onClick={handleShow}
        className='p-2 bg-transparent border border-orange-300 rounded-md mb-2 block lg:hidden'><FaBars className='text-orange-400 text-lg' /></button>


    </header>

  )
}

export default memo(Header);