
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import './Carousel.css';
import { BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";




//component custom for next button slcik
function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className='setNext'
      style={{ ...style, display: "block", }}
      onClick={onClick}
    ><BsChevronCompactRight /></div>
  );
};

//component custom for next button slcik
function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className='setPrev'
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ><BsChevronCompactLeft /></div>
  );
};


const Carousel = (props) => {

  // map state form store
  let banner = useSelector(state => state.bookingSlice.banners);
  
  // cau hinh cho slick carousel
  let settingsCarouser = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => {
      return <ul style={{ bottom: 35}}>{dots}</ul>;
    },
    customPaging: (pagi, i) => {
      const style = {
        width: 10,
        height: 10,
        borderRadius: '100%',
        display: 'inline-block',
        background: 'rgb(251, 66, 38)',
        opacity: 0.7 ,
        transition: "0.4s",
      };
      return <span className='slickDots' style={style} />;
    },
  };

  return (
    <Slider {...settingsCarouser}>
      {banner.map((img, index) => {
        return (
          <div key={index} className='bannerSlide'>
            <div className='trailer'>
              <img src={require('../../assets/image/tải xuống.png')} alt="..." />
            </div>
            <img className='slideImage' src={img.hinhAnh} alt="..." />
          </div>
        )
      })}
    </Slider>
  )
}

export default Carousel