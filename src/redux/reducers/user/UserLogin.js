import { createSlice } from '@reduxjs/toolkit'
import STATUS_CODE from '../../../util/statusCode';
import { userServices } from '../../../services/userServices';
import requester from '../../../services/apiRequester';
import { userApiPath } from '../../../util/apiPath';



const initialState = {
    userLogin: null,
}

const UserLogin = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        fetchApiLoginAction: (state, action) => {
            state.userLogin = action.payload
        }, 
    
    }
});

export const {
    fetchApiLoginAction,

} = UserLogin.actions

export default UserLogin.reducer

// fetch Api Login
export const fetchApiUserLogin = (account) => {
    return async (dispatch) => {
        
        try {
            const res = await userServices.fetchApiLogin(account);
            if (res.data.statusCode === STATUS_CODE.SUCCESS) {
                const action = fetchApiLoginAction(res.data.content);
                dispatch(action);
                localStorage.setItem('TOKEN', res.data.content.accessToken);

            };
        } catch (err) {
            throw err;
        }
    }
};
// dang ky tai khoan
export const fetchApiRegister = (data) => {
    return async (dispatch) => {
        try{
            await userServices.fetchApiSignUp(data);
        }catch(err){
            throw err;
        }
    }
};

// lay danh sach tai khoan
export const fetchApiProfile = () => {
    return async (dispatch) => {
        try{    
            
            const res = await requester({
                url: userApiPath.GET_PROFILE,
                method: 'POST',
            });
            const action = fetchApiLoginAction(res.data.content);
            dispatch(action);
    
        }catch(err){
            console.log(err);
        }
    }
}