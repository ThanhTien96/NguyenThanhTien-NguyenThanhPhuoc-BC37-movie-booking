import { Col, Row } from 'antd'
import React from 'react';
import styled from './AppFeature.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const AppFeature = () => {
    return (
        <div className={styled.appFeature}>
            <div id='ungDung' className="container mx-auto px-5 lg:px-40">
                <Row className='flex items-center'>
                    <Col span={24} xs={24} md={12} className='px-5'>
                        <h1 className='text-white text-3xl leading-loose'>
                            Ứng dụng tiện lợi dành cho

                            người yêu điện ảnh
                        </h1>
                        <p className='text-white text-lg mt-10'>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <div>
                            <a href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"><button className={styled.appButton}>APP Miễn Phí - Tải Về Ngay</button></a>
                        </div>
                        <p className='mt-3 text-lg text-white'>TIX có hai phiên bản <a href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123" target='_blank' className='text-white'>IOS&Android</a></p>
                    </Col>
                    <Col span={24} xs={24} md={12} className='flex justify-center  mt-5 lg:mt-0' >

                        <div className={styled.imgApp}>
                            <img src={require('../../../assets/image/mobile.png')} alt="..." />

                            <Carousel className={styled.imgCarousel} infiniteLoop={true} showStatus={false} autoPlay={true} showThumbs={false} showIndicators={false} showArrows={false}>
                                <div>
                                    <img src={require('../../../assets/image/banner-slider-5.8a084f78.jpg')} alt="..." />
                                </div>

                                <div>
                                    <img src={require('../../../assets/image/banner-slider-1.c4d5fe9e.jpg')} alt="..." />
                                </div>

                                <div>
                                    <img src={require('../../../assets/image/banner-slider-6.0b2b382d.jpg')} alt="..." />
                                </div>
                               
                            </Carousel>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AppFeature