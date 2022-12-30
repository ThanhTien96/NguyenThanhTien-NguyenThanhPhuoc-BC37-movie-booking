import { createSlice } from '@reduxjs/toolkit'
import { bookingServices } from '../../../services/bookingServiecs';
import { fetchApiProfile } from '../user/UserLogin';

const initialState = {
    banners:[],
    isLoading: false,
    movies: [],
    moviesDetail: [],
    cinemaSystem: [],
    ticketRoom: [],
    chairSelectedList: [],
    tabActiveKey: '1',
}

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {

    // fetch api all banner action
    fetchBannerApiAction: (state, action) => {
        state.banners = action.payload;
    },

    // set true is loading
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    },

    //set false for unloading
    setUnLoading: (state, action) => {
        state.isLoading = action.payload;
    },

    // fetch api all movies action
    fetchMoviesApiAction: (state, action) => {
        state.movies = action.payload;
    },
    // fetch api movie detail schedule action
    fetchApiMovieDetailAction: (state, action) => {
        state.moviesDetail = action.payload;
    }, 
    // lấy thông tin lịch chiếu hệ thông action
    fetchMoviesScheduleAction: (state, action) => {
        state.cinemaSystem = action.payload;
    },
    // lay danh sach phong ve
    fetchApiTicketRoomAction: (state, action) => {
        state.ticketRoom = action.payload;
    },
    setChairSelectedListAction: (state, action) => {
        const index = state.chairSelectedList.findIndex(item => item.maGhe === action.payload.maGhe);
        if(index !== -1){
            state.chairSelectedList.splice(index, 1);
        }else{
            state.chairSelectedList.push(action.payload);
        }
        return state;
    },

    //booking tickets
    bookingTicketsAction: (state, action) => {
        state.chairSelectedList = [];
    },

    // set tab active key
    setTabActiveKey: (state, action) => {
        state.tabActiveKey = action.payload;
    }

  }
});

export const {
    fetchBannerApiAction, 
    setIsLoading, 
    setUnLoading, 
    fetchMoviesApiAction,
    fetchCinemaSystemApiAction,
    fetchCinemaWithNameAction,
    fetchApiMovieDetailAction,
    fetchMoviesScheduleAction,
    fetchApiTicketRoomAction,
    setChairSelectedListAction,
    bookingTicketsAction,
    setTabActiveKey,
} = bookingSlice.actions

export default bookingSlice.reducer

// thunk fetch banner api

export const getBannerApi = async (dispatch, setState) => {
    
    try{
        dispatch(setIsLoading(true));
        const res = await bookingServices.getBannerApi();
        const action = fetchBannerApiAction(res.data.content);
        dispatch(action);
    }catch(err){
        console.log(err);
    }finally{
        dispatch(setUnLoading(false));
    }
}

// thunk fetch moives api 

export const getMoviesApi = async (dispatch, setState) => {
    try{
        const res = await bookingServices.getMoviesApi();

        const action = fetchMoviesApiAction(res.data.content);
        dispatch(action);

    }catch(err){
        console.log(err);
    }
}

// fetch api move detail
export const fetchApiMovieDetail = (id) => async (dispatch) => {
    try{
        dispatch(setIsLoading(true));
        const res = await bookingServices.getMovieDetail(id);

        const action = fetchApiMovieDetailAction(res.data.content);
        dispatch(action);

    }catch(err){
        console.log(err);
    }finally{
        dispatch(setUnLoading(false));
    }
};

// fetch api movies schedule 
export const fetchApiMoviesSchedule = async (dispatch) => {
    try{
        const res = await bookingServices.getCinemaSystem()
        const action = fetchMoviesScheduleAction(res.data.content);
        dispatch(action);
    }catch(err) {
        console.log(err);
    }
};

//thunk lay danh sach phong ve

export const fetchApiTicketRoom = (id) => async (dispatch) => {
    try{
        dispatch(setIsLoading(true));

        const res = await bookingServices.getApiTicketRoom(id)
        const action = fetchApiTicketRoomAction(res.data.content);
        dispatch(action);

    }catch(err){
        console.log(err);
    }finally{
        dispatch(setUnLoading(false));
    }
};

// đặt vé

export const fetchApiBookingTickets = (thongTinVe) => async (dispatch) => {
    try{

        dispatch(setIsLoading(true));

        await bookingServices.bookingTickets(thongTinVe);
        await dispatch(bookingTicketsAction());
        await dispatch(fetchApiTicketRoom(thongTinVe.maLichChieu));
        await dispatch(fetchApiProfile())
        
        await dispatch(setTabActiveKey('2'));

    }catch(err){
        throw err;
    }finally{
        dispatch(setUnLoading(false));
    }
};

