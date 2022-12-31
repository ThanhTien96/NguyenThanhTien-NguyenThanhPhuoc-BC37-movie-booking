import { Col, Modal, Rate, Row, Tabs, Tag } from 'antd';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Detail.module.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiMovieDetail } from '../../redux/reducers/booking/bookingSlice';
import { truncateText } from '../../util';

const Detail = (props) => {
  // set state quan ly tat mo modal
  let [showModal, setShowModal] = useState(false);

  // use params lay id tu url de truyen cho cb
  const params = useParams();

  // khoi tao dispatch hook
  const dispatch = useDispatch();

  let datVe = useRef(null)

  // lay state chi tiet phim tu store ve component
  const movieDetail = useSelector(state => state.bookingSlice.moviesDetail)

  // use effect de dispatch action call api
  useEffect(() => {
    const id = params.id;
    const action = fetchApiMovieDetail(id);
    dispatch(action)

  }, [params])

  useEffect(() => {
    window.scrollTo(0, 0);
  });



  let trailer = '';
  trailer = movieDetail && movieDetail.trailer?.replace('watch?v=', 'embed/');
  const handleOpenModel = () => {
    setShowModal(true);
  }

  const handleCloseModel = () => {
    var iframe = document.querySelector('#video-trailer');

    if (iframe !== null) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    };

    setShowModal(false);
  }

  const handleClick = () => datVe.current.scrollIntoView({ behavior: 'smooth' });


  return (
    <div className=' bg-slate-900 py-40'>
      <div className='container mx-auto px-0 md:px-20 lg:px-40'>
        <Row className='items-center'>
          <Col lg={18} span={24}>
            <Row>
              <Col className='px-5 md:px-0' lg={8} span={24}>
                <div className={styles.trailer}>
                  <img className={styles.imgTrailer}
                    src={movieDetail?.hinhAnh} alt="..." />
                  <img
                    onClick={handleOpenModel}
                    className={styles.iconImgTrailer}
                    src={require('../../assets/image/tải xuống.png')} alt="..." />
                </div>
              </Col>
              <Col className='px-5' lg={16} span={24}>
                <div className="w-full">
                  <h1 className='text-2xl text-white mb-5 mt-5 md:mt-0'>{movieDetail?.tenPhim}</h1>
                  <p className='text-white text-base mb-3'>{movieDetail?.moTa}</p>
                  <table className="table-auto">

                    <tbody>
                      <tr className='block mt-2'>
                        <th className='text-white text-lg'>khoi chieu: </th>
                        <th><Tag className='ml-3' color='magenta'>{moment(movieDetail?.ngayKhoiChieu).format('DD/MM/YYYY')}</Tag></th>
                      </tr>
                      <tr className='mt-3 block'>
                        {movieDetail?.dangChieu && <th> <Tag color='magenta'>Dang Chieu</Tag></th>}
                        {movieDetail?.sapChieu && <th><Tag color='magenta'>Sap Chieu</Tag></th>}
                      </tr>
                      <tr className='mt-5 block'>
                        <th><button onClick={handleClick} className='mt-2 bg-orange-500 hover:bg-orange-700 text-white py-2 px-8 text-lg cursor-pointer border-none rounded-lg transition-all mr-7' > Mua Vé</button>
                        </th>
                        <th><button onClick={handleOpenModel} className='mt-2 bg-orange-500 hover:bg-orange-700 text-white py-2 px-8 text-lg cursor-pointer border-none rounded-lg transition-all' > Trailer</button></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <div className="hidden lg:block p-10 rounded-lg border border-solid border-gray-300 text-center shadow-sm shadow-white">
              <CircularProgressbar value={movieDetail?.danhGia} maxValue={10} text={`${movieDetail?.danhGia * 1}`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#86f348",
                  trailColor: "gainsboro",
                })}
              />

              <Rate className='mt-5' value={movieDetail?.danhGia} count={5} />
            </div>
          </Col>
        </Row>

        <div ref={datVe} className='md:pt-14 pt-10'>
          <Tabs
            className='mt-16 bg-white h-80 overflow-y-scroll overflow-hidden'
            tabPosition='left'
            items={movieDetail.heThongRapChieu?.map((rap, index) => {
              return {
                label: <div key={index} className='logoRap'><img className="w-10 " src={rap.logo} alt='...' /></div>,
                key: index,
                children: <Row>

                  {rap.cumRapChieu?.map((cumRap, index) => {
                    return (
                      <Col key={index} span={22} lg={11} className='mt-5 ml-5 w-80 pb-5' style={{ borderRight: '1px solid gainsboro', borderBottom: '1px solid gainsboro' }}>
                        <div>
                          <h3 className='font-medium p-0 text-green-700'>{cumRap.tenCumRap}</h3>
                          <p className='font-medium text-gray-500 mb-2'>{truncateText(cumRap.diaChi, 50)}</p>
                        </div>
                        {cumRap.lichChieuPhim.map((lichChieu, index) => {
                          if (index < 4) {
                            return (
                              <NavLink to={`/ticketroom/${lichChieu.maLichChieu}`} key={index}>
                                <button className='px-1 py-2 lg:px-4 border border-solid border-gray-300 rounded-md cursor-pointer hover:border-gray-500 hover:bg-slate-200 transition-all  mt-1 mr-1 lg:mr-4' >
                                  <span className='font-semibold text-green-700 text-md'>{moment(lichChieu.ngayChieuGioChieu).format('DD-MM-YYYY')}</span> ~ <span className='text-orange-500 font-semibold text-sm lg:text-md'>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm')}</span>
                                </button>
                              </NavLink>
                            )
                          }
                        })}
                      </Col>
                    )
                  })}
                </Row>,
              }
            })}
          />
        </div>

        <Modal centered width={1000} title='Trailer' open={showModal} onCancel={handleCloseModel}>
          <iframe title='trailer' id='video-trailer' src={trailer} width='100%' height='500px'></iframe>
        </Modal>

      </div>
    </div>
  )
}

export default Detail