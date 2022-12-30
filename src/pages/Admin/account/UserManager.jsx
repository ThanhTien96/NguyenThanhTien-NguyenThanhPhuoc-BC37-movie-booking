import { Table, Input, Button } from 'antd';
import React, { Fragment } from 'react';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import { isAlertActionERR, isAlertActionSuccess } from '../../../redux/reducers/admin/movieManagerSlice';
import { fetchApiDeleteAccount, getApiAccount, searchAccountApi } from '../../../redux/reducers/admin/accountManagerSlice';



const UserManager = (props) => {

    const dispatch = useDispatch();
    const userList = useSelector(state => state.accountManagerSlice.accountList);
    const navigate = useNavigate();

    const columns = [

        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            key: '3',
            sorter: (a, b) => {
                let tenA = a.hoTen.toLowerCase().trim();
                let tenB = b.hoTen.toLowerCase().trim();
                if (tenA > tenB) {
                    return 1
                } else {
                    return -1;
                }
            },
            render: (text, user) => {
                return <Fragment>
                    <h4 className='text-green-700'>{user.hoTen}</h4>
                </Fragment>
            },
            sortDirection: ['descend', 'ascend'],
            width: '20%',
        },
        {
            title: 'Tài Khoản',
            key: '4',
            dataIndex: 'taiKhoan',
            width: '15%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.taiKhoan}</p>
                </Fragment>
            }
        },
        {
            title: 'Email',
            key: '4',
            dataIndex: 'email',
            width: '20%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.email}</p>
                </Fragment>
            }
        },
        {
            title: 'Số Điện Thoại',
            key: '4',
            dataIndex: 'soDT',
            width: '10%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.soDT}</p>
                </Fragment>
            }
        },
        {
            title: 'Loại Người Dùng',
            key: '4',
            dataIndex: 'maLoaiNguoiDung',
            width: '10%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.maLoaiNguoiDung}</p>
                </Fragment>
            }
        },
        {
            title: 'Bảo Mật',
            key: '4',
            dataIndex: 'matKhau',
            width: '10%',
            render: (text, user, index) => {
                return <Fragment>
                    <p>{user.matKhau}</p>
                </Fragment>
            }
        },
        {
            title: 'Chức năng',
            key: '5',
            dataIndex: 'maPhim',
            render: (text, account, index) => {
                return <Fragment>
                    <NavLink key={1} to={`/admin/account/edit/${account.taiKhoan}`} className='text-white mr-2 text-2xl'><EditOutlined style={{ color: 'green' }}></EditOutlined></NavLink>

                    <span key={2} className='text-white mx-2 text-2xl cursor-pointer'
                        onClick={async () => {
                            if (window.confirm(`Bạn Có Chắc Muốn Xóa Phim ${account.taiKhoan}`)) {
                                try {
                                    await dispatch(fetchApiDeleteAccount(account.taiKhoan));
                                    await dispatch(isAlertActionSuccess({message: 'Xóa tài khoản thành công!'}));
                                    await setTimeout(() => {
                                        dispatch(isAlertActionSuccess(null));
                                    }, 1000);
                                    dispatch(getApiAccount(userList?.currentPage));
                                } catch (err) {
                                    await dispatch(isAlertActionERR({ message: err.response.data.content }));
                                    await setTimeout(() => {
                                        dispatch(isAlertActionERR(null));
                                    }, 1000);
                                }
                            }
                        }}><DeleteOutlined style={{ color: 'red' }}></DeleteOutlined></span>

                </Fragment>
            },
            width: '15%',
        },
    ];
    
    const data = userList?.items;
    const onChange = async (pagination) => {
        dispatch(getApiAccount(pagination.current));
    };

    const { Search } = Input;

    const onSearch = (value) => {
        if(value){
            dispatch(searchAccountApi(value));
        }else {
            dispatch(getApiAccount());
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-5 md:mb-10">
                <h3 className='text-orange-600 text-xl'>Quản lý Tài Khoản Người Dùng</h3>
                <Search
                    allowClear
                    className='w-1/2'
                    placeholder="Nhập từ khóa tìm kiếm"
                    onSearch={onSearch}

                />
                <Button onClick={() => navigate('/admin/account/create')} type='primary' size='large'><UserOutlined />Thêm Tài Khoản</Button>

            </div>
            <Table pagination={{total: userList?.totalCount}} rowKey={'taiKhoan'} columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}

export default UserManager

