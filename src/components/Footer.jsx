import { Col, Row } from 'antd'
import React, { memo } from 'react';

const Footer = () => {


    return (
        <div style={{ background: '#212121' }}>
            <div className="container mx-auto lg:px-40 py-10">

                <Row justify='space-around' className='ml-5 md:ml-0'>
                    <Col className="px-2 overflow-hidden mt-5 md:mt-0" span={24} md={6} lg={4}>
                        <h4 className='text-white md:mb-5 mb-2'>TIX</h4>
                        <p className='text-gray-500 hover:text-white transition duration-500 cursor-pointer'>FAQ</p>
                        <p className='text-gray-500 hover:text-white transition duration-500 cursor-pointer mt-2'>Brand Guidelines</p>
                    </Col>

                    <Col className="px-2 overflow-hidden mt-5 md:mt-0" span={24} md={6} lg={4}>
                        <h4 className='text-white md:mb-5 mb-2 font-semibold'>Chính Sách</h4>
                        <p className='text-gray-500 hover:text-white transition duration-500 cursor-pointer'>Thỏa thuận sử dụng</p>
                        <p className='text-gray-500 hover:text-white transition duration-500 cursor-pointer mt-2'>Chính sách bảo mật</p>
                    </Col>

                    <Col className="px-2 overflow-hidden mt-5 lg:mt-0" span={24} md={24} lg={10}>
                        <h4 className='md:pl-5 pl-0 text-white md:mb-5 mb-2 font-semibold'>Đối Tác</h4>
                        <a href='https://www.cgv.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconCGV.png')} alt="..." />
                        </a>
                        <a href='https://www.bhdstar.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500 ' src={require('../assets/iconFooter/iconHBO.png')} alt="..." />
                        </a>
                        <a href='https://www.galaxycine.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconGALAXY.png')} alt="..." />
                        </a>
                        <a href='http://cinestar.com.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconMOVIESTAR.png')} alt="..." />
                        </a>
                        <a href='https://lottecinemavn.com/LCHS/index.aspx' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconLOTERIA.png')} alt="..." />
                        </a>
                        <a href='https://www.megagscinemas.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconMEGA.png')} alt="..." />
                        </a>
                        <a href='https://www.betacinemas.vn/home.htm' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconBETA.jpg')} alt="..." />
                        </a>
                        <a href='http://ddcinema.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconDDC.png')} alt="..." />
                        </a>
                        <a href='https://touchcinema.com/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconTOUCH.png')} alt="..." />
                        </a>
                        <a href='https://cinemaxvn.com/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconCENIMA.jpg')} alt="..." />
                        </a>
                        <a href='https://starlight.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconSTARLIGHT.png')} alt="..." />
                        </a>
                        <a href='https://www.dcine.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconDCINE.png')} alt="..." />
                        </a>
                        <a href='https://zalopay.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconZALOPAY.png')} alt="..." />
                        </a>
                        <a href='https://www.payoo.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconPAYYO.png')} alt="..." />
                        </a>
                        <a href='https://portal.vietcombank.com.vn/Pages/Home.aspx' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconVIETCOMBANK.png')} alt="..." />
                        </a>
                        <a href='https://www.agribank.com.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconAGRIBANK.png')} alt="..." />
                        </a>
                        <a href='https://www.vietinbank.vn/web/home/vn/index.html' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconVIETTINBANK.png')} alt="..." />
                        </a>
                        <a href='https://www.indovinabank.com.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconVIB.png')} alt="..." />
                        </a>
                        <a href='https://webv3.123go.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconUMKNOW.png')} alt="..." />
                        </a>
                        <a href='https://laban.vn/' target='_blank' className='px-7 py-1 inline-block'>
                            <img className='inline-block w-10 rounded-full hover:sepia transition duration-500' src={require('../assets/iconFooter/iconSAFARI.jpg')} alt="..." />
                        </a>
                    </Col>

                    <Col className="px-2 overflow-hidden mt-5 lg:mt-0" span={24} md={6} lg={3}>
                        <h4 className='text-white md:mb-5 mb-2 font-semibold'>Mobile App</h4>
                        <a href='https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197' target='_blank' className='mr-5'>
                            <img className='w-8 hover:sepia transition duration-500' src={require('../assets/iconFooter/Apple.png')} alt="" />
                        </a>
                        <a href='https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197' target='_blank'>
                            <img className='w-8 hover:sepia transition duration-500' src={require('../assets/iconFooter/Android.png')} alt="" />
                        </a>
                    </Col>

                    <Col className="px-2 overflow-hidden mt-5 lg:mt-0" span={24} md={6} lg={3}>
                        <h4 className='text-white md:mb-5 mb-2 font-semibold'>SOCIAL</h4>
                        <a href='https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197' target='_blank' className='mr-5'>
                            <img className='w-8 hover:sepia transition duration-500' src={require('../assets/iconFooter/Facebook.png')} alt="" />
                        </a>
                        <a href='https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197' target='_blank'>
                            <img className='w-8 hover:sepia transition duration-500' src={require('../assets/iconFooter/Zalo.png')} alt="" />
                        </a>
                    </Col>
                </Row>

                <Row className='text-white py-5 mt-5' style={{ borderTop: '1px solid gray' }}>
                    <Col className='hidden md:block' span={3}>
                        <img className='w-full' src={require('../assets/iconFooter/zion.jpg')} alt="" />
                    </Col>
                    <Col className='px-5 md:px-10 text-sm font-semibold' span={18}>
                        <h5 className='mb-3'>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h5>
                        <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</p>
                        <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783, <br /> đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</p>
                        <p>Số Điện Thoại (Hotline): 1900 545 436</p>
                    </Col>
                    <Col className='hidden md:block' span={3}>
                        <img className='w-full' src={require('../assets/iconFooter/daThongBao-logo.cb85045e.png')} alt="..." />
                    </Col>
                </Row>


            </div>
        </div>
    )
}

export default memo(Footer);