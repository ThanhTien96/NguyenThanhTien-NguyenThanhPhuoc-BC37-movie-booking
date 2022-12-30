import { createSlice } from '@reduxjs/toolkit'
import adminService from '../../../services/adminService';
import { setIsLoading, setUnLoading } from '../booking/bookingSlice';

const initialState = {
    accountList:null,
}

const accountManagerSlice = createSlice({
  name: 'accountManagerSlice',
  initialState,
  reducers: {
    // lấy danh sách tài khoản người dùng
    getApiAccountAction: (state, action) => {
        state.accountList = action.payload;
    },
  }
});

export const {
    getApiAccountAction,
} = accountManagerSlice.actions

export default accountManagerSlice.reducer

// lấy danh sách tài khoản người dùng AJAX
export const getApiAccount = (page, tuKhoa) => {
    return async (dispatch, setState) => {
        try{

            dispatch(setIsLoading(true));

            const res = await adminService.getAccountList(page, tuKhoa);
            dispatch(getApiAccountAction(res.data.content));

        } catch (err) {
            console.log(err);
        }finally{
            dispatch(setUnLoading(false));
        };
    };
};

 // xóa tài khoản người dùng
export const fetchApiDeleteAccount = (taiKhoan) => {
    return async (dispatch) => {
        try {

            await adminService.deleteAccount(taiKhoan);
            
        } catch (err) {
            throw err;            
        }
    };
};

// tìm kiếm người dùng

export const searchAccountApi = (tuKhoa) => {
    return async (dispatch) => {
        try{
            const res = await adminService.searchAccountPagination(tuKhoa);
            dispatch(getApiAccountAction(res.data.content));
            console.log(res.data.content)
        }catch(err) {
            console.log(err);
        }
    }
}