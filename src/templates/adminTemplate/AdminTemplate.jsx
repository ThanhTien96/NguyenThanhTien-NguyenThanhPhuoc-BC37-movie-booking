
import { FileOutlined,  UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons/lib/icons';
import { Alert, Breadcrumb, Layout, Menu, Space, theme } from 'antd'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/image/logo.svg';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { fetchApiMoviesList } from '../../redux/reducers/admin/movieManagerSlice';
import { getApiAccount } from '../../redux/reducers/admin/accountManagerSlice';
import { ExportOutlined } from '@ant-design/icons';
import { fetchApiLoginAction } from '../../redux/reducers/user/UserLogin';
import Swal from 'sweetalert2';



const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<NavLink to="/admin/account">Quản lý người dùng </NavLink>, '1', <UserOutlined />),
  getItem('Quản lý phim', '2', <FileOutlined />, [
    getItem(<NavLink to='/admin'>Phim</NavLink>, '3', <FileOutlined />),
    getItem(<NavLink to='/admin/addfilms'>Thêm phim</NavLink>, '4', <VideoCameraAddOutlined />),
  ]),

];

const Dashboard = (props) => {

  const user = useSelector(state => state.userSlice.userLogin);
  const mesSuccess = useSelector(state => state.movieManagerSlice.isAlertSuccess);
  const mesERR = useSelector(state => state.movieManagerSlice.isAlertERR);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchApiMoviesList());
    dispatch(getApiAccount());
    window.scrollTo(0, 0);
  }, [])



  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


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
        Swal.fire('Đăn Xuất Thành Công !', '', 'success')
      } 

    })
  }



  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className='py-5 px-5'>
            <NavLink to='/'><img className='w-40' src={logo} alt="" /></NavLink>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: "10px 40px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              background: colorBgContainer,
            }}
          >
            <h1 className="text-orange-600 font-semibold text-1xl mr-3 capitalize">{user?.hoTen}</h1>
            <img className="w-10 h-10 object-cover rounded-full" alt="User avatar" src="https://picsum.photos/150/150" />
            <NavLink to={'/'} 
            onClick={handleLogOut}
            className='adminLink text-black ml-5 hover:text-orange-400 transition-all flex items-center'><ExportOutlined  style={{fontSize: '1.5rem', marginRight: '5px'}} /> Đăng Xuất</NavLink>
          </Header>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >

            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
              key='3'
            >
              <Outlet />
              {mesSuccess || mesERR ? <Space
                direction="vertical"
                style={{
                  position: 'fixed',
                  top: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30%',
                }}
              >
                {mesSuccess && <Alert message={mesSuccess?.message} type="success" showIcon />}
                {mesERR && <Alert message={mesERR?.message} type="error" showIcon />}
              </Space> : ''}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              padding: '10px 50px',
            }}
          >
            Flims Admin ©2022 by ThanhTien.DEV
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default Dashboard