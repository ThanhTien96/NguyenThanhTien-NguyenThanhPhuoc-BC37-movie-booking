// quản lý path api của booking
const apiPath = {
    BANNER_API_ALL: '/api/QuanLyPhim/LayDanhSachBanner',
    GET_MOVIES: '/api/QuanLyPhim/LayDanhSachPhim',
    MOVIES_DETAIL: '/api/QuanLyRap/LayThongTinLichChieuPhim',
    CINEMA_SYSTEM: '/api/QuanLyRap/LayThongTinHeThongRap',
    GET_TICKET_ROOM_API: '/api/QuanLyDatVe/LayDanhSachPhongVe',
    SCHEDULE_MOVIE_CINEMA:'/api/QuanLyRap/LayThongTinLichChieuHeThongRap',
    GET_CINEMA_SYSTEM_SELECT: '/api/QuanLyRap/LayThongTinLichChieuPhim',
    BOOKING_TICKETS: '/api/QuanLyDatVe/DatVe',
};

export default apiPath;

// quản lý path api của adim user
export const userApiPath = {
    USER_LOGIN:'/api/QuanLyNguoiDung/DangNhap',
    GET_PROFILE: '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
    REGISTER_USER: '/api/QuanLyNguoiDung/DangKy',
}

// path api quản lý phim admin

export const adminApiPath = {
    ADD_MOVIE_API: '/api/QuanLyPhim/ThemPhimUploadHinh',
    GET_API_FILM_DETAIL: '/api/QuanLyPhim/LayThongTinPhim',
    EDIT_FILM_API: '/api/QuanLyPhim/CapNhatPhimUpload', 
    DELETE_FILM_API: '/api/QuanLyPhim/XoaPhim',
    GET_CINEMA_SYSTEM: '/api/QuanLyRap/LayThongTinHeThongRap',
    GET_CINEMA_SCHEDULE: '/api/QuanLyRap/LayThongTinCumRapTheoHeThong',
    CREATE_SCHEDULE: '/api/QuanLyDatVe/TaoLichChieu',
    GET_API_ACCOUNT_LIST: '/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang',
    DELETE_ACCOUNT:'/api/QuanLyNguoiDung/XoaNguoiDung',
    GET_ACCOUNT_PROFILE: '/api/QuanLyNguoiDung/LayThongTinNguoiDung',
    UPDATE_ACCOUNT: '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
    SEARCH_ACCOUNT_PAGINATION: '/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang',
    ADD_ACCOUNT: '/api/QuanLyNguoiDung/ThemNguoiDung',
}

// quản lý mã nhóm

export const maNhom = {
    NHOM: 'GP07'
}