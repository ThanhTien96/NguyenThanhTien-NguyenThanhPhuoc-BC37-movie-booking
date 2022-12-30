import { Table, Input, Button } from 'antd';
import React, { Fragment } from 'react';
import { VideoCameraAddOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { truncateText } from '../../../util';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteFilmApi, fetchApiMoviesList } from '../../../redux/reducers/admin/movieManagerSlice';



const Films = (props) => {

    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movieManagerSlice.moviesList);
    const navigate = useNavigate();


    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirection: ['descend', 'ascend'],
            width: '10%',
            key: '1'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, flims, index) => {
                return <Fragment><img src={flims.hinhAnh} alt={flims.tenPhim} width={50} onError={(e) => { e.tartget.onError = null; e.target.src = `https://picsum.photos/id/${index}/150/150` }} /></Fragment>
            },
            width: '15%',
            key: '2'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            key: '3',
            sorter: (a, b) => {
                let phimA = a.tenPhim.toLowerCase().trim();
                let phimB = b.tenPhim.toLowerCase().trim();
                if (phimA > phimB) {
                    return 1
                } else {
                    return -1;
                }
            },
            render: (text, flims) => {
                return <Fragment>
                    <h4 className='text-green-700'>{flims.tenPhim}</h4>
                </Fragment>
            },
            sortDirection: ['descend', 'ascend'],
            width: '20%',
        },
        {
            title: 'Mô tả',
            key: '4',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let phimA = a.tenPhim.toLowerCase().trim();
                let phimB = b.tenPhim.toLowerCase().trim();
                if (phimA > phimB) {
                    return 1
                } else {
                    return -1;
                }
            },
            width: '35%',
            sortDirection: ['descend', 'ascend'],
            render: (text, flims, index) => {
                return <Fragment>
                    {truncateText(flims.moTa, 50)}
                </Fragment>
            }
        },
        {
            title: 'Chức năng',
            key: '5',
            dataIndex: 'maPhim',
            render: (text, flims, index) => {
                return <Fragment>
                    <NavLink key={1} to={`/admin/editfilms/${flims.maPhim}`} className='text-white mr-2 text-2xl'><EditOutlined style={{ color: 'green' }}></EditOutlined></NavLink>

                    <span key={2} className='text-white mx-2 text-2xl cursor-pointer'
                        onClick={() => {
                            if (window.confirm(`Bạn Có Chắc Muốn Xóa Phim ${flims.tenPhim}`)) {
                                dispatch(deleteFilmApi(flims.maPhim))
                            }
                        }}><DeleteOutlined style={{ color: 'red' }}></DeleteOutlined></span>

                    <NavLink key={3} to={`/admin/showtime/${flims.maPhim}/${flims.tenPhim}`} 
                    onClick={() => {localStorage.setItem('filmParams', flims.hinhAnh)}}
                    className='text-white ml-2 text-2xl'><CalendarOutlined style={{ color: 'blue' }} /></NavLink>
                </Fragment>
            },
            width: '20%',
        },
    ];
    const data = moviesList;
    
    const { Search } = Input;

    const onSearch = (value) => {
        dispatch(fetchApiMoviesList(value));
    };

    return (
        <div>
            <div className="flex justify-between mb-5 md:mb-10">
                <h3 className='text-orange-600 text-xl'>Quản lý phim</h3>
                <Search
                    allowClear
                    className='w-1/2'
                    placeholder="Nhập từ khóa tìm kiếm"
                    onSearch={onSearch}
                    enterButton

                />
                <Button onClick={() => navigate('/admin/addfilms')} type='primary' size='large'><VideoCameraAddOutlined />Thêm Phim</Button>

            </div>
            <Table rowKey={'maPhim'} columns={columns} dataSource={data} />
        </div>
    )
}

export default Films