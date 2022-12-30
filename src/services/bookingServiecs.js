import apiPath, { maNhom } from "../util/apiPath"
import requester from "./apiRequester"

class BookingServices{

    //lay danh sach banner
    getBannerApi = () => {
        return requester({
            url: apiPath.BANNER_API_ALL,
            method: 'GET',
        });
    }


    //lay danh sach phim
    getMoviesApi = () => {
        return requester({
            url: apiPath.GET_MOVIES,
            method: 'GET',
            params:{
                maNhom: maNhom.NHOM,
            }
        });
    };

    // lay danh sach flim chi tiet
    getMovieDetail = (id) => {
       return requester({
            url: apiPath.MOVIES_DETAIL,
            method: 'GET',
            params:{
                MaPhim: id
            }
        });
    };

    // lay danh sach cum rap
    getCinemaSystem = () => {
        return requester({
            url: apiPath.CINEMA_SYSTEM,
            method: 'GET',
            params: {
                maNhom: maNhom.NHOM,
            }
        });
    };

    //lay danh sach phong ve

    getApiTicketRoom = (id) => {
        return requester({
            url: apiPath.GET_TICKET_ROOM_API,
            method: 'GET',
            params:{
                MaLichChieu: id,
            },
        });

    }
    //lay thong tin lich chieu
    getScheduleMovieCinema = async (maHeThongRap) => {
        return await requester({
            method: 'GET',
            url: apiPath.SCHEDULE_MOVIE_CINEMA,
            params:{
                maHeThongRap: maHeThongRap,
                maNhom: maNhom.NHOM
            }
        });
    };

    // lay danh sách he thong rap

    getCinemaSystemSelect = async (MaPhim) => {
        return await requester({
            method: 'GET',
            url: apiPath.GET_CINEMA_SYSTEM_SELECT,
            params:{
                MaPhim: MaPhim
            }
        })
    };

    // Dat Ve
    bookingTickets = (thongTinVe) => {
        return requester({
            method: 'POST',
            url: apiPath.BOOKING_TICKETS,
            data: thongTinVe,
        })
    };

};

export const bookingServices = new BookingServices() 