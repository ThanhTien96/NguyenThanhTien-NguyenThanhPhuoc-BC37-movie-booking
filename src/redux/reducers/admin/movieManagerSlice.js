import { createSlice } from '@reduxjs/toolkit'
import adminService from '../../../services/adminService';
import { setIsLoading, setUnLoading } from '../booking/bookingSlice';

const initialState = {
    moviesList: [],
    filmDetail: null,
    isAlertSuccess: null,
    isAlertERR: null,
}

const movieManagerSlice = createSlice({
  name: 'movieManageSlice',
  initialState,
  reducers: {
    // lay danh sach phim action
    fetchMovieListAction: (state, action) => {
        state.moviesList = action.payload;
    },
    // lấy thông tin chi tiêt phim
    fetchApiFilmDetailAction: (state, action) => {
        state.filmDetail = action.payload;
    },
    // set state thông báo thành công
    isAlertActionSuccess: (state, action) => {
        state.isAlertSuccess = action.payload;
    },
    //set state thongo bao loi
    isAlertActionERR: (state, action) => {
        state.isAlertERR = action.payload;
    }
  },
});

export const {
    fetchMovieListAction,
    fetchApiFilmDetailAction,
    isAlertAction,
    isAlertActionSuccess,
    isAlertActionERR,
} = movieManagerSlice.actions

export default movieManagerSlice.reducer;


//lay danh sach phim
export const fetchApiMoviesList = (tenPhim) => async (dispatch, setState) => {
    try{
        dispatch(setIsLoading(true));

        const res = await adminService.getFilmApiService(tenPhim);

        const action = fetchMovieListAction(res.data.content);

        dispatch(action);

    }catch(err){

        console.log(err);

    }finally{
        dispatch(setUnLoading(false));
    };
};

// thêm phim mới

export const AddMovieApi = (formData) => async (dispatch, setState) => {
    try{
        dispatch(setIsLoading(true));

        await adminService.AddMoviePostApi(formData);

        await dispatch(fetchApiMoviesList());

    }catch(err){

        throw err
    }finally {
        dispatch(setUnLoading(false));
    }
};

// lấy thông tin chi tiết phim
export const fetchApiFilmDetail = (maPhim) => {
    return async (dispatch) => {
        try{

            dispatch(setIsLoading(true));

            const res = await adminService.getApiFilmDetail(maPhim);

            const action = fetchApiFilmDetailAction(res.data.content);

            dispatch(action);
            
        }catch(err){

            console.log(err);

        }finally{

            dispatch(setUnLoading(false));

        }
    }
};

// cập nhật phim
export const editFilmApi = (formData) => {
    return async (dispatch) => {
        try{
            dispatch(setIsLoading(true));
            await adminService.updateFilmApi(formData);
        
            await dispatch(fetchApiFilmDetail(formData.get('maPhim')));   

            dispatch(fetchApiMoviesList());

        }catch(err){

            throw err

        }finally{
            dispatch(setUnLoading(false));
        }
    }
};

// xóa phim
export const deleteFilmApi = (maPhim) => {
    return async (dispatch) => {
        try{
            dispatch(setIsLoading(true));
            const res = await adminService.deleteFilmApiSevice(maPhim);
            await dispatch(isAlertActionSuccess({message: 'xóa thành công'}));
            await setTimeout(() => {
                dispatch(isAlertActionSuccess(null));
            }, 1000)
            await dispatch(fetchApiMoviesList());
        }catch(err){
            console.log(err);
        }
    }
};
