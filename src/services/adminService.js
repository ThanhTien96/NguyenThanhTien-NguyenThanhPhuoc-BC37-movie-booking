
import apiPath, { adminApiPath, maNhom } from "../util/apiPath"
import requester from "./apiRequester"

class AdminService {

    // tìm kiếm
    getFilmApiService = (tenPhim = '') => {
        if(tenPhim.trim() !== ''){
            return requester({
                url: apiPath.GET_MOVIES,
                method: 'GET',
                params: {
                    maNhom: maNhom.NHOM,
                    tenPhim: tenPhim
                }
            });
        }

        return requester({
            url: apiPath.GET_MOVIES,
            method: 'GET',
            params: {
                maNhom: maNhom.NHOM,
            }
        });
    }

    // thêm phim mới
    AddMoviePostApi = (formData) => {
        return requester({
            url: adminApiPath.ADD_MOVIE_API,
            method: 'POST',
            data: formData,
        });
    };

    // lay thông tin chi tiết phim
    getApiFilmDetail = (maPhim) => {
        return requester({
            url: adminApiPath.GET_API_FILM_DETAIL,
            method: 'GET',
            params: {
                MaPhim: maPhim,
            },
        });
    };

    // cập nhật phim
    updateFilmApi = (formData) => {
        return requester({
            url: adminApiPath.EDIT_FILM_API,
            method: 'POST',
            data: formData,
        });
    };

    // xóa phim
    deleteFilmApiSevice = (maPhim) => {
        return requester({
            url: adminApiPath.DELETE_FILM_API,
            method: 'DELETE',
            params: {
                maPhim: maPhim
            }
        });
    };

    // lấy thông tin hệ thông rap
    getApiCinemaSystem = () => {
        return requester({
            url: adminApiPath.GET_CINEMA_SYSTEM,
            method: 'GET',
        })
    };

    //lấy thông tin cụm rạp
    getApiCinemaSchedule = (maHTR) => {
        return requester({
            url: adminApiPath.GET_CINEMA_SCHEDULE,
            method: 'GET',
            params: {
                maHeThongRap: maHTR
            }
        });
    };

    //tạo lịch Chiếu phim
    createScheduleApi = (formData) => {
        return requester({
            url: adminApiPath.CREATE_SCHEDULE,
            method: 'POST',
            data: formData,
        });
    };

    // lấy danh sách tài khoản người dùng
    getAccountList = (page = 1, tuKhoa) => {
        return requester({
            url: adminApiPath.GET_API_ACCOUNT_LIST,
            method: 'GET',
            params: {
                MaNhom: 'GP00',
                soPhanTuTrenTrang: 10,
                soTrang: page,
                tuKhoa: tuKhoa,
            },
        });
    };

    // xóa tài khoản nguoi dùng
    deleteAccount = (taiKhoan) => {
        return requester({
            url: adminApiPath.DELETE_ACCOUNT,
            method: 'DELETE',
            params:{
                TaiKhoan: taiKhoan,
            },
        });
    };

    // lấy thông tin chi tiết tài khoản
    getAccountProfile = (taiKhoan) => {
        return requester({
            url: adminApiPath.GET_ACCOUNT_PROFILE,
            method: 'POST',
            params: {
                taiKhoan: taiKhoan,
            },
        });
    };

    // sửa thông tin tài khoản
    updateAccount = (formData) => {
        return requester({
            url: adminApiPath.UPDATE_ACCOUNT,
            method: 'PUT',
            data: formData,
        });
    };

    //tìm kiếm người dùng phân trang
    searchAccountPagination = (tuKhoa) => {
        return requester({
            url: adminApiPath.SEARCH_ACCOUNT_PAGINATION,
            method: 'GET',
            params: {
                MaNhom: 'GP00',
                tuKhoa: tuKhoa,
            }
        })
    };

    // thêm người dùng api
    addAccount = (formData) => {
        return requester({
            url: adminApiPath.ADD_ACCOUNT,
            method: 'POST',
            data: formData,
        });
    };

};

const adminService = new AdminService();

export default adminService;
