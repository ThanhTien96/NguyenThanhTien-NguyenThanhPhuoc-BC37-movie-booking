import { Col, Row, Tabs } from 'antd'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { truncateText } from '../../../util';
import styled from './News.module.css';


const Flim24h = () => {

    const Film24h = useSelector(state => state.newsSlice.dienAnh24h);

    return (
        <div>
            <Row>
                {Film24h.tinChinh.slice(0, 2).map((news, index) => {
                    return (
                        <Col key={index} className={styled.newItem} span={24} md={12}>
                            <a href={news.link} rel="noopener">
                                <div className={styled.imgNews}>
                                    <img src={news.hinhAnh} alt="..." />
                                </div>
                                <h3 className='mt-3 h-14 overflow-hidden text-black hover:text-orange-600 transition duration-500'>{truncateText(news.tieuDe, 100)}</h3>
                            </a>
                            <p>{truncateText(news.noiDung, 200)}</p>
                        </Col>
                    )
                })}

            </Row>
            <Row>
                <Col span={24} md={17}>
                    <Row>
                        {Film24h.tinChinh.slice(2, 4).map((news, index) => {
                            return (
                                <Col key={index} className={styled.newItem} span={24} md={12}>
                                    <a href={news.link} rel="noopener">
                                        <div className={styled.imgNews}>
                                            <img src={news.hinhAnh} alt="..." />
                                        </div>
                                        <h3 className='mt-3 h-14 overflow-hidden text-black hover:text-orange-600 transition duration-500'>{truncateText(news.tieuDe, 100)}</h3>
                                    </a>
                                    <p>{truncateText(news.noiDung, 150)}</p>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
                <Col span={24} md={6} className='pl-2'>
                    {Film24h.tinPhu.map((news, index) => {
                        return (
                            <div key={index} span={24} md={7} className='mt-5' rel="noopener">
                                <a href={news.link} className='flex justify-start'>
                                    <div className={styled.imgTinPhu}>
                                        <img src={news.hinhAnh} alt="..." />
                                    </div>
                                    <p className='text-black hover:text-orange-500 transition duration-500'>{truncateText(news.noiDung, 40)}</p>
                                </a>
                            </div>
                        )
                    })}
                </Col>

            </Row>
        </div>
    )
}

const Review = () => {

    const reviewNews = useSelector(state => state.newsSlice.review);

    return (
        <div>
            <Row>
                {reviewNews.tinChinh.slice(0, 2).map((news, index) => {
                    return (
                        <Col key={index} className={styled.newItem} span={24} md={12}>
                            <a href={news.link} rel="noopener">
                                <div className={styled.imgNews}>
                                    <img src={news.hinhAnh} alt="..." />
                                </div>
                                <h3 className='mt-3 h-14 overflow-hidden text-black hover:text-orange-600 transition duration-500'>{truncateText(news.tieuDe, 100)}</h3>
                            </a>
                            <p>{truncateText(news.noiDung, 200)}</p>
                        </Col>
                    )
                })}

            </Row>
            <Row>
                <Col span={24} md={17}>
                    <Row>
                        {reviewNews.tinChinh.slice(2, 4).map((news, index) => {
                            return (
                                <Col key={index} className={styled.newItem} span={24} md={12}>
                                    <a href={news.link} rel="noopener">
                                        <div className={styled.imgNews}>
                                            <img src={news.hinhAnh} alt="..." />
                                        </div>
                                        <h3 className='mt-3 h-14 overflow-hidden text-black hover:text-orange-600 transition duration-500'>{truncateText(news.tieuDe, 100)}</h3>
                                    </a>
                                    <p>{truncateText(news.noiDung, 150)}</p>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
                <Col span={24} md={6} className='pl-2'>
                    {reviewNews.tinPhu.map((news, index) => {
                        return (
                            <div key={index} span={24} md={7} className='mt-5'>
                                <a href={news.link} className='flex justify-start' rel="noopener">
                                    <div className={styled.imgTinPhu}>
                                        <img src={news.hinhAnh} alt="..." />
                                    </div>
                                    <p className='text-black hover:text-orange-500 transition duration-500'>{truncateText(news.noiDung, 40)}</p>
                                </a>
                            </div>
                        )
                    })}
                </Col>

            </Row>
        </div>
    )
}

const News = () => {
    const [seeMore, setSeeMore] = useState(false);
    return (
        <div id='tinTuc24h' className='py-10 md:pt-32'>
            <div className="container mx-auto px-5 lg:px-40">
                <Tabs
                    defaultActiveKey="1"
                    size='large'
                    centered={true}
                    popupClassName={styled.tabs}
                    tabBarStyle={{ fontWeight: '600'}}
                    items={[
                        {
                            label: `Điện Ảnh 24h`,
                            key: '1',
                            children: seeMore && <Flim24h />,
                        },
                        {
                            label: `Review`,
                            key: '2',
                            children: seeMore && <Review />,
                        },

                    ]}
                />
                <div className='text-center mt-10'>
                    {seeMore && <button
                        onClick={() => {
                            setSeeMore(false)
                        }}
                        className='px-5 py-2 bg-transparent text-orange-600 hover:text-white hover:bg-orange-700 transition duration-300 cursor-pointer border-orange-600 border rounded-md'>Rút Gọn</button>}
                    {seeMore === false && <button
                        onClick={() => {
                            setSeeMore(true)
                        }}
                        className='px-5 py-2 bg-transparent text-orange-600 hover:text-white hover:bg-orange-700 transition duration-300 cursor-pointer border-orange-600 border rounded-md'>Xem Thêm</button>}
                </div>
            </div>
        </div>
    )
}

export default News