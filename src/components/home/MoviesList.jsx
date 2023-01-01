import { Card, Modal, Tag, Rate } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useRef, useState, memo } from 'react'
import { useSelector } from 'react-redux';
import MovieSearch from './movie/MovieSearch';
import { truncateText } from '../../util/index';
import styles from './MovieList.module.css';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';




const MoviesList = (props) => {

  

  const trailerRef = useRef({ link: '', title: '' });

  //use state quan ly dong mo modal
  const [openModelTrailer, setOpenModelTrailer] = useState(false);

  // use selector lay du lieu tu store
  const movies = useSelector(state => state.bookingSlice.movies);


  // ham mo modal va set du lieu cho trailerRef
  const openModel = (link, name) => {
    setOpenModelTrailer(true)
    trailerRef.current.link = link;
    trailerRef.current.title = name;
  };

  // ham dong modal va video trailer
  const closeModel = () => {
    var iframe = document.querySelector('#trailer');

    if (iframe !== null) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    };
    setOpenModelTrailer(false);
  };

  //cau hinh cho slick carousel
  let settingsCarouser = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    appendDots: dots => {
      return <ul style={{ bottom: -35 }}>{dots}</ul>;
    },
    customPaging: () => {
      const style = {
        width: 13,
        height: 13,
        borderRadius: '100%',
        display: 'inline-block',
        background: 'rgb(251, 66, 38)',
        opacity: 0.7,
        transition: "0.4s",
      };
      return <span className='slickDots' style={style} > </span>;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ],
  };


  return (
    <div id='lichChieu' className={styles.movieList}>
      <MovieSearch />

      <Slider {...settingsCarouser}>
        {movies?.map((item, index) => {
          return (
            <div className='my-5' key={index}>
              <Card className={styles.movieCard}
                style={{
                  width: '90%',
                }}
                cover={<img className={styles.imgCard} alt="example" src={item.hinhAnh} />}
              >
                {item.hot && <span className={styles.movieHot}>hot</span>}
                <img onClick={() => openModel(item?.trailer, item?.tenPhim)} className={styles.watchTrailer} src={require('../../assets/image/tải xuống.png')} alt="" />
                <div className={styles.cardBooking}>
                  <div>
                    <table className="table-auto w-full">
                      <tbody>
                        <tr>
                          <th className='text-left'>{item.dangChieu && <Tag className='ml-3' color='magenta'>Dang Chieu</Tag>}</th>
                          <th className='text-right'>{item.sapChieu && <Tag color='magenta'>Sap Chieu</Tag>}</th>
                        </tr>
                        <tr>
                          <td><Rate className='text-sm ml-3' value={item.danhGia} count={5} /> </td>
                        </tr>
                      </tbody>
                    </table>
                    <NavLink to={`/detail/${item.maPhim}`}>
                      <button
                        className={styles.btnBooking}>Đặt Vé
                      </button>
                    </NavLink>
                  </div>
                </div>
                <Meta className='cardTitle h-20' title={item.tenPhim} description={truncateText(item.moTa, 40)} />
              </Card>
            </div>
          )
        })}
      </Slider>

      <Modal title={`Trailer phim ${trailerRef.current.title}`} centered width={1000} open={openModelTrailer} onCancel={closeModel}>
        <iframe title='trailer' id="trailer" src={trailerRef.current.link} width="100%" height="400px" frameBorder={1} />
      </Modal>

    </div>
  )
}

export default memo(MoviesList);